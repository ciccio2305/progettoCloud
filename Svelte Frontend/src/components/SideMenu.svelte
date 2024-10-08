<script>
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';  
    import * as ListFile from "./fileManagerComponents/ListFile";
    import config from "../services/config";
    function logOut(){
        goto('/login');
        fetch(config.getHost()+"/api/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .catch(error => console.log(error));
    }

    function gotoChat(){
        goto('/chat');

    }
    
    function gotoFile(event){
        goto('/fileManager'); 
        event.stopPropagation;
    }

    function gotoSettings(){
        goto('/settings');
    }

    function gotoHome(){
        goto('/homepage');    
    }

    function gotoEtherpad(){
        goto('/etherpadManager');
    }

    function selectorBehav(){
        let startPosMid = 92;
        let offset = 60;
        let selector = document.getElementById('selector');
        let selected = $page.url.pathname.split('/')[1];
        console.log(selected)
        switch (selected) {
            case "homepage":
                selector.style.opacity = 0;
                break;

            case "fileManager":
                selector.style.opacity = 1;
                selector.style.top = startPosMid + 'px';
                break;

            case "chat":
                selector.style.opacity = 1;
                selector.style.top = startPosMid + offset + 'px';
                break;
            
            case "etherpadManager":
                selector.style.opacity = 1;
                selector.style.top = startPosMid + 2*offset + 'px';
                break;
            default:
                break;
        }
    }

    function clear(){
        let selector = document.getElementById('selector');
        selector.style.transition = "";
        
        
    }

    function pos(){
        let startPosMid = 92;
        let offsetMid = 60;
        let startPosLow = 595;
        let offsetLow = 60;

        let sideMenu = document.getElementsByClassName('sideMenu')[0];
        let chat = document.getElementsByClassName('chatEntry')[0];
        let file = document.getElementsByClassName('fileEntry')[0];
        let etherpad = document.getElementsByClassName('etherpadEntry')[0];
        let settings = document.getElementsByClassName('settingsEntry')[0];
        let logout = document.getElementsByClassName('exitEntry')[0];

        let selector = document.getElementById('selector');
        let style = window.getComputedStyle(selector);
        
        sideMenu?.addEventListener('mouseleave', function(){
            selectorBehav()
        })
        if (document.readyState == 'complete') {
            selectorBehav();
        }

        file?.addEventListener('mouseover', function(){
            if (style.opacity == 0){
                selector.style.opacity = 1;
                selector.style.animation = "opacity 0.2s"; 

            }
            selector.style.top = startPosMid + 'px';
            selector.style.transition = 'top 0.2s ease-in-out';
            
        })
        chat?.addEventListener('mouseover', function(){
            if (style.opacity == 0){
                selector.style.opacity = 1;
                selector.style.animation = "opacity 0.2s"; 

            }
            selector.style.top = startPosMid + offsetMid +'px';
            selector.style.transition = 'top 0.2s ease-in-out';
           
            
        })
        etherpad?.addEventListener('mouseover', function(){
            if (style.opacity == 0){
                selector.style.opacity = 1;
                selector.style.animation = "opacity 0.2s"; 

            }
            selector.style.top = startPosMid + 2*offsetMid +'px';
            selector.style.transition = 'top 0.2s ease-in-out';
           
        })

        // settings?.addEventListener('mouseover', function(){
        //     if (style.opacity == 0){
        //         selector.style.opacity = 1;
        //         selector.style.animation = "opacity 0.2s"; 

        //     }
        //     selector.style.top = "calc(100% - 130px)";
        //     selector.style.transition = 'top 0.2s ease-in-out';
           
            
        // })

        logout?.addEventListener('mouseover', function(){
            if (style.opacity == 0){
                selector.style.opacity = 1;
                selector.style.animation = "opacity 0.2s"; 

            }
            selector.style.top = "calc(100% - 98px)";
            selector.style.transition = 'top 0.2s ease-in-out';
           
            
        })

    } 
    setTimeout(()=>{
        pos();
    }, 100);
    
    function refreshPage(event){
        
        ListFile.ls(ListFile.Path);
        event.stopPropagation;
    }
</script>

<div class="sideMenu" on:mouseout={clear}>
    <div id="upperSection">
        <div id="clicker" on:click={gotoHome}> <div  id="logo" on:click={gotoHome}></div> </div>
    </div>

    <div id="midSection">
        <div id="selector"></div>

        <div style="display: flex" class="fileEntry entry"on:click={gotoFile} on:click={refreshPage}>
            <div class="icon" id="file" ></div>
            <div class="text"> <div> Esplora File </div> </div>
        </div>

        <div style="display: flex" class="chatEntry entry" on:click={gotoChat}>
            <div class="icon" id="chat" ></div>
            <div class="text"> <div> Messaggi </div> </div>
        </div>

        <div style="display: flex" class="etherpadEntry entry" on:click={gotoEtherpad}>
            <div class="icon" id="etherpad" ></div>
            <div class="text"> <div> Etherpad </div> </div>
        </div>

    </div>

    <div id="lowerSection">
        
        <!-- <div style="display: flex" class="settingsEntry entry" on:click={gotoSettings}>
            <div class="icon" id="settings" ></div>
            <div class="text"> <div> Impostazioni </div> </div>
        </div> -->

        <div style="display: flex" class="exitEntry entry" on:click={logOut}>
            <div class="icon" id="exit" ></div>
            <div class="text"> <div> Log Out </div> </div>
        </div>
    </div>

    
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
    *{
        font-family: 'Montserrat';
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    .sideMenu{
        background-color: white;
        height: 100vh;
        width: 4vw;
        min-height: 420px;
        display: flex;
        flex-direction: column;
        transition: all 0.5s;
        /* transition-delay: 0.2s; */
        min-width: 50px;
    }

    .sideMenu:hover{
        width: 10vw;
        transition: all 0.5s;
    } 

 
    .entry {
        z-index: 1;
        height: 30px;
    }

    .sideMenu:hover #clicker{
        width: 100%;
        height: 100%;
    }

    #upperSection div{
        cursor: pointer;
    }
    
    #midSection div{
        cursor: pointer;
    }

    #lowerSection div{
        cursor: pointer;
    }

    #upperSection{
        width: 100%;
        height: 80px;
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-bottom: 2px solid rgb(59, 59, 59);
        
    }

    #midSection{
        width: 100%;
        height: calc(100% - 230px);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        border-bottom: 2px solid rgb(59, 59, 59);
        padding-top: 20px;
        gap: 30px;
    }

    #lowerSection{
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        justify-content: space-evenly;
       

    }

    .icon{
        width: 25px;
        height: 25px;
        background-size: cover;
        cursor: pointer;
        display: inline-block;
    }

    .text{
        font-size: 15px;
        font-weight: bold;
        
        line-height: 25px;
        opacity: 0;
        width: 0px;
        white-space: nowrap;
        overflow: hidden;
        display: none;
        
    }

    .sideMenu:hover .text{
        
        animation: 0.8s ease-out 0.2s forwards openclose;
        display: block;
    }

    #clicker {
        cursor: pointer;
        width: 40px;
        height: 80px;
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #midSection .icon{

        margin-bottom: 30px;
        z-index: 1;
    }

    #lowerSection .icon{
        z-index: 1;
    }

    #file{
        background-image: url("../icons/file.png");
    }

    #chat{
        background-image: url("../icons/chat.png");
    }

    #etherpad{
        background-image: url("../icons/etherpad.png");
    }

    #settings{
        background-image: url("../icons/settings.png");
    }

    #exit{
        background-image: url("../icons/exit.png");
    }

    #logo{
        background-image: url("../img/Logo.png");
        margin-left: 0px;
        width: 40px;
        height: 40px;
        background-size: cover;
        display: inline-block;
    }

    #selector{
        height: 40px;
        width: 1.8vw;
        background-color: rgba(57, 111, 211, 0.3);
        border-radius: 5px;
        position: absolute;
        top: 0px;
        left: 1vw;
        opacity: 0;
        transition: all 0.5s;
    }

    .sideMenu:hover #selector{
        width: 8vw;
        left: 0.5vw;
        transition-delay: 0.1s;
    }

    @keyframes openclose {
        0% {
            width: 0;
            opacity: 0;
            margin-left: -15px;
        }
        100% {
            width: 110px;
            opacity: 1;
            margin-left: 15px;
        }
    }

  @keyframes blink
{
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
}



@media (max-width: 1600px) {
    #selector{
        width: 2vw;
    }

    .sideMenu:hover #selector{
        width: 2vw;
    }

    .sideMenu:hover .text{
        display: none;
    }

    .sideMenu:hover{
        width: 55px;
    } 
}

@media (max-width: 1300px) {
    #selector{
        width: 30px;
    }

    .sideMenu:hover{
        width: 35px;
    } 

    .sideMenu:hover #selector{
        width: 30px;
    }

    
}

@media (max-width: 1000px) {
    #selector{
       width: 35px;
    }
    .sideMenu:hover #selector{
        width: 35px;
    }

    


}

@media (max-width: 800px) {
    #selector{
        width: 30px;
        margin-left: 5px;
    }
}

@media (max-width: 500px) {
    #selector{
        width: 30px;
        margin-left: 5px;
    }
}
</style>