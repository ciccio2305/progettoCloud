import base64
import json
import random
from bson import ObjectId
import bcrypt
from flask import session
import requests
from bson.json_util import dumps

class USERS:

    def __init__(self,mongo, etherpad,tinode):
        self.mongo=mongo
        self.etherpad=etherpad
        self.tinode_address=tinode

    #trova l'utente mongo con l'id passato
    def find_user_with_id(self,user_id):
        try:
            users = self.mongo.utenti_login.Login
            user_mongo = users.find_one({'_id': ObjectId(user_id)})
            return user_mongo
        except:
            return None

    #trova l'utente mongo con l'email passata
    def find_user_with_email(self,email):
        try:
            users = self.mongo.utenti_login.Login
            existing_user = users.find_one({'email': email})
            return existing_user
        except:
            return None
    #inseriamo la sezione nel database
    def insert_sezione(self,sezione):
        sezioni=self.mongo.sezioni.Sezioni
        current_sezione=sezioni.find_one({"sezione":sezione})
        if current_sezione is None:  
            etherpad_group_id = self.etherpad.create_etherpad_group(sezione)
            sezioni.insert({"sezione":sezione,"id_etherpad":etherpad_group_id})
    
    #ritorna l'id di mongo della sezione
    def get_id_sezione(self, sezione):
        sezioni=self.mongo.sezioni.Sezioni
        current=sezioni.find_one({"sezione":sezione})
        if current is None:
            return None
        else:
            return str(current["_id"])

    def get_etherpad_id_sezione(self, sezione):
        sezioni=self.mongo.sezioni.Sezioni
        print("ora",sezione)
        current=sezioni.find_one({"sezione":sezione})
        if current is None:
            print("non trovata nel db")
            return None
        else:
            return current["id_etherpad"]
        
    #ritorna il nome della sezione di cui fa parte l'utente
    def get_nome_sezione(self,id_user):
        user=self.mongo.sezioni.users
        sezioni=self.mongo.sezioni.Sezioni

        id=user.find_one({"id_utente":id_user})["id_sezione"]
        print(id)
        ret=sezioni.find_one( {"_id":id} )["sezione"]
        print(ret)
        return ret
    #inseriamo l'utente nella sezione
    def insert_user_in_sezione(self,id_user,id_sezione):
        sezioni=self.mongo.sezioni.users
        if sezioni.find_one({"id_sezione":id_sezione,"id_utente":id_user}) is None:
            sezioni.insert({"id_sezione":id_sezione,"id_utente":id_user})

    #inseriamo l'utente nel db
    def insert_user(self,name,password,email):
        users = self.mongo.utenti_login.Login

        hashpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        users.insert_one({'name': name, 'pass': hashpass,'email': email,'ruolo':'undefined'})
        existing_user = users.find_one({'email': email})
        ehterpad_id=self.etherpad.create_etherpad_user(existing_user['name'], str(existing_user['_id']))
        users.update_one({'_id': existing_user['_id']},{ "$set": { "etherpad_id": ehterpad_id } })
        
        return str(existing_user['_id'])
    

    def insert_user_in_tinode(self,name,password,email):
        r = requests.post(self.tinode_address, json={})
        id=random.randint(100000,1000000)
        print(r.json()["ctrl"]["params"]["sid"])
        r1 = requests.post(self.tinode_address+"&sid="+str(r.json()["ctrl"]["params"]["sid"]), json=
        {
            "hi":{
                "id":str(id),
                "ver":"0.22.8"
            }
        })
        secret_bytes = (email.replace("@","_._at")+":"+password).encode("ascii")
  
        base64_bytes = base64.b64encode(secret_bytes)
        stringa_base64=str(base64_bytes)

        r2 = requests.post(self.tinode_address+"&sid="+str(r.json()["ctrl"]["params"]["sid"]), json=
        {
            "acc": 
                { 
                    "id": str(id),
                    "user": "new" + name,
                    "authlevel": "auth", 
                    "scheme": "basic",
                    "secret":stringa_base64[2:len(stringa_base64)-1],
                    "login": False, 
                    "tags": [name,email],
                    "desc":{
                        "public":{
                            "fn": name,
                            "org" : {
                                "fn": "Tribunale di Catania",
                                "title": "Dottore"
                            }
                        }
                    }             
                } 
            
        })
    
    def find_user_in_tinode(self, keyword):
        try:
            query = { "tags.0": { "$regex":"^"+ keyword }}
            cursor = list(self.mongo.tinode.users.find(query))
            result = []
            for x in cursor:
                if str(x['tags'][1]) == session.get('email'):
                    continue
                else:
                    if 'photo' in x['public'] and x['public']['photo']!=None and 'type' in x['public']['photo']:
                        result.append({
                            "name": str(x['tags'][0]),
                            "photo_type": str(x['public']['photo']['type']),
                            "photo": str(base64.b64encode(x['public']['photo']['data']))
                        })
                    else:
                        result.append({
                            "name": str(x['tags'][0])
                        })
            return result
        except Exception as e:
            return str(e)

    def find_all_users_in_tinode(self):
        try:
            query = {}
            cursor = list(self.mongo.tinode.users.find(query))
            result = []
            for x in cursor:
                if str(x['tags'][1]) == session.get('email'):
                    continue
                else:
                    if 'photo' in x['public'] and x['public']['photo']!=None and 'type' in x['public']['photo']:
                        result.append({
                            "name": str(x['tags'][0]),
                            "photo_type": str(x['public']['photo']['type']),
                            "photo": str(base64.b64encode(x['public']['photo']['data'])),
                            "topic": str('usr'+x['_id'])
                        })
                    else:
                        result.append({
                            "name": str(x['tags'][0]),
                            "topic": str('usr'+x['_id'])
                        })
            return json.dumps(result)
        except Exception as e:
            print(e, "errore")
            return str(e)

