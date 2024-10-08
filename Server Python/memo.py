from datetime import date, datetime
import json

class Memo:
    def __init__(self, mongo_instance):
        self.mongo = mongo_instance

    def add_memo(self, memo, user):
        try:
            self.mongo.memo.memo.insert_one({"user": user, "title": memo['title'], "note": memo['note'], "date": memo['date'], "time": memo['time']})
            return json.dumps({'status':'ok'})
        except Exception as e:
            return json.dumps({'error': str(e)})

    def get_memo_by_user(self, user):
        try:
            result = []
            query = {'user': user}
            query_result = list(self.mongo.memo.memo.find(query))
            for x in query_result:
                date_to_check = datetime.strptime(x['date'], "%d-%m-%Y")
                print(date_to_check)
                today = datetime.strptime(datetime.today().strftime("%d-%m-%Y"), "%d-%m-%Y")
                print(today)
                if date_to_check >= today:
                    result.append(x)
            return json.dumps(result, default=str)
        except Exception as e:
            return json.dumps({'error': str(e)})