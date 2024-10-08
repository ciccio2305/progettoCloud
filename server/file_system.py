from etherpad_function import ETHERPAD
import utils

class FILE_SYSTEM_HANDLER:
    id="id"
    name="name"
    type="type"
    cartella="DIR"
    file="PAD"

    owner_group_id="group_id"
    owner_group_name="group_name"
    father_dir="father_dir"
    pad_id="id"
    completato="completato"

    def __init__(self,mongo_instance,etherpad_instance, stats_instance):
        self.mongo=mongo_instance
        self.etherpad=etherpad_instance
        self.statistiche = stats_instance

    def create_root_dir(self, dir_name, group_id, group_name):
        files=self.mongo.file_system.FILE
        target=files.find_one({self.name: dir_name})
        if target is None:
            files.insert_one({self.name:dir_name,self.type:self.cartella,self.owner_group_id:group_id, self.father_dir:"/",self.owner_group_name:group_name})
            return "il file "+dir_name+" è stato creato correttamente"
        else:
            return "errore nella creazione del file di nome "+dir_name+" esiste gia un file con quel nome"
        

    def create_dir(self,dir_name,father_path,group_id, group_name):
        files=self.mongo.file_system.FILE

        fine=father_path.rfind("/")
        inizio=father_path[0:-1].rfind("/")

        cartella_padre=self.list_all_file_in_dir(father_path[inizio+1:fine],father_path[0:inizio+1],group_id)

        if(cartella_padre=="cartella "+father_path[inizio+1:fine]+" non trovata"):
            return "la cartella padre non esiste"

        target=files.find_one({self.name: dir_name,self.father_dir:father_path,
                               self.owner_group_id:group_id,self.owner_group_name:group_name,self.type:self.cartella})
        if target is None:
            files.insert_one({self.name: dir_name,self.type:self.cartella,self.father_dir:father_path, self.owner_group_id:group_id,self.owner_group_name:group_name})
            return "la cartella "+dir_name+" è stato creata correttamente"
        else:
            return "errore nella creazione del file di nome "+dir_name+" esiste gia un file con quel nome"
        
    def create_pad(self,pad_name,father_path,group_id, group_name):
        files=self.mongo.file_system.FILE
        target=files.find_one({self.name: pad_name,self.father_dir:father_path,
                               self.owner_group_id:group_id,self.owner_group_name:group_name, self.type:self.file})
        if target is None:
            new_pad_name = utils.encode_pad_name(father_path, pad_name)
            etherpad_id=self.etherpad.create_group_pad(group_id, new_pad_name)
            print(etherpad_id)
            files.insert_one({self.pad_id:etherpad_id, self.name: pad_name,self.type:self.file, self.father_dir:father_path,
                              self.owner_group_id:group_id,self.owner_group_name:group_name, self.completato:False})
            return "il file "+pad_name+" è stato creato correttamente"
        else:
            return "errore nella creazione del file di nome "+pad_name+" esiste gia un file con quel nome"
        
    def list_all_file_in_dir(self, dir_name,father_path,group_id):
        files=self.mongo.file_system.FILE
        cartella=files.find_one({self.name:dir_name,self.father_dir:father_path,self.owner_group_id:group_id,self.type:self.cartella})
        if cartella is None:
            return "cartella "+dir_name+" non trovata"
        
        if cartella[self.type]==self.cartella:
            target=files.find({self.father_dir:father_path+dir_name+"/",self.owner_group_id:group_id})
            return target
        else:
            return "il file non è una cartella o non è presente"
        
    def delete_pad(self, path):
        try:
            files = self.mongo.file_system.FILE
            completati = self.mongo.statistiche.completati
            [file_name, father_path] = utils.get_fatherpath_and_filename_from_path(path)
            files.delete_one({self.name: file_name, self.father_dir: father_path, self.type: self.file})
            query = {"file": "/"+path}
            query_result = completati.find_one(query)
            if query_result is not None:
                completati.delete_one(query)
        except:
            return "Errore nella cancellazione del file"

    def delete_directory(self, path, group_id):
        try:
            [dir_name, father_path] = utils.get_fatherpath_and_filename_from_path(path)
            files = self.mongo.file_system.FILE
            x = list(self.list_all_file_in_dir(dir_name, father_path, group_id))
            if len(x) == 0:
                files.delete_one({self.name: dir_name, self.father_dir:father_path, self.type: self.cartella})
                return 'Cancellazione effettuata'
            for record in x:
                new_path = (path+'/'+record[self.name])
                query_result = files.find({self.name: record[self.name], self.father_dir: record[self.father_dir]})
                for result in query_result:
                    if result[self.type]==self.cartella:
                        self.delete_directory(new_path, group_id)
                    else:           
                        self.delete_pad(new_path)
                        [pad_name, pad_father_path] = utils.get_fatherpath_and_filename_from_path(new_path)
                        self.etherpad.delete_pad(group_id+"$"+utils.encode_pad_name(pad_father_path, pad_name))  
                files.delete_one({self.name: dir_name, self.father_dir:father_path, self.type: self.cartella})
            return 'Cancellazione effettuata'
        except Exception as e:
            print(e)
            return e

    def rename_file(self, path, new_name, group_id):
        try:
            # rinomina file in db del filesystem
            files = self.mongo.file_system.FILE
            completati = self.mongo.statistiche.completati
            [file_name, father_path] = utils.get_fatherpath_and_filename_from_path(path)
            encoded_file_id = group_id + "$" + utils.encode_pad_name(father_path, file_name)
            new_file_id = group_id + "$" + utils.encode_pad_name(father_path, new_name)
            files.update_one({self.id: encoded_file_id}, {"$set": {self.id: new_file_id, self.name: new_name}})
            # ricerca tra i completati
            query = {"file": "/"+path}
            query_result = completati.find_one(query)
            if query_result is not None:
                completati.update_one(query, {"$set": {"file": father_path+new_name}})
            # rinomina file in etherpad
            self.etherpad.rename_pad(encoded_file_id, new_file_id)
            return 'Rinominazione effettuata'
        except Exception as e:
            print(str(e))
            return 'Errore nella rinominazione del file'

    def rename_folder(self, path, new_name, group_id):
        try:
            files = self.mongo.file_system.FILE
            [dir_name, father_path] = utils.get_fatherpath_and_filename_from_path(path)
            father_path = father_path.replace("//", "/")
            files.update_one({self.name: dir_name, self.father_dir: father_path}, {"$set": {self.name: new_name}})
            new_path = father_path + new_name + "/"
            regex_pattern = "^" + path
            query_result = list(files.find({"father_dir": {"$regex": regex_pattern}}))
            for record in query_result:
                new_path_of_child = (new_path + record[self.father_dir].replace(path,"",1)).replace("//", "/")
                if record[self.type]==self.file:
                    files.update_one({self.name: record[self.name], self.father_dir: record[self.father_dir], self.type:self.file}, {"$set": {self.father_dir: new_path_of_child, self.id: group_id+"$"+utils.encode_pad_name(new_path_of_child, record[self.name])}})
                    self.etherpad.rename_pad(record[self.id], group_id+"$"+utils.encode_pad_name(new_path_of_child, record[self.name]))
                    self.statistiche.rename_completed(record[self.father_dir]+record[self.name],new_path_of_child,record[self.name])
                else:
                    files.update_one({self.name: record[self.name], self.father_dir: record[self.father_dir], self.type:self.cartella}, {"$set": {self.father_dir: new_path_of_child}})
        except Exception as e:
            print(str(e))
            return 'Errore nella rinominazione della cartella'
         
    def update_status(self, pad_name, father_path, group_id, group_name):
        files=self.mongo.file_system.FILE
        target=files.find_one({self.name: pad_name,self.father_dir:father_path,
                               self.owner_group_id:group_id,self.owner_group_name:group_name})
        files.update_one({self.name: pad_name,self.father_dir:father_path,self.owner_group_id:group_id,self.owner_group_name:group_name},
        {"$set": {self.completato: not target[self.completato]}})

