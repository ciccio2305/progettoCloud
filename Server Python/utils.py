import base64
import hashlib
import json
from bson import json_util

def get_fatherpath_and_filename_from_path(path):
    file_name = path[path.rfind('/')+1:len(path)]
    father_path = "/"+path[0:path.rfind(file_name)]
    return [file_name, father_path]

def parse_path(path):
    if(path[len(path)-1]=="/"):
        return path[0:len(path)-1]
    return path

def encode_pad_name(father_path, pad_name):
    return base64.urlsafe_b64encode(hashlib.sha256((father_path + pad_name).encode()).digest()).decode('utf-8')

def parse_json(data):
    return json.loads(json_util.dumps(data))