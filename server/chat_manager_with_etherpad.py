import requests
from datetime import timedelta, datetime


# etherpad_domain = 'http://localhost:9001'

class CHAT:

    def __init__(self,etherpad):
        self.etherpad=etherpad

    def get_or_create_chat(self,user_1, user_2):

        group_name=""

        if user_1>user_2:
            group_name=str(user_1)+str(user_2)
        else:
            group_name=str(user_2)+str(user_1)

        group_id=self.etherpad.create_etherpad_group(group_name)
        pad_id_for_chat=self.etherpad.create_group_pad(group_id,group_name,pad_content="this is a chat pad if you see this contact the administrator")

        return pad_id_for_chat
    
    def append_message_in_chat(self,pad_id_for_chat,message,author):

        r = requests.get(self.etherpad_domain+'/api/1/appendChatMessage\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&text='+message+'&\
padName='+pad_id_for_chat+'&\
authorID ='+author)
        return r.json()
    

    def get_number_of_message(self,pad_id_for_chat):

        r = requests.get(self.etherpad_domain+'/api/1/getChatHead\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&padID='+pad_id_for_chat)
        
        return r.json()
    
    def get_chat(self,pad_id_for_chat,start=-1,end=-1):
        
        if(start==-1 and end==-1):
            r = requests.get(self.etherpad_domain+'/api/1/getChatHistory\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&padID='+pad_id_for_chat)
        
        else:
            
            r = requests.get(self.etherpad_domain+'/api/1/getChatHistory\
?apikey=5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9\
&padID='+pad_id_for_chat+"&\
start="+start+"&\
end="+end)
        
        return r.json()

