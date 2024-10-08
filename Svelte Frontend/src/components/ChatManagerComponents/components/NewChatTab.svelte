<script>
    import {currentChat} from "../../../services/stores.js";
    import {currentChatTopic} from "../../../services/stores.js";
    export let name;
    export let topic;
    import {refreshChatList} from "../../../services/stores.js";

    function openChat(){
        let chat = document.getElementById("internal");
        chat.style.display = "flex";
        let emptyPlace = document.getElementById("emptyPlace");
        emptyPlace.style.display = "none";
        // currentChat.set("");
        // currentChat.set(name);
        // currentChatTopic.set(topic);

        let newChatTab = document.getElementById("newChatTab");
        let newChatTabBackdrop = document.getElementById("newChatTabBackdrop");
        newChatTab.style.display = "none";
        newChatTabBackdrop.style.display = "none";
        // refreshChatList.set(true);
        currentChatTopic.set(topic);
        location.reload();
    }

    

</script>
<div class="newChatsContainer" on:click={openChat}>
    <div id="propic">
    <!-- <img src={proPic} alt=""> -->
    </div >
    <div class="name">{name}</div>
</div>


<style>
    .newChatsContainer{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        
    }

    .newChatsContainer:hover{
        background-color: #7e7e7e;
    }

    .name{
        color: white;
        margin-left: 8px;

    }

</style>
