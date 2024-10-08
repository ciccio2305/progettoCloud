import requests
from datetime import timedelta, datetime

# etherpad_domain = 'http://localhost:9001'

class ETHERPAD:
    def __init__(self,domain):
        self.etherpad_domain=domain

    def create_etherpad_user(self,nome_utente, user_id):
        r = requests.get(self.etherpad_domain+'/api/1/createAuthorIfNotExistsFor\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&name='+nome_utente+'&\
authorMapper='+user_id)
        return r.json()['data']['authorID']

    def create_etherpad_group(self,group_name):
        r = requests.get(self.etherpad_domain+'/api/1/createGroupIfNotExistsFor\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&groupMapper='+group_name)
        return r.json()['data']['groupID']

    def create_group_pad(self,group_id, pad_name, pad_content=''):
        r = requests.get(self.etherpad_domain+'/api/1/createGroupPad\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&groupID='+group_id+'&\
padName='+pad_name+'&\
text='+pad_content)
        if r.json()['message'] == 'padName does already exist':
            return group_id + '$' + pad_name
        return r.json()['data']['padID']

    def create_session_for_pad_id(self,group_id, author_id):
        present_date = datetime.now()
        unix_timestamp = datetime.timestamp(present_date)
        r = requests.get(self.etherpad_domain+'/api/1/createSession\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&groupID='+group_id+'&\
authorID='+author_id+'&\
validUntil=' + str(unix_timestamp+3600))
        return (r.json()['data']['sessionID'], str(unix_timestamp+3600))
    
    def delete_pad(self, pad_id):
        r = requests.get(self.etherpad_domain+'/api/1/deletePad?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9&padID='+pad_id)
        return r.json()['message']
    
    def rename_pad(self, pad_id, new_pad_id):
        try:
            r = requests.get(self.etherpad_domain+'/api/1/getText?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9&padID='+pad_id)
            if 'text' in r.json()['data']:
                self.create_group_pad(pad_id.split('$')[0], new_pad_id.split('$')[1], r.json()['data']['text'])
            else:
                self.create_group_pad(pad_id.split('$')[0], new_pad_id.split('$')[1])
            self.delete_pad(pad_id)
            return 'Rinomina effettuata con successo'
        except Exception as e:
            print(e)
            return e
    
    def get_last_edited(self,pad_id):
        r = requests.get(self.etherpad_domain+'/api/1/getLastEdited?padID=' + pad_id + '&apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9')
        return r.json()['data']['lastEdited']

