from datetime import timedelta
import pymongo as PyMongo


error_message = "Something goes wrong"
not_loggedin_error = "Utente non loggato, registrati o loggati"
frontend_folder = './build/'
mongo = PyMongo.MongoClient('mongo-service.default.svc.cluster.local:27017', 27017)
administrator_password = "Admin"

class Config:
    MONGO_DBNAME = 'Just Smart db'
    MONGO_URI = 'mongodb://mongo-service.default.svc.cluster.local:27017/?directConnection=true'
    SESSION_TYPE = 'mongodb'
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFE = timedelta(minutes=10)
    SESSION_MONGODB = mongo
    SESSION_MONGODB_DB = 'SESSIONE'
    SESSION_MONGODB_COLLECT = 'SESSION_COLLECT'
    SECRET_KEY = 'dADXVf=?!DF-dsaF32%0'