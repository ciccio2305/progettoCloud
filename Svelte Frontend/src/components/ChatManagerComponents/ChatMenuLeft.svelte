<script>
    import ChatTab from "./components/ChatTab.svelte";
    import NewChatTab from "./components/NewChatTab.svelte";
    import {chats, searchFlag} from "../../services/stores.js";
    import {userSearch} from "../../services/stores.js";

    import { lastMsg } from "../../services/stores";
    import { lastMsgTime } from "../../services/stores";
    import { lastMsgUser } from "../../services/stores";
    import config from "../../services/config";


    var Chats = [];

    var newChats = [];

    let lastMSG = "";
    let lastMSGTime = "";

    function searchUser(event) {
        if (event.target.value.length >= 1) {
            //chats.set([]);
            console.log(event.target.value);
            let searchTarget = event.target.value;
            let chatsList = document.getElementById("ChatsList");
            let chatsListChildren = chatsList.children;
            for (let i = 0; i < chatsListChildren.length; i++) {
                
                if (chatsListChildren[i].getElementsByClassName("name")[0].innerHTML.includes(searchTarget)) {
                    chatsListChildren[i].style.display = "flex";
                    
                } else {
                    chatsListChildren[i].style.display = "none";
                }
                
            }
        }
        else if (event.target.value.length == 0) {
            let chatsList = document.getElementById("ChatsList");
            let chatsListChildren = chatsList.children;
            for (let i = 0; i < chatsListChildren.length; i++) {
                chatsListChildren[i].style.display = "flex";
            }
        }
    }

    chats.subscribe(value => {
        console.log(value);
        Chats = [...value];
    })

    function addChat(){
        let newChatTab = document.getElementById("newChatTab");
        let newChatTabBackdrop = document.getElementById("newChatTabBackdrop");
        newChatTab.style.display = "flex";
        newChatTabBackdrop.style.display = "block";
        
        fetch(config.getHost()+"/api/tinode/find_user/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            newChats = [...data];
            console.log(data);
        })
    }    

    function newChatSearch(event){
        if (event.target.value.length >= 1) {
            console.log(event.target.value);
            let searchTarget = event.target.value;
            let chatsList = document.getElementById("middle");
            let chatsListChildren = chatsList.children;
            for (let i = 0; i < chatsListChildren.length; i++) {
                
                if (chatsListChildren[i].getElementsByClassName("name")[0].innerHTML.includes(searchTarget)) {
                    chatsListChildren[i].style.display = "flex";
                    
                } else {
                    chatsListChildren[i].style.display = "none";
                }
                
            }
        }
        else if (event.target.value.length == 0) {
            let chatsList = document.getElementById("middle");
            let chatsListChildren = chatsList.children;
            for (let i = 0; i < chatsListChildren.length; i++) {
                chatsListChildren[i].style.display = "flex";
            }
        }
    }

    lastMsg.subscribe( value => {
        if (value.includes("data:image")) {
            lastMSG = "Foto";
        } else {
            lastMSG = value;
        }
       
    });

    lastMsgTime.subscribe( value => {
        lastMSGTime = value;
    });

    lastMsgUser.subscribe( value => {
        let chatsList = document.getElementsByClassName("name");
        for (let i = 0; i < chatsList.length; i++) {
            console.log(chatsList[i].innerHTML);
            console.log(value);
            if(chatsList[i].innerHTML == value){
                console.log("parent")
                setTimeout(() => {
                    chatsList[i].parentElement.children[1].children[0].innerHTML = lastMSG;
                    chatsList[i].parentElement.children[1].children[1].innerHTML = lastMSGTime;
                }, 1000);
                
                
            }
        }
    });

    function closeSearch(){
        let newChatTab = document.getElementById("newChatTab");
        let newChatTabBackdrop = document.getElementById("newChatTabBackdrop");
        newChatTab.style.display = "none";
        newChatTabBackdrop.style.display = "none";
    }

</script>

<div id="ChatsContainer">
    <div id="TopSectionChatsContainer"> 
        <div id = "topOrganizer">
            <div class="title">Chats</div>
            <div id="addChatsIcon" on:click={addChat}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox = " 0 0 24 24">
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                </svg>
            </div>    
        </div>
        <input type="text" id="search" placeholder="Cerca..." on:keyup = {searchUser}>
    </div>
    <div></div>
    <div id="ChatsList">
        
            {#each Chats as chat}
                <ChatTab name= {chat.name}  topic = {chat.topic} isSearch={chat.isSearch} />
            {/each}
        
        
    </div> 
</div>

<div id = "newChatTabBackdrop">

</div>

<div id = "newChatTab">
    <div id = "close" on:click={closeSearch}> 
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox = " 0 0 24 24">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
        </svg>
    </div>
    <div id = "top">
        <div id ="text">
            <div>Inserisci il nome dell'utente con cui vorresti chattare</div>
        </div>
        <div id = searchBar>
            <input type="text" id="search" placeholder="Cerca..." on:keyup={newChatSearch}>
        </div>
    </div>
    <div id = "separator"></div>
    <div id = "middle">
        {#each newChats as chats}
            <NewChatTab name= {chats.name} topic = {chats.topic}/>
        {/each}
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

    #close{
        width: 35px;
        height: 35px;
        transform: rotate(45deg);
        position: relative;
        left: 50%;
        margin-right: 20px;
        cursor: pointer;
    }

    #ChatsContainer {
        position: relative;
        width: 25%;
        min-width: 300px;
        height: 95%;
        float: left;
        display: flex;
        flex-direction: column;
        border-radius: 20px;
        align-items: center;
        margin-left: 20px;
        top: 50%;
        transform: translateY(-50%);

        background-color: white;
        overflow: hidden;
        
    }
    

    #TopSectionChatsContainer {
        width: 100%;
        min-height: 80px;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        border-radius: 20px;
    }

    #topOrganizer{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    #addChatsIcon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        cursor: pointer;
    }

    #addChatsIcon:hover {
        transform: rotate(180deg);
        transition: 0.5s;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        width: 100%;
        padding-left: 15px;
        margin-top: 5px;
    }

    #search{
        width: 95%;
        height: 30px;
        border-radius: 20px;
        border: 1px solid #ffffff;
        outline: none;
        padding-left: 10px;
        margin-top: 10px;
        background-color: #e3e3e3;
    }

    #ChatsList {
        width: 100%;
        scrollbar-width: thin;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: #ffffff;
        margin-top: 10px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
       
        padding: 8px;
    }

    #ChatsList::-webkit-scrollbar {
      width: 8px;
      background-color: none;
      border-radius: 20px;
    }

    #ChatsList::-webkit-scrollbar-thumb {
      background-color: rgb(155, 155, 155);
      border-radius: 20px;
    }

    #ChatsList::-webkit-scrollbar-track-piece:end {
      background: transparent;
      margin-bottom: 15px;
    }

    #ChatsList::-webkit-scrollbar-track-piece:start {
      background: transparent;
      margin-top: 15px;
    }

    #newChatTab{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        height: 60%;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background-color: #454545;
        border-radius: 20px;
        z-index: 999;
        padding: 10px;
        
    }

    #newChatTabBackdrop{
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 998;
        backdrop-filter: blur(2px);
    }

    #top{
        width: 100%;
        
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    
        
    }

    #searchBar{
        width: 70%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #text{
        color: white;
        text-align: center;
        font-size: 1.3vmax;
        font-weight: bold;
        margin-bottom: 10px;
    }

    #separator{
        width: 90%;
        height: 1px;
        background-color: white;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    #middle{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }


</style>