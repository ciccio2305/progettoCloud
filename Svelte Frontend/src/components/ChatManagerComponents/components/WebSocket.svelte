<script>
    import hi from '../../../tinodeMessages/hi.json';
    import login from '../../../tinodeMessages/login.json';
    import sub from '../../../tinodeMessages/sub.json';
    import subTopic from '../../../tinodeMessages/subTopic.json';
    import get from '../../../tinodeMessages/get.json';
    import pub from '../../../tinodeMessages/pub.json';
    import searchGet from '../../../tinodeMessages/searchGet.json';
    import searchSet from '../../../tinodeMessages/searchSet.json';
    import searchSub from '../../../tinodeMessages/searchSub.json';
    import imgPub from '../../../tinodeMessages/imgPub.json';
    import imgPubAttached from '../../../tinodeMessages/imgPubAttached.json';

    import {chats, msgNumber, imgToSend, attachment, refreshChatList} from "../../../services/stores.js";
    import {currentChatTopic} from "../../../services/stores.js";
    import {Messages} from "../../../services/stores.js";
    import {msgToSend} from "../../../services/stores.js";
    import Message from './Message.svelte';
    import {newMessages} from "../../../services/stores.js";
    import OldChat from './OldChat.svelte';
    import {refresh} from "../../../services/stores.js";
    import {userSearch} from "../../../services/stores.js";
    import {searchFlag} from "../../../services/stores.js";
    import {secretKey} from "../../../services/stores.js";
    import {addChat} from "../../../services/stores.js";
    import {Token} from "../../../services/stores.js";

    import { onDestroy } from 'svelte';
   
    onDestroy(() => {
        socket.close();
    });

    let currentChat = "";
    let messages = [];
    let oldMsg = false;
    let secret;
    let isSearchFlag = "false";
    var token = "";
    let flag = false;
    secretKey.subscribe((value) => {
        secret = value;
        if (value != "") localStorage.setItem("secretKey", value);
        console.log("secretKey" + value);
    });

    let toSend = '';
    if (secret != null) {toSend = localStorage.getItem("secretKey" );}
    var socket = new WebSocket('wss://chat.justsmart.it/v0/channels?apikey=AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K');
    let id = "";
    
    socket.onopen = function(e) {
        console.log("[open] Connection established");
        console.log("Sending to server");
        id = Math.floor((Math.random() * (1000000 - 100000) + 100000)).toString();
        hi.hi.id = id;
        console.log(JSON.stringify(hi));
        if (socket.readyState == 1)
            socket.send(JSON.stringify(hi));

        login.login.id = id;
        console.log(toSend);
        let converted = btoa(toSend);
        console.log(converted);
        login.login.secret = converted.toString();
        setTimeout(function(){ socket.send(JSON.stringify(login)); }, 500);
        //socket.send(JSON.stringify(login));
        sub.sub.id = id;
        sub.sub.topic = "me";
        setTimeout(function(){ socket.send(JSON.stringify(sub)); }, 1000);
        flag = true;
    };

    socket.onmessage = function(event) {
        console.log(`[message] Data received from server: ${event.data}`);

        let data = JSON.parse(event.data);
        //console.log(Object.keys(data));
        switch (Object.keys(data)[0]){
            case "ctrl":
                console.log("ctrl");
                if (Object.keys(data.ctrl).includes("text")){
                    if (data.ctrl.text == "delivered"){
                        Messages.set(messages);
                        oldMsg = true;
                        messages = [];
                        msgNumber.set(data.ctrl.params.count);
                        console.log(data.ctrl.params.count);
                    }
                    else if (data.ctrl.text == "accepted"){
                        console.log("accepted");
                        messages = [];
                    }
                    else if (Object.keys(data.ctrl).includes("params") && Object.keys(data.ctrl.params).includes("token")){
                        console.log("count");
                        Token.set(data.ctrl.params.token);
                    }
                }

                break;
            case "data":
                if (Object.keys(data.data.content).includes("ent")){
                    console.log("image")
                    parseImage(data);
                }
                else parseMessages(data);
                
                break;
            case "meta":
                if (Object.keys(data.meta).includes("sub")){
                    listSubbed(data.meta.sub);
                }
                console.log("meta");
                break;
            case "pres":
                console.log("pres");
                break;
            case "info":
                console.log("info");
                break;
            default:
                console.log("default");
                break;
        }   
    };

   
    function listSubbed(subbed){
        console.log("listSubbed" + flag);
        if (flag) {
            chats.set([]);
            subbed.forEach(element => {
                if (Object.keys(element).includes("public")) {
                console.log(element.user);
                let newSub = {
                    name: (element.public.fn == undefined) ? "undefined" : element.public.fn,
                    topic: (isSearchFlag == "false") ? element.topic : element.user,
                    isSearch: isSearchFlag
                }
                chats.update((n) => n.concat(newSub));
            }
            isSearchFlag = "false";
            });
        }
        flag = false;
    };

    currentChatTopic.subscribe(value => {
        console.log("currentChatTopic resetted");
        Messages.set([]);
        oldMsg = false;
        currentChat = value;
        subTopic.sub.id = id;
        subTopic.sub.topic = value;

        console.log("SUBTOPIC");
        console.log(JSON.stringify(subTopic));

        get.get.id = id;
        get.get.topic = value;
        
        get.get.what = "data";

        console.log("GET");
        console.log(JSON.stringify(get));

        if (socket.readyState== 1){
            socket.send(JSON.stringify(subTopic));
            setTimeout(() => {socket.send(JSON.stringify(get))}, 200);
        }
    });

    function parseMessages(data){
        console.log("parseMessages" + data);
        let content = data.data.content;
        let sender = data.data.from;
        let timestamp = data.data.ts;
        let daySender =data.data.dayWeek;
        timestamp = timestamp.replace("Z", "-02:00");
        timestamp = timestamp.toString();
        let adesso = new Date(timestamp);
        //console.log(currentChat)
        let message = {
            "from": (sender == currentChat) ? "recepient" : "sender",
            "content": content,
            "seq": data.data.seq,
            "ts": adesso.getUTCHours() + ":" + ((adesso.getMinutes()<10?'0':'') + adesso.getMinutes())
        };
        //console.log(message);
        messages.push(message);
        // lastMsgUser.set(" ");
        // lastMsgUser.set(name);
        // console.log("lastMsgUser: " + name);
        // lastMsg.set(newMsg.content);
        // lastMsgTime.set(newMsg.ts);
        if (oldMsg){
            //console.log("oldMsg");
            newMessages.set(messages);
            messages = [];
        }
    }

    function parseImage(data){
        console.log("parseImage");
        let ent = data.data.content.ent[0].data;
        let src = "data:"+ent.mime+";base64,"+ent.val;
        let sender = data.data.from;
        let timestamp = data.data.ts;
        let daySender =data.data.dayWeek;
        timestamp = timestamp.replace("Z", "-02:00");
        timestamp = timestamp.toString();
        let adesso = new Date(timestamp);
        console.log(currentChat)
        let message = {
            "from": (sender == currentChat) ? "recepient" : "sender",
            "content": src,
            "seq": data.data.seq,
            "ts": adesso.getUTCHours() + ":" + ((adesso.getMinutes()<10?'0':'') + adesso.getMinutes())
        };
        console.log(message);
        messages.push(message);
        if (oldMsg){
            console.log("oldMsg");
            newMessages.set(messages);
            messages = [];
        }
    }

    msgToSend.subscribe((value) => {
        console.log("msgToSend");
        console.log(value);
        pub.pub.id = id;
        pub.pub.topic = currentChat;
        pub.pub.content = value.content;
        console.log(JSON.stringify(pub));
        if (socket.readyState == 1)
            socket.send(JSON.stringify(pub));
    });
    
    refresh.subscribe((value) => {
        console.log("refresh");
        if (socket.readyState == 1 && value == true){
            sub.sub.id = id;
            sub.sub.topic = "me";
            // setTimeout(function(){ socket.send(JSON.stringify(sub)); }, 3000);
            socket.send(JSON.stringify(sub));
            refresh.set(false);
        }
    });

    userSearch.subscribe((value) => {
        if (value != "") isSearchFlag = "true";
        console.log("userSearch");
        console.log(value);

        if (socket.readyState == 1){
            searchSub.sub.id = id;
            console.log(JSON.stringify(searchSub));
            socket.send(JSON.stringify(searchSub));
            searchSet.set.id = id;
            searchSet.set.desc.public = value;
            searchGet.get.id = id;

            setTimeout(function(){ socket.send(JSON.stringify(searchSet)); }, 500);
            setTimeout(function(){ socket.send(JSON.stringify(searchGet)); }, 1000);
            // socket.send(JSON.stringify(searchSet));
            // if (socket.readyState == 1){
            // searchGet.get.id = id;
            //     socket.send(JSON.stringify(searchGet));
            // }
        }
    });

    addChat.subscribe((value) => {
        console.log("addChat");
        console.log(value);
        if (socket.readyState == 1){
            searchSet.set.id = id;
            searchSet.set.desc.public = "␡";
            socket.send(JSON.stringify(searchSet));

            get.get.id = id;
            get.get.topic = value;
            get.get.what = "desc";
            setTimeout(function(){ socket.send(JSON.stringify(get)); }, 500);

            searchGet.get.id = id;
            setTimeout(function(){ socket.send(JSON.stringify(searchGet)); }, 1000);


            setTimeout(function(){ 
                chats.set([]);
                get.get.what = "sub";
                get.get.topic = "me";
                socket.send(JSON.stringify(get));
                
            }, 1500);
            
            //setTimeout(function(){ socket.send(JSON.stringify(get)); }, 1500);
        }
    });
    
    imgToSend.subscribe((value) => {
        console.log("imgToSend");
        console.log(value);
        imgPub.pub.id = id;
        imgPub.pub.topic = currentChat;

        imgPub.pub.content.ent[0].data.mime = value.type;
        imgPub.pub.content.ent[0].data.val = value.content;
        imgPub.pub.content.ent[0].data.size = value.size;
        console.log(JSON.stringify(imgPub));

        if (socket.readyState == 1){
            console.log("sending")
            socket.send(JSON.stringify(imgPub));
        }
    })

    attachment.subscribe((value) => {
        console.log("imgToSend");
        console.log(value);
        let tempObj = value;
        
        imgPubAttached.pub.id = id;
        imgPubAttached.pub.topic = currentChat;

        imgPubAttached.pub.content.ent[0].data.mime = tempObj.type;
        imgPubAttached.pub.content.ent[0].data.ref = tempObj.url;
        imgPubAttached.pub.content.ent[0].data.size = tempObj.size;

        imgPubAttached.extra.attachments[0] = value.url;
        console.log(JSON.stringify(imgPubAttached));

        if (socket.readyState == 1){
            console.log("sending")
            socket.send(JSON.stringify(imgPubAttached));
        }



    })
</script>