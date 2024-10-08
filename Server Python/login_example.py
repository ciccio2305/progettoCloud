import json
from flask import Flask, render_template, url_for, request, redirect, send_from_directory, session, make_response
from flask_session import Session
from flask_cors import CORS
from datetime import timedelta
from bson import ObjectId
import pymongo as PyMongo
import bcrypt
from etherpad_function import ETHERPAD
from file_system import FILE_SYSTEM_HANDLER
from bson import json_util
from user_management import USERS
from chat_manager_with_etherpad import CHAT

def parse_json(data):
    return json.loads(json_util.dumps(data))

error_message = 'Something goes wrong'
frontend_folder = './build/'
app = Flask(__name__,
            static_folder=frontend_folder+'_app',
            template_folder=frontend_folder,
            )
CORS(app)

mongo = PyMongo.MongoClient('localhost', 27017)

app.config['MONGO_DBNAME'] = 'Just Smart db'
app.config['MONGO_URI'] = 'mongodb://mongodb:27017/?directConnections=true'
app.config['SESSION_TYPE'] = 'mongodb'
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)
app.config['SESSION_MONGODB'] = mongo
app.config['SESSION_MONGODB_DB'] = 'SESSIONE'
app.config['SESSION_MONGODB_COLLECT'] = 'SESSION_COLLECT'
app.secret_key = 'dADXVf=?!DF-dsaF32%0'
server_session = Session(app)

#tutte le interazzioni con ehterpad sono implementate tramite questo oggetto
etherpad_instance=ETHERPAD('http://pad.localhost:80')

#l'oggetto per interaggire con la chat
chat_instance=CHAT(etherpad_instance)

#oggetto per creare e accedere ai file
real_file_system=FILE_SYSTEM_HANDLER(mongo,etherpad_instance)

#oggetto per creare e gestire gli utenti
user_menagment=USERS(mongo, etherpad_instance)



@app.errorhandler(404)
def errore(e):
    return send_from_directory(frontend_folder, 'index.html')

#con questa route se l'utente è presente in sessione viene presa la sezione di cui fa parte e viene generato il link a etherpad 
#per aprire il pad corrispondente,
#più sezioni possono avere pad con lo stesso nome 
#il nome contiene anche il percorso al file
#inoltre solo con con questa chiamata viene generato il coockie di sessione necessario ad aprire il pad.

@app.route('/api/get_pad/<path:path>', methods=['GET'])
def get_pad(path):
    user_id = session['user']
    print(user_id)
    try:
        users = mongo.utenti_login.Login
        user_mongo = users.find_one({'_id': ObjectId(user_id)})

        etherpad_user_id = etherpad_instance.create_etherpad_user(user_mongo['name'], user_id)
        #etherpad_group_id=USERS.get_etherpad_id_sezione(USERS.get_nome_sezione(user_id))
        etherpad_group_id = etherpad_instance.create_etherpad_group('primasezionecivile')
        etherpad_pad = etherpad_instance.create_group_pad(etherpad_group_id, path.replace('/', ''))
        etherpad_session, timestamp = etherpad_instance.create_session_for_pad_id(etherpad_group_id, etherpad_user_id)

        dict_response = {"destination_url": "http://localhost:80/p/" + etherpad_pad}

        response = make_response(json.dumps(dict_response), 200)
        response.set_cookie('sessionID', etherpad_session, expires=timestamp)
        print( dict_response)
        return response
    except Exception as error:
        print(error)
        return error_message


#qualsiasi cosa viene chiamata viene ritornata la homepage che poi tramite svelte diventa la pagina giusta
@app.route('/<path:path>')
def static_dir(path):
    print('static_dir')
    return send_from_directory(directory=frontend_folder, path='homepage.html')


@app.route('/', methods=['GET'])
def home():
    if 'user' in session:
        print('Accesso con sessione')
        return send_from_directory(directory=frontend_folder, path='homepage.html')
    print('Accesso senza sessione')
    return send_from_directory(directory=frontend_folder, path='login.html')

#chiamata api per effettuare il login, 
#nel json della richiesta si deve inviare un json {"username":username, "password":password}
@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            users = mongo.utenti_login.Login
            data = request.get_json()
            login_user = users.find_one({'name': data['username']})
            if login_user:
                email = login_user['name']
                password = login_user['pass']
                if bcrypt.hashpw(data['password'].encode('utf-8'), password) == password:
                    session['user'] = str(login_user['_id'])
                    return 'Logged as ' + email   
            return 'Invalid username/password combination'
        except:
            return error_message
#chiamata api per registrarsi, tramite le funzioni fornite da user_managment
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        users = mongo.utenti_login.Login
        existing_user = users.find_one({'email': data['email']})
        if existing_user is None:
            id=user_menagment.insert_user(data['name'],data['pass'],data['email'])
            id_sezione=user_menagment.get_id_sezione("primasezionecivile")
            if id_sezione is not None:
                user_menagment.insert_user_in_sezione(ObjectId(id),ObjectId(id_sezione))  
            else:
                print("la sezione "+"primasezionecivile"+" non esiste")
            return 'ok'
        return 'That email already exists!'
    except:
        return error_message

#chiamate api per listaer tutti i file in un path
@app.route("/api/ls/<path:path>",methods=["GET"])
def ls(path):
    index=path.rfind("/")
    ritorno=list()
    if(index==-1):
        lista=real_file_system.list_all_file_in_dir(path,"/",etherpad_instance.create_etherpad_group("primasezionecivile"))
        for x in lista:
            ritorno.append(parse_json(x))
        return(ritorno)
    lista=real_file_system.list_all_file_in_dir(path[index+1:len(path)],"/"+path[0:index+1],etherpad_instance.create_etherpad_group("primasezionecivile"))
    for x in lista:
        ritorno.append(parse_json(x))
    return(ritorno)

#chiamata per crare il file 
@app.route("/api/mkdir/<path:path>",methods=["GET"])
def mkdir(path):
    index=path.rfind("/")
    if(index==-1):
        status=real_file_system.create_root_dir(path,etherpad_instance.create_etherpad_group("primasezionecivile"),"primasezionecivile")
        return(status)
    status=real_file_system.create_dir(path[index+1:len(path)],"/"+path[0:index+1],etherpad_instance.create_etherpad_group("primasezionecivile"),"primasezionecivile")
    return(status)

#chiamata api per creare un file
@app.route("/api/touch/<path:path>",methods=["GET"])
def create(path):
    index=path.rfind("/")
    if(index==-1):
        return "error"
    status=real_file_system.create_pad(path[index+1:len(path)],"/"+path[0:index+1],etherpad_instance.create_etherpad_group("primasezionecivile"),"primasezionecivile")

    return(status)

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    response = make_response(send_from_directory(directory=frontend_folder, path='/index.html'))
    return response


@app.route('/api/TEST', methods=['GET'])
def test():
    return "qui"

if __name__ == '__main__':

    user_menagment.insert_sezione("primasezionecivile")
    app.run(debug=True, threaded=True)
