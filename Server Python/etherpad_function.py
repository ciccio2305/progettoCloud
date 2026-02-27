import requests
from datetime import timedelta, datetime
from urllib.parse import quote

# Timeout per le chiamate API Etherpad (secondi)
ETHERPAD_TIMEOUT = 15
APIKEY = "5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9"


class ETHERPAD:
    def __init__(self, domain):
        self.etherpad_domain = domain.rstrip("/")

    def _api_get(self, path_and_query):
        """Esegue GET sull'API Etherpad; solleva se risposta non OK o non JSON."""
        url = f"{self.etherpad_domain}{path_and_query}"
        r = requests.get(url, timeout=ETHERPAD_TIMEOUT)
        if r.status_code != 200:
            raise RuntimeError(
                f"Etherpad API error: HTTP {r.status_code}, body: {r.text[:200]}"
            )
        try:
            data = r.json()
        except ValueError as e:
            raise RuntimeError(
                f"Etherpad API non-JSON response (status={r.status_code}): {r.text[:200]}"
            ) from e
        if data.get("code") != 0 and "data" not in data:
            raise RuntimeError(
                f"Etherpad API error: {data.get('message', data)}"
            )
        return data

    def create_etherpad_user(self, nome_utente, user_id):
        name_enc = quote(str(nome_utente), safe="")
        author_enc = quote(str(user_id), safe="")
        path = f"/api/1/createAuthorIfNotExistsFor?apikey={APIKEY}&name={name_enc}&authorMapper={author_enc}"
        data = self._api_get(path)
        return data["data"]["authorID"]

    def create_etherpad_group(self, group_name):
        group_enc = quote(str(group_name), safe="")
        path = f"/api/1/createGroupIfNotExistsFor?apikey={APIKEY}&groupMapper={group_enc}"
        data = self._api_get(path)
        return data["data"]["groupID"]

    def create_group_pad(self, group_id, pad_name, pad_content=""):
        group_enc = quote(str(group_id), safe="")
        pad_enc = quote(str(pad_name), safe="")
        text_enc = quote(str(pad_content), safe="")
        path = f"/api/1/createGroupPad?apikey={APIKEY}&groupID={group_enc}&padName={pad_enc}&text={text_enc}"
        url = f"{self.etherpad_domain}{path}"
        r = requests.get(url, timeout=ETHERPAD_TIMEOUT)
        if r.status_code != 200:
            raise RuntimeError(f"Etherpad API error: HTTP {r.status_code}, body: {r.text[:200]}")
        try:
            data = r.json()
        except ValueError:
            raise RuntimeError(f"Etherpad API non-JSON response: {r.text[:200]}")
        if data.get("message") == "padName does already exist":
            return group_id + "$" + pad_name
        if "data" in data and data.get("code") == 0:
            return data["data"]["padID"]
        raise RuntimeError(f"Etherpad API error: {data.get('message', data)}")

    def create_session_for_pad_id(self, group_id, author_id):
        present_date = datetime.now()
        unix_timestamp = datetime.timestamp(present_date)
        valid_until = int(unix_timestamp + 3600)
        group_enc = quote(str(group_id), safe="")
        author_enc = quote(str(author_id), safe="")
        path = f"/api/1/createSession?apikey={APIKEY}&groupID={group_enc}&authorID={author_enc}&validUntil={valid_until}"
        data = self._api_get(path)
        return (data["data"]["sessionID"], str(valid_until))

    def delete_pad(self, pad_id):
        pad_enc = quote(str(pad_id), safe="")
        path = f"/api/1/deletePad?apikey={APIKEY}&padID={pad_enc}"
        data = self._api_get(path)
        return data["message"]

    def rename_pad(self, pad_id, new_pad_id):
        try:
            pad_enc = quote(str(pad_id), safe="")
            path = f"/api/1/getText?apikey={APIKEY}&padID={pad_enc}"
            data = self._api_get(path)
            text = data.get("data", {}).get("text", "")
            group_id = pad_id.split("$")[0]
            new_pad_name = new_pad_id.split("$")[1]
            if text:
                self.create_group_pad(group_id, new_pad_name, text)
            else:
                self.create_group_pad(group_id, new_pad_name)
            self.delete_pad(pad_id)
            return "Rinomina effettuata con successo"
        except Exception as e:
            print(e)
            return e

    def get_last_edited(self, pad_id):
        pad_enc = quote(str(pad_id), safe="")
        path = f"/api/1/getLastEdited?apikey={APIKEY}&padID={pad_enc}"
        data = self._api_get(path)
        return data["data"]["lastEdited"]
