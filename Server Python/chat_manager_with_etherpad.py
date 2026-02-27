import requests
from urllib.parse import quote

APIKEY = "5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9"
ETHERPAD_TIMEOUT = 15


class CHAT:

    def __init__(self, etherpad):
        self.etherpad = etherpad

    def get_or_create_chat(self, user_1, user_2):
        if user_1 > user_2:
            group_name = str(user_1) + str(user_2)
        else:
            group_name = str(user_2) + str(user_1)
        group_id = self.etherpad.create_etherpad_group(group_name)
        pad_id_for_chat = self.etherpad.create_group_pad(
            group_id, group_name,
            pad_content="this is a chat pad if you see this contact the administrator"
        )
        return pad_id_for_chat

    def _api_get(self, path_and_query):
        url = f"{self.etherpad.etherpad_domain}{path_and_query}"
        r = requests.get(url, timeout=ETHERPAD_TIMEOUT)
        if r.status_code != 200:
            raise RuntimeError(f"Etherpad API error: HTTP {r.status_code}")
        return r.json()

    def append_message_in_chat(self, pad_id_for_chat, message, author):
        pad_enc = quote(str(pad_id_for_chat), safe="")
        text_enc = quote(str(message), safe="")
        author_enc = quote(str(author), safe="")
        path = f"/api/1/appendChatMessage?apikey={APIKEY}&padID={pad_enc}&text={text_enc}&authorID={author_enc}"
        return self._api_get(path)

    def get_number_of_message(self, pad_id_for_chat):
        pad_enc = quote(str(pad_id_for_chat), safe="")
        path = f"/api/1/getChatHead?apikey={APIKEY}&padID={pad_enc}"
        return self._api_get(path)

    def get_chat(self, pad_id_for_chat, start=-1, end=-1):
        pad_enc = quote(str(pad_id_for_chat), safe="")
        if start == -1 and end == -1:
            path = f"/api/1/getChatHistory?apikey={APIKEY}&padID={pad_enc}"
        else:
            path = f"/api/1/getChatHistory?apikey={APIKEY}&padID={pad_enc}&start={start}&end={end}"
        return self._api_get(path)

