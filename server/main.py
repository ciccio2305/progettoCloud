import datetime
import json
import time
from flask import Flask, render_template, url_for, request, redirect, send_from_directory, session, make_response
from flask_session import Session
from flask_cors import CORS
from datetime import date, timedelta
from bson import ObjectId
import pymongo as PyMongo
import bcrypt
from etherpad_function import ETHERPAD
from file_system import FILE_SYSTEM_HANDLER
from bson import json_util
from user_management import USERS
from chat_manager_with_etherpad import CHAT
from stats import Statistiche as STATS
import utils


def parse_json(data):
    return json.loads(json_util.dumps(data))


time.sleep(5)

error_message = 'Something goes wrong'
not_loggedin_error = 'Utente non loggato, registrati o loggati'

frontend_folder = './build/'
app = Flask(__name__,
            static_folder=frontend_folder+'_app',
            template_folder=frontend_folder,
            )
CORS(app)

mongo = PyMongo.MongoClient('mongo-service.default.svc.cluster.local:27017', 27017)

app.config['MONGO_DBNAME'] = 'Just Smart db'
app.config['MONGO_URI'] = 'mongodb://mongo-service.default.svc.cluster.local:27017/?directConnection=true'
app.config['SESSION_TYPE'] = 'mongodb'
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)
app.config['SESSION_MONGODB'] = mongo
app.config['SESSION_MONGODB_DB'] = 'SESSIONE'
app.config['SESSION_MONGODB_COLLECT'] = 'SESSION_COLLECT'
app.secret_key = 'dADXVf=?!DF-dsaF32%0'
server_session = Session(app)

# tutte le interazzioni con ehterpad sono implementate tramite questo oggetto
etherpad_instance = ETHERPAD('http://etherpad-server-service.default.svc.cluster.local:9001')

tinode_address = "http://tinode-service.default.svc.cluster.local:6060/v0/channels/lp?apikey=AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K"

# oggetto per creare e gestire gli utenti
user_management = USERS(mongo, etherpad_instance, tinode_address)

stats_management = STATS(mongo)

# oggetto per creare e accedere ai file
real_file_system = FILE_SYSTEM_HANDLER(
    mongo, etherpad_instance, stats_management)


@app.route('/', methods=['GET'])
def home():
    if 'user' in session:
        print('Accesso con sessione')
        return send_from_directory(directory=frontend_folder, path='homepage.html')
    print('Accesso senza sessione')
    return send_from_directory(directory=frontend_folder, path='login.html')


@app.route('/<path:path>')
def static_dir(path):
    print('static_dir')
    return send_from_directory(directory=frontend_folder, path='homepage.html')


# chiamata api per effettuare il login,
# nel json della richiesta si deve inviare un json {"username":username, "password":password}
@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            users = mongo.utenti_login.Login
            data = request.get_json()
            login_user = users.find_one({'email': data['username']})
            if login_user:
                email = login_user['email']
                password = login_user['pass']
                if bcrypt.hashpw(data['password'].encode('utf-8'), password) == password:
                    session['user'] = str(login_user['_id'])
                    session['email'] = str(login_user['email'])
                    session['section'] = str(
                        user_management.get_nome_sezione(login_user['_id']))
                    session['ruolo'] = str(login_user['ruolo'])
                    return 'Logged as ' + email
            return 'Invalid email/password combination'
        except Exception as error:
            print(error)
            return error_message
# chiamata api per registrarsi, tramite le funzioni fornite da user_management


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        users = mongo.utenti_login.Login
        existing_user = users.find_one({'email': data['email']})
        if existing_user is None:
            id = user_management.insert_user(
                data['name'], data['pass'], data['email'])
            id_sezione = user_management.get_id_sezione("primasezionecivile")
            if id_sezione is not None:
                user_management.insert_user_in_sezione(
                    ObjectId(id), ObjectId(id_sezione))
            else:
                print("la sezione "+"primasezionecivile"+" non esiste")
            user_management.insert_user_in_tinode(
                data['name'], data['pass'], data['email'])
            return 'ok'
        return 'That email already exists!'
    except Exception:
        return error_message


@app.route('/api/whoami', methods=['GET'])
def whoami():
    if 'user' not in session:
        return not_loggedin_error
    user = user_management.find_user_with_email(session['email'])
    return json.dumps({'name': user['name'], 'email': user['email'], 'role': user['ruolo']})


@app.route("/api/ls/<path:path>", methods=["GET"])
def ls(path):
    if 'user' not in session:
        return not_loggedin_error
    index = path.rfind("/")
    ritorno = list()
    if (index == -1):
        lista = real_file_system.list_all_file_in_dir(
            path, "/", user_management.get_etherpad_id_sezione(session["section"]))
        for x in lista:
            ritorno.append(parse_json(x))
        return (ritorno)
    lista = real_file_system.list_all_file_in_dir(
        path[index+1:len(path)], "/"+path[0:index+1], user_management.get_etherpad_id_sezione(session["section"]))
    for x in lista:
        ritorno.append(parse_json(x))
    return (ritorno)

# chiamata per crare una cartella


@app.route("/api/mkdir/<path:path>", methods=["GET"])
def mkdir(path):
    print(session["user"])
    if 'user' not in session:
        return not_loggedin_error
    index = path.rfind("/")
    if (index == -1):

        status = real_file_system.create_root_dir(
            path, user_management.get_etherpad_id_sezione(session["section"]), session["section"])
        return (parse_json(status))

    status = real_file_system.create_dir(path[index+1:len(path)], "/"+path[0:index+1],
                                         user_management.get_etherpad_id_sezione(session["section"]), session["section"])
    return (parse_json(status))


# chiamata api per creare un file
@app.route("/api/touch/<path:path>", methods=["GET"])
def create(path):
    if 'user' not in session:
        return not_loggedin_error
    index = path.rfind("/")
    print(index)
    print(path[index+1:len(path)], "/"+path[0:index+1])

    if (index == -1):
        return "error"
    status = real_file_system.create_pad(path[index+1:len(path)], "/"+path[0:index+1],
                                         user_management.get_etherpad_id_sezione(session["section"]), session["section"])
    return (status)


@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    response = make_response(send_from_directory(
        directory=frontend_folder, path='/index.html'))
    return response


@app.route('/api/get_pad/<path:path>', methods=['GET'])
def get_pad(path):
    if 'user' not in session:
        return not_loggedin_error
    user_id = session['user']
    try:
        users = mongo.utenti_login.Login
        user_mongo = users.find_one({'_id': ObjectId(user_id)})
        [pad_name, father_path] = utils.get_fatherpath_and_filename_from_path(
            path)
        new_pad_name = utils.encode_pad_name(father_path, pad_name)
        etherpad_user_id = user_mongo["etherpad_id"]
        etherpad_group_id = user_management.get_etherpad_id_sezione(
            session["section"])
        etherpad_pad = etherpad_instance.create_group_pad(
            etherpad_group_id, new_pad_name)
        etherpad_session, timestamp = etherpad_instance.create_session_for_pad_id(
            etherpad_group_id, etherpad_user_id)
        dict_response = {"destination_url": "http://mongo-service.default.svc.cluster.local:9001/p/" +
                         etherpad_pad, "sessionID": {"value": etherpad_session, "expires": timestamp}}
        response = make_response(json.dumps(dict_response), 200)
        response.set_cookie('sessionID', etherpad_session,
                            expires=timestamp, domain=".mongo-service.default.svc.cluster.local")
        return response
    except Exception as error:
        print(error)
        return error_message


@app.route('/api/delete_file/<path:path>', methods=['GET'])
def delete_file(path):
    if 'user' not in session:
        return not_loggedin_error
    try:
        path = utils.parse_path(path)
        [pad_name, father_path] = utils.get_fatherpath_and_filename_from_path(
            path)
        etherpad_group_id = user_management.get_etherpad_id_sezione(
            session["section"])
        pad_id = utils.encode_pad_name(father_path, pad_name)
        real_file_system.delete_pad(path)
        etherpad_instance.delete_pad(etherpad_group_id + "$" + pad_id)
        return 'Il file è stato eliminato correttamente'
    except:
        return error_message


@app.route('/api/delete_folder/<path:path>', methods=['GET'])
def delete_folder(path):
    if 'user' not in session:
        return not_loggedin_error
    path = utils.parse_path(path)
    group_id = user_management.get_etherpad_id_sezione(session["section"])
    real_file_system.delete_directory(path, group_id)
    return 'La cartella è stata eliminata correttamente'


@app.route("/api/get_appuntamenti", methods=["GET"])
def get_appuntamenti():
    if 'user' not in session:
        return not_loggedin_error
    eventi = mongo.appuntamenti.appuntamenti
    ritorno = []
    lista = eventi.find({"utente": session["user"]})
    for x in lista:
        ritorno.append(parse_json(x))
    return ritorno


@app.route("/api/set_appuntamenti", methods=["POST"])
def set_appuntamenti():
    if 'user' not in session:
        return not_loggedin_error


@app.route("/api/get_statistiche", methods=["POST"])
def get_statistiche():
    if 'user' not in session:
        return not_loggedin_error


@app.route("/api/get_last_edited/<path:path>", methods=["GET"])
def get_last_edited(path):
    if 'user' not in session:
        return "utente non loggato , registrati o loggati"
    try:
        etherpad_group_id = user_management.get_etherpad_id_sezione(
            session["section"])
        [pad_name, father_path] = utils.get_fatherpath_and_filename_from_path(
            path)
        new_pad_name = utils.encode_pad_name(father_path, pad_name)
        etherpad_pad = etherpad_instance.create_group_pad(
            etherpad_group_id, new_pad_name)
        timestamp = etherpad_instance.get_last_edited(etherpad_pad)
        return {"timestamp": timestamp, "pad_name": etherpad_pad}
    except Exception as error:
        print(error)
        return error_message


@app.route("/api/stats/update_status/<path:path>", methods=["GET"])
def update_status(path):
    # or session['ruolo']!="magistrato"
    if 'user' not in session:
        return "utente non loggato , registrati o loggati"
    try:
        index = path.rfind("/")
        if (index == -1):
            real_file_system.update_status(
                path, "/", user_management.get_etherpad_id_sezione(session["section"]), session["section"])
        else:
            real_file_system.update_status(path[index+1:len(path)], "/"+path[0:index+1],
                                           user_management.get_etherpad_id_sezione(session["section"]), session["section"])
            stats_management.toggle_completed(path)
        return "status aggiornato correttamente"
    except Exception as error:
        print(error)
        return error_message


@app.route("/api/stats/get_completed", methods=["GET"])
def get_completed():
    if 'user' not in session:
        return "utente non loggato , registrati o loggati"
    try:
        stats_management.get_completed()
        return 'Ritornato stato'
    except Exception as error:
        print(error)
        return error_message


@app.route("/api/rename_file", methods=["POST"])
def rename_file():
    try:
        data = request.get_json()
        path = data['path'] + "/" + data['oldName']
        path = path[1:len(path)]
        new_name = data['newName']
        etherpad_group_id = user_management.get_etherpad_id_sezione(
            session["section"])
        real_file_system.rename_file(path, new_name, etherpad_group_id)
        return 'nome del file aggiornato correttamente'
    except Exception as e:
        print("Errore: " + str(e))
        return str(e)


@app.route("/api/rename_folder/", methods=["POST"])
def rename_folder():
    try:
        data = request.get_json()
        path = data['path'] + "/" + data['oldName']
        new_name = data['newName']
        etherpad_group_id = user_management.get_etherpad_id_sezione(
            session["section"])
        real_file_system.rename_folder(path, new_name, etherpad_group_id)
        return 'nome della cartella aggiornato correttamente'
    except Exception as e:
        print("Errore: " + str(e))
        return str(e)


@app.route("/api/tinode/find_user/<string:keyword>", methods=["GET"])
def get_user_by_keyword(keyword):
    if 'user' not in session:
        return not_loggedin_error

    if keyword == 'all':
        print(keyword)
        return user_management.find_all_users_in_tinode()
    return user_management.find_user_in_tinode(keyword)


@app.route("/api/tinode/find_user/all", methods=["GET"])
def get_all_users():
    if 'user' not in session:
        return not_loggedin_error
    return user_management.find_all_users_in_tinode()


if __name__ == '__main__':
    user_management.insert_sezione("primasezionecivile")
    real_file_system.create_root_dir("primasezionecivile", user_management.get_etherpad_id_sezione(
        "primasezionecivile"), "primasezionecivile")
    app.run(debug=True, threaded=True, host='0.0.0.0')
