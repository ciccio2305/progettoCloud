from datetime import date
import json


class Statistiche:
    def __init__(self, mongo_instance):
        self.mongo = mongo_instance

    def toggle_completed(self, path, completed_by, sezione):
        path = ("/"+path).replace("//", "/")
        try:
            query = {"file": path}
            query_result = self.mongo.statistiche.completati.find_one(query)
            if query_result is None:
                self.mongo.statistiche.completati.insert_one({"file": path, "completed_by": completed_by, "sezione": sezione, "date": str((date.today()).strftime(
                    "%d-%m-%Y")), "year": str((date.today()).strftime("%Y")), "month": str((date.today()).strftime("%m")), "week": str((date.today()).strftime("%W"))})
            else:
                self.mongo.statistiche.completati.delete_one(query)
        except Exception as e:
            print(e)
            return e

    def rename_completed(self, oldpath, path, new_name):
        try:
            query = {"file": oldpath}
            index = path.rfind("/")
            file = path[0:index]+"/"+new_name
            query_result = self.mongo.statistiche.completati.find_one(query)
            if query_result is not None:
                self.mongo.statistiche.completati.update_one(
                    query, {"$set": {"file": file}})
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

    def selective_get_completed(self, time, scope, sezione="", completed_by=""):
        try:
            year = date.today().strftime("%Y")
            month = date.today().strftime("%m")
            week = date.today().strftime("%W")
            if (scope == "sezione" and time == "month"):
                query = {"sezione": sezione, "year": year, "month": month}
            elif (scope == "personal" and time == "month"):
                query = {"completed_by": completed_by, "year": year, "month": month}
            elif (scope == "sezione" and time == "week"):
                query = {"sezione": sezione, "year": year, "week": week}
            elif (scope == "personal" and time == "week"):
                query = {"completed_by": completed_by, "year": year, "week": week}
            query_result = self.mongo.statistiche.completati.find(query)
            return json.dumps(list(query_result), default=str)
        except Exception as e:
            print(e)
            return json.dumps({"error": str(e)})

    def get_completed_year(self, sezione):
        try:
            year = date.today().strftime("%Y")
            query = {"sezione": sezione, "year": year}
            query_result = self.mongo.statistiche.completati.find(query)
            return json.dumps(list(query_result), default=str)
        except Exception as e:
            print(e)
            return json.dumps({"error": str(e)})
