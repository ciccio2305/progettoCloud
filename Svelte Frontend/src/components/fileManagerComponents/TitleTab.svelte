<script>
    import * as ListFile from "./ListFile.js";
    import { currentPath} from "../../services/stores";
    import { onDestroy } from "svelte";
    import { disableScrollHandling } from "$app/navigation";
    import config from "../../services/config";

    var menu=false;
    var newDir="offDir";
    var newFile="offFile";
    var input=false;
    var onInput="inputTextoff";
    var inputFile=false;
    var onInputFile="inTextFileOff";
    var text="";
    var path="";
    var nome="";

    currentPath.subscribe(value=>{path=value});

    function menuSwitch(){
        let file = document.querySelector('.fileButton');
        let dir = document.querySelector('.dirButton');
        let menu = document.querySelector('.new');
        let dirStyle; 
        console.log(typeof(dir));
        if (dir != null){
            dirStyle = window.getComputedStyle(dir);
            console.log(dirStyle.getPropertyValue("display"));
        }
        if (dirStyle.getPropertyValue("display") === "none") {
            dir.style.display = "block";
            file.style.display = "block";
            menu.style.marginTop = "10vh";
            menu.style.width = "10vw";
        } else {
            dir.style.display = "none";
            file.style.display = "none";
            menu.style.marginTop = "0";
            menu.style.width = "";
        }
    }

    function inputSwitch(newText){
        nome = newText;
        console.log("INPUT SWITCH");
        let filter = document.querySelector('#filter');
        let input = document.querySelector('.newInput');
        let inputStyle;
        if (input != null)
            inputStyle = window.getComputedStyle(input);
        if (inputStyle != undefined) {
            if (inputStyle.getPropertyValue("display") === "none") {
                input.style.display = "block";
                filter.style.display = "block";
            } else {
                input.style.display = "none";
                filter.style.display = "none";
            }
        }
            
    }

    function create(event){
        if (nome == "la cartella"){
            createDire(event);
        } else {
            createFile(event);
        }
        
    }

    function createDire(event){
        // @ts-ignore
        console.log("CREATE DIR")
        if (event.key === 'Enter') {
            input=false;
            onInput="inputTextoff";
            ListFile.createDir(text);
            text="";

            inputSwitch();
            menuSwitch();

        }
        else if(event.button===0){
            input=false;
            onInput="inputTextoff";
            ListFile.createDir(text);
            text="";
            inputSwitch();
            menuSwitch();
        }
    }

    function createFile(event){
        
        // @ts-ignore
        if (event.key === 'Enter') {
            console.log("CREATE FILE")
            inputFile=false;
            onInputFile="inTextFileOff";
            ListFile.createFile(text);
            text="";

            inputSwitch();
            menuSwitch();

        }
        else if(event.button===0){
            console.log("CREATE FILE")
            inputFile=false;
            onInputFile="inTextFileOff";
            ListFile.createFile(text);
            text="";
            inputSwitch();
            menuSwitch();
        }
    }

    function refreshPath(){
        console.log("REFRESH PATH(): "+ path);
    }
    refreshPath();
    var currentElement;
    var currentElementType;

    document.oncontextmenu = function(e) {
        currentElement = "";
        currentElementType = "";
        currentElement = e.target.parentElement.childNodes[0];
        currentElementType = e.target.parentElement.childNodes[1];
        let div = document.getElementById("contextMenu");
        let style = getComputedStyle(div);

        if (style.display == "none" && (currentElementType.innerHTML == "File di testo" || currentElementType.innerHTML == "Cartella") ){
            e.preventDefault();
            console.log(currentElement)
            
            

            if (style.display === "none") {
                div.style.display = "flex";
                div.style.left = e.pageX + "px";
                div.style.top = e.pageY + "px";

                let disable = document.createElement("div");
                disable.id = "disable";
                disable.style.width = "100%";
                disable.style.height = "100%";
                disable.style.position = "absolute";
                disable.style.zIndex = "998"; 
                disable.style.top = "0";
                disable.style.left = "0";
                disable.id = "disable";

                document.body.appendChild(disable);
                disable.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    console.log("click")
                    let div = document.getElementById("contextMenu");
                    let style = getComputedStyle(div);
                    if (style.display === "flex") {
                        div.style.display = "none";
                        document.body.style.pointerEvents = "auto";
                    }
                    disable.remove();
                }
            }
        }else{
            let disable = document.getElementById("disable");
            disable?.click();
        }
    }

    onDestroy(() => {
        document.oncontextmenu = null;
    });
    
    function open(){
        console.log("click")
        let div = document.getElementById("contextMenu");
        div.style.display = "none";
        let disable = document.getElementById("disable");
        disable.remove();
        currentElement.click();
    
    }

    function rename(){
        console.log("click")
        let div = document.getElementById("contextMenu");
        div.style.display = "none";
        let disable = document.getElementById("disable");
        disable.remove();
        //currentElement.click();

        currentElement.contentEditable = "true";
        let backup = currentElement.innerHTML;
        currentElement.innerHTML = "";
        currentElement.focus();
        currentElement.style.outline = "none";
        currentElement.style.padding = "5px";
        currentElement.onkeydown = function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                currentElement.contentEditable = "false";
                let fileTitle = currentElement.innerHTML;

                if (currentElementType.innerHTML == "Cartella"){
                    console.log("rinomino cartella")
                    fetch(config.getHost()+"/api/rename_folder", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "path": ListFile.Path,
                            "oldName": backup,
                            "newName": fileTitle
                        })
                    })
                    .then(response => {response.text().then(data => {console.log(data); ListFile.ls(ListFile.Path);})}); 
                }
                else {
                    console.log("rinomino file")
                    fetch(config.getHost()+"/api/rename_file", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "path": ListFile.Path,
                            "oldName": backup,
                            "newName": fileTitle
                        })
                    })
                    .then(response => {response.text().then(data => {console.log(data); ListFile.ls(ListFile.Path);})}); 
                }
            }
            else {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    currentElement.contentEditable = "false";
                    currentElement.innerHTML = backup;
                }
            }
    }
        
    
    }

    function del(){
        console.log("click")
        let div = document.getElementById("contextMenu");
        div.style.display = "none";
        let disable = document.getElementById("disable");
        disable.remove();

        let fileTitle = currentElement.innerHTML;
        console.log(fileTitle);
        
       
        if (currentElementType.innerHTML == "Cartella"){
            console.log("elimino cartella")
            fetch(config.getHost()+"/api/delete_folder" + ListFile.Path + "/" + fileTitle, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {response.text().then(data => {console.log(data); ListFile.ls(ListFile.Path);})});

            
        }
        else {
            console.log("elimino file")
            fetch(config.getHost()+"/api/delete_file" + ListFile.Path + "/" + fileTitle, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {response.text().then(data => {console.log(data); ListFile.ls(ListFile.Path);})});
        }
        
    
    }
</script>

<div id = "contextMenu">
    <div on:click={open}>Apri</div>
    <div on:click={rename}>Rinomina</div>
    <div on:click={del}>Elimina</div>
</div>

<div class="tab">
    <div class="title">File</div>

    <input class="path" bind:value={$currentPath}>

    <div class="new">
        <div class="new1" on:click={menuSwitch}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAJlJREFUSEvtltsJgDAMRU83cBQ3UDfSSXQjdQNHcQQpVBCkDysaheT3ht72NGljEAoj5Isav0b+d6hLYHB4WmC5iir3xDUwOrMGmNQ4RkBRxwjt+qPFZVum8OzEar3TukA7rT4tdMe2RapUBJ68GbB0TvFJYzHUIcqPFpcaHwko6te+RbFB4OaDho63twkmL5A7gSQb+BLFjDd6nCgfe6urvwAAAABJRU5ErkJggg=="/>
            <div class="textNewButton">Nuovo</div>
        </div>

        <div class="dirButton" on:click={() => {inputSwitch("la cartella")}} >
            Nuova Cartella  
        </div>

        <div class="fileButton" on:click={() => {inputSwitch(" file")}} >
            Nuovo File
        </div>
    </div>

    <div class = "newInput">

        <img on:click={inputSwitch} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAJlJREFUSEvtltsJgDAMRU83cBQ3UDfSSXQjdQNHcQQpVBCkDysaheT3ht72NGljEAoj5Isav0b+d6hLYHB4WmC5iir3xDUwOrMGmNQ4RkBRxwjt+qPFZVum8OzEar3TukA7rT4tdMe2RapUBJ68GbB0TvFJYzHUIcqPFpcaHwko6te+RbFB4OaDho63twkmL5A7gSQb+BLFjDd6nCgfe6urvwAAAABJRU5ErkJggg=="/>
        <div>
            Inserisci il nome del{nome}
            <input type="text" bind:value={text}  on:keydown={create}>
            <div class="submit" on:click={create}>
                Conferma
            </div>
        </div>

    </div>

    <div id = "filter"></div>
</div>



<style>
     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
    
    *{
        font-family: 'Montserrat';
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    .tab{
        width:100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid rgb(57, 107, 235);
    }
  

    .title{
        margin-left: 10px;
        font-weight: bold;
        font-size: 4.2vh;
        
    }

    .new{
        width: 3vw;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 3vw;
        cursor: pointer;
        z-index: 1;
        transition: 0.5s width;
    }

    .new:hover{
        width: 10vw;
    }

    .new:hover>.new1>img{
        transform: rotate(180deg);
    }

    img{
        transition: 0.5s;
    }

    .textNewButton{
        font-size: 2vh;
        display: none;
        opacity: 0;
        transition: 0.5s opacity;
        transition-delay: 1s;
    }

    .new:hover>.new1>.textNewButton{
        display: block;
        opacity: 1;
    }

    .new1{
        width:100%;
        height:5vh;
        display: flex;
        align-items: center;
        background-color: rgb(255, 255, 255);
        justify-content: center;
        border-radius: 10px;
        
        
    }

    .new1:hover{
        background-color: rgb(165, 163, 161);
    }

    .dirButton{
        width: 100%;
        height:5vh;
        border-radius: 10px;
        background-color: white;
        font-size: 15px;
        line-height: 5vh;
        text-align: center;
        display: none;
    }
    
    .dirButton:hover{
        width: 100%;
        height:5vh;
        border-radius: 10px;
        background-color: rgb(199, 199, 199);
        font-size: 15px;
        line-height: 5vh;
        text-align: center;
        transition: 0.2s;
    }

    .fileButton{
        width: 100%;
        height:5vh;
        border-radius: 10px;
        background-color: white;
        font-size: 15px;
        line-height: 5vh;
        text-align: center;
        display: none;
    }
    
    .fileButton:hover{
        width: 100%;
        height:5vh;
        border-radius: 10px;
        background-color: rgb(199, 199, 199);
        font-size: 15px;
        line-height: 5vh;
        text-align: center;
        transition: 0.2s;
    }

    .path{
        width: 20vw;
        height: 5vh;
        display: flex;
        background-color: white;
        border-radius: 10px;
        margin-top: 5px;
        align-items: center;
        pointer-events: none;
        font-weight: bold;
        border: none;
        padding: 1vh;
    }

    #filter{
        width: 100%;
        height: 100%;
        backdrop-filter: blur(3px);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        display: none;
    }

    .newInput{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25vw;
        height: 15vw;
        background-color: rgb(255, 255, 255);
        border-radius: 20px;
        z-index: 1000;
        display: none;

        text-align: center;
        line-height: 7vh;
        font-size: 2.5vh;
        font-weight: bolder;

      
    }

    .newInput>div{
        margin-top: 3vh;
    }

    .newInput>div>input{
        width: 50%;
        height: 5vh;
        border-radius: 10px;
        background-color: white;
        font-size: 15px;
        line-height: 5vh;
        text-align: center;
        display: block;
        margin: auto;
       
    }

    .newInput>img{
        width: 2vw;
        height: 2vw;
        cursor: pointer;
        display: block;
        transform: rotate(45deg);
        left: 22.5vw;
        position: relative;
    }

    .submit{
        background-color: rgb(51, 84, 218);
        color: white;
        border-radius: 10px;
        width: 10vw;
        height: 6vh;
        margin: auto;
        margin-top: 2vh;
        line-height: 6vh;
    }

    .submit:hover{
        cursor: pointer;
        background-color: rgb(0, 35, 175);
    }

    :global(#contextMenu){
        width: 200px;
        height: 150px;
        position: absolute;
        
        z-index: 999;
        
        background-color: #a3a3a3;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-radius: 15px;
        overflow: hidden;
    }

    :global(#contextMenu > div){
        height: calc(100% / 3);
        text-align: center;
        line-height: calc(150px / 3);
        width: 100%;
        cursor: pointer;
    }

    :global(#contextMenu > div:hover){
        background-color: #e3e3e3;
    }

</style>