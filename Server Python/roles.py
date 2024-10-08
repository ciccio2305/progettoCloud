import json

class Role:
    def __init__(self):
        self.roles = [{'name':'Addetto UPP'}, {'name':'Magistrato'}, {'name':'Amministratore'}]

    def get_roles(self):
        return json.dumps(self.roles, default=str)

