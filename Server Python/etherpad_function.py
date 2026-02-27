"""
Client per l'API HTTP di Etherpad.
Supporta due stili:
- Flat (GET /api/{version}/functionName?params): usato da openapi-backend in Etherpad 2.x
- REST (POST/GET/DELETE /api/2/path con JSON/query): usato da RestAPI.ts
Se GET /api ritorna 404, viene usato automaticamente lo stile REST.
"""
import requests
from datetime import datetime
from urllib.parse import quote

ETHERPAD_TIMEOUT = 15
APIKEY = "5ff7ea9032814c34a8f8daf05038aa9d48d29052678ca34eb40c69a981b118f9"


class ETHERPAD:
    def __init__(self, domain):
        self.etherpad_domain = domain.rstrip("/")
        self._api_style, self._api_version = self._detect_api_style()

    def _detect_api_style(self):
        """Rileva se Etherpad espone l'API flat (/api/1/...) o REST (/api/2/...)."""
        try:
            r = requests.get(
                f"{self.etherpad_domain}/api",
                timeout=5,
            )
            if r.status_code == 200:
                data = r.json()
                ver = data.get("currentVersion", "1")
                return "flat", str(ver)
        except Exception:
            pass
        return "rest", "2"

    def _q(self, **params):
        """Query string con apikey."""
        parts = [f"apikey={quote(APIKEY, safe='')}"]
        for k, v in params.items():
            if v is not None:
                parts.append(f"{quote(str(k), safe='')}={quote(str(v), safe='')}")
        return "&".join(parts)

    def _request_flat_get(self, path_suffix, **query_params):
        """GET su /api/{version}/{path_suffix}?apikey=...&params."""
        q = self._q(**query_params)
        url = f"{self.etherpad_domain}/api/{self._api_version}/{path_suffix}?{q}"
        r = requests.get(url, timeout=ETHERPAD_TIMEOUT)
        if r.status_code != 200:
            raise RuntimeError(f"Etherpad API error: HTTP {r.status_code}, body: {r.text[:200]}")
        try:
            data = r.json()
        except ValueError:
            raise RuntimeError(f"Etherpad API non-JSON: {r.text[:200]}")
        if data.get("code") != 0 and "data" not in data:
            raise RuntimeError(f"Etherpad API error: {data.get('message', data)}")
        return data

    def _request_rest(self, method, path, json_body=None, query_params=None):
        """Richiesta allo stile REST: method su /api/2/path con apikey in query."""
        q = self._q(**(query_params or {}))
        url = f"{self.etherpad_domain}/api/2{path}?{q}"
        if method == "GET":
            r = requests.get(url, timeout=ETHERPAD_TIMEOUT)
        elif method == "POST":
            r = requests.post(
                url,
                json=json_body or {},
                headers={"Content-Type": "application/json"},
                timeout=ETHERPAD_TIMEOUT,
            )
        elif method == "DELETE":
            r = requests.delete(
                url,
                json=json_body or {},
                headers={"Content-Type": "application/json"},
                timeout=ETHERPAD_TIMEOUT,
            )
        else:
            raise ValueError(method)
        if r.status_code != 200:
            raise RuntimeError(f"Etherpad API error: HTTP {r.status_code}, body: {r.text[:200]}")
        try:
            data = r.json()
        except ValueError:
            raise RuntimeError(f"Etherpad API non-JSON: {r.text[:200]}")
        if data.get("code") != 0 and data.get("code") is not None:
            raise RuntimeError(f"Etherpad API error: {data.get('message', data)}")
        return data

    def create_etherpad_user(self, nome_utente, user_id):
        if self._api_style == "flat":
            try:
                data = self._request_flat_get(
                    "createAuthorIfNotExistsFor",
                    name=nome_utente,
                    authorMapper=user_id,
                )
                return data["data"]["authorID"]
            except RuntimeError as e:
                if "404" in str(e):
                    self._api_style = "rest"
                else:
                    raise
        if self._api_style == "rest":
            data = self._request_rest(
                "POST", "/authors/createIfNotExistsFor",
                json_body={"authorMapper": user_id, "name": nome_utente},
            )
            return data["data"]["authorID"]
        raise RuntimeError("Etherpad API non disponibile")

    def create_etherpad_group(self, group_name):
        if self._api_style == "flat":
            try:
                data = self._request_flat_get("createGroupIfNotExistsFor", groupMapper=group_name)
                return data["data"]["groupID"]
            except RuntimeError as e:
                if "404" in str(e):
                    self._api_style = "rest"
                else:
                    raise
        if self._api_style == "rest":
            data = self._request_rest(
                "POST", "/groups/createIfNotExistsFor",
                json_body={"groupMapper": group_name},
            )
            return data["data"]["groupID"]
        raise RuntimeError("Etherpad API non disponibile")

    def create_group_pad(self, group_id, pad_name, pad_content=""):
        if self._api_style == "flat":
            try:
                url = f"{self.etherpad_domain}/api/{self._api_version}/createGroupPad?{self._q(groupID=group_id, padName=pad_name, text=pad_content)}"
                r = requests.get(url, timeout=ETHERPAD_TIMEOUT)
                if r.status_code != 200:
                    raise RuntimeError(f"HTTP {r.status_code}")
                data = r.json()
                if data.get("message") == "padName does already exist":
                    return group_id + "$" + pad_name
                if "data" in data and data.get("code") == 0:
                    return data["data"]["padID"]
                raise RuntimeError(str(data))
            except RuntimeError as e:
                if "404" in str(e):
                    self._api_style = "rest"
                else:
                    raise
        if self._api_style == "rest":
            body = {"groupID": group_id, "padName": pad_name}
            if pad_content:
                body["text"] = pad_content
            data = self._request_rest("POST", "/pads/group", json_body=body)
            pad_id = data.get("data", {}).get("padID")
            if pad_id:
                return pad_id
            return group_id + "$" + pad_name
        raise RuntimeError("Etherpad API non disponibile")

    def create_session_for_pad_id(self, group_id, author_id):
        valid_until = int(datetime.now().timestamp() + 3600)
        if self._api_style == "flat":
            try:
                data = self._request_flat_get(
                    "createSession",
                    groupID=group_id,
                    authorID=author_id,
                    validUntil=valid_until,
                )
                return (data["data"]["sessionID"], str(valid_until))
            except RuntimeError as e:
                if "404" in str(e):
                    self._api_style = "rest"
                else:
                    raise
        if self._api_style == "rest":
            data = self._request_rest(
                "POST", "/sessions",
                json_body={"groupID": group_id, "authorID": author_id, "validUntil": str(valid_until)},
            )
            return (data["data"]["sessionID"], str(valid_until))
        raise RuntimeError("Etherpad API non disponibile")

    def delete_pad(self, pad_id):
        if self._api_style == "flat":
            try:
                data = self._request_flat_get("deletePad", padID=pad_id)
                return data.get("message", "ok")
            except RuntimeError as e:
                if "404" in str(e):
                    self._api_style = "rest"
                else:
                    raise
        if self._api_style == "rest":
            self._request_rest("DELETE", "/pads", json_body={"padID": pad_id})
            return "ok"
        raise RuntimeError("Etherpad API non disponibile")

    def rename_pad(self, pad_id, new_pad_id):
        try:
            if self._api_style == "flat":
                data = self._request_flat_get("getText", padID=pad_id)
            else:
                data = self._request_rest("GET", "/pads/text", query_params={"padID": pad_id})
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
        if self._api_style == "flat":
            data = self._request_flat_get("getLastEdited", padID=pad_id)
        else:
            data = self._request_rest("GET", "/pads/lastEdited", query_params={"padID": pad_id})
        return data["data"]["lastEdited"]
