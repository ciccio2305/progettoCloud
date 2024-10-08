<script>
    import SideMenu from "../../components/SideMenu.svelte";
    import ChatMenuLeft from "../../components/ChatManagerComponents/ChatMenuLeft.svelte"
    import Chat from "../../components/ChatManagerComponents/components/Chat.svelte"
    import { onDestroy } from "svelte";
    import {currentChat} from "../../services/stores.js";
    import {currentChatTopic} from "../../services/stores.js";
    import {refreshChatList} from "../../services/stores.js";
    import WebSocket from "../../components/ChatManagerComponents/components/WebSocket.svelte";



    refreshChatList.subscribe(value => {
        if(value){
            refresh();
        }
        refreshChatList.set(false);
    })

    let unique = {};
    function refresh(){
        unique = {};
    }
    onDestroy(() => {
        console.log("destroyed");
        currentChat.set("");
        currentChatTopic.set("");
    });
</script>

    <div id = "mainContainer">
        {#key unique}
            <ChatMenuLeft/>
        {/key}
        <Chat/>
        <WebSocket/>
    </div>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
    *{
        font-family: 'Montserrat';
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    :global(.homePage){
        width: 100vw;
        height: 100vh;
        display: flex;
        
        }
        #mainContainer{
            width: 100%;
            height: 100%;
            display: flex;
        }
   
    
</style>
