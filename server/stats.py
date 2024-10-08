from datetime import date
import json


class Statistiche:
    def __init__(self, mongo_instance):
        self.mongo=mongo_instance

    def toggle_completed(self, path):
        path = ("/"+path).replace("//","/")
        try:
            query = {"file":path}
            query_result = self.mongo.statistiche.completati.find_one(query)
            if query_result is None:
                self.mongo.statistiche.completati.insert_one({"file":path,"date":str((date.today()).strftime("%d-%m-%Y"))})
            else:
                self.mongo.statistiche.completati.delete_one(query)
        except Exception as e:
            print(e)
            return e
    
    def rename_completed(self, oldpath, path, new_name):
        try:
            query = {"file":oldpath}
            index = path.rfind("/")
            file = path[0:index]+"/"+new_name
            query_result = self.mongo.statistiche.completati.find_one(query)
            if query_result is not None:
                self.mongo.statistiche.completati.update_one(query, {"$set": {"file": file}})
        except Exception as e:
            print(e)
            return e
        
    def get_completed(self):
        try:
            query = {}
            query_result = self.mongo.statistiche.completati.find(query)
            return json.dumps(list(query_result))
        except Exception as e:
            print(e)
            return e
