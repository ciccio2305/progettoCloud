<script>
    import { onDestroy } from "svelte";
    // import ProPic from "../../../img/proPic2.png";
    import {currentChat, currentImage} from "../../../services/stores.js";
    import {currentChatTopic} from "../../../services/stores.js";
    import {addChat} from "../../../services/stores.js";
    import {lastMsg} from "../../../services/stores.js";
    import {lastMsgTime} from "../../../services/stores.js";
  import config from "../../../services/config";

    export let name;
    export let topic;
    export let isSearch;

    let img;

    fetch(config.getHost() + "/api/getProfilePic",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            topic: topic.replace("usr", "")
        })
    })
    .then(response => response.json())
    .then(data => {
        img = data;
        let propic = document.getElementById(topic);
        propic.style.backgroundImage = "url(" + img.base39 + ")"
    });

    function openChat(){
        let emptyPlace = document.getElementById("emptyPlace");
        emptyPlace.style.display = "none";
        let chat = document.getElementById("internal");
        chat.style.display = "flex";
        currentChat.set("");
        currentChat.set(name);
        // currentChatTopic.set("");
        currentChatTopic.set(topic);
        currentImage.set(img.base39);
    }

    

    function returnToChat(){
        addChat.set(topic);
        let emptyPlace = document.getElementById("emptyPlace");
        emptyPlace.style.display = "none";
        let chat = document.getElementById("internal");
        chat.style.display = "flex";
        currentChat.set("");
        currentChat.set(name);
        currentChatTopic.set(topic);
    }

   


</script>
{#if isSearch == "true"}
<div class="ChatTabContainer" on:click={returnToChat}>
    <div class="ProfilePicture" id={topic}/>
    <div class="disable-select" id="text">
        <div class="topic" style="display: none;">{topic}</div>
        <div class="name">{name}</div>
        <div id="messagePreview">
            <div id="message"></div>
            <div id="time"></div>
        </div>
    </div>
</div>
{:else if isSearch == "false"}
<div class="ChatTabContainer" on:click={openChat}>
    <div class="ProfilePicture" id={topic}/>
    <div class="disable-select" id="text">
        <div class="name">{name}</div>
        <div id="messagePreview">
            <div id="message"></div>
            <div id="time"></div>
        </div>
    </div>
</div>
{/if}

<style>
    .ChatTabContainer {
        width: 100%;
        padding-left: 10px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        
        border-radius: 5px;
        
    }

    .ChatTabContainer:hover {
        background-color: #e6e6e6;
    }

    .ProfilePicture {
        width: 64px;
        height: 64px;
        min-width: 64px;
        min-height: 64px;
        border-radius: 100%;
        background-size: cover;
    }

    .disable-select {
        width: 100%;
        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }

    #text {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
        min-width: 200px;
        width: 70%;
       
    }

    .name {
        margin-top: 25px;
        
    }

    #time{
        font-size: 16px;
        
        width: 30%;
        
        margin-top: 5px;
        
    }

    #messagePreview {
       
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        
    }

    #message {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 10px;
    }
</style>
