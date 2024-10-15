import { c as create_ssr_component, b as add_attribute, e as escape, d as each, v as validate_component, s as subscribe, o as onDestroy } from "../../../chunks/index.js";
import { d as chats, e as lastMsg, f as lastMsgTime, g as lastMsgUser, n as newMessages, h as currentImage, T as Token, i as currentChat, j as Messages, s as secretKey, k as msgNumber, o as currentChatTopic, p as msgToSend, q as refresh, u as userSearch, v as addChat, w as imgToSend, x as attachment, r as refreshChatList } from "../../../chunks/SideMenu.svelte_svelte_type_style_lang.js";
import { c as config } from "../../../chunks/config.js";
const ChatTab_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".ChatTabContainer.svelte-konfhz{width:100%;padding-left:10px;height:80px;display:flex;align-items:center;justify-content:space-evenly;border-radius:5px}.ChatTabContainer.svelte-konfhz:hover{background-color:#e6e6e6}.ProfilePicture.svelte-konfhz{width:64px;height:64px;min-width:64px;min-height:64px;border-radius:100%;background-size:cover}.disable-select.svelte-konfhz{width:100%;user-select:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none}#text.svelte-konfhz{display:flex;height:100%;flex-direction:column;justify-content:space-between;margin-left:20px;min-width:200px;width:70%}.name.svelte-konfhz{margin-top:25px}#time.svelte-konfhz{font-size:16px;width:30%;margin-top:5px}#messagePreview.svelte-konfhz{display:flex;justify-content:space-between;margin-bottom:20px}#message.svelte-konfhz{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:10px}",
  map: null
};
const ChatTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { topic } = $$props;
  let { isSearch } = $$props;
  let img;
  fetch(config.getHost() + "/api/getProfilePic", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic: topic.replace("usr", "") })
  }).then((response) => response.json()).then((data) => {
    img = data;
    let propic = document.getElementById(topic);
    propic.style.backgroundImage = "url(" + img.base39 + ")";
  });
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.topic === void 0 && $$bindings.topic && topic !== void 0)
    $$bindings.topic(topic);
  if ($$props.isSearch === void 0 && $$bindings.isSearch && isSearch !== void 0)
    $$bindings.isSearch(isSearch);
  $$result.css.add(css$5);
  return `${isSearch == "true" ? `<div class="ChatTabContainer svelte-konfhz"><div class="ProfilePicture svelte-konfhz"${add_attribute("id", topic, 0)}></div>
    <div class="disable-select svelte-konfhz" id="text"><div class="topic" style="display: none;">${escape(topic)}</div>
        <div class="name svelte-konfhz">${escape(name)}</div>
        <div id="messagePreview" class="svelte-konfhz"><div id="message" class="svelte-konfhz"></div>
            <div id="time" class="svelte-konfhz"></div></div></div></div>` : `${isSearch == "false" ? `<div class="ChatTabContainer svelte-konfhz"><div class="ProfilePicture svelte-konfhz"${add_attribute("id", topic, 0)}></div>
    <div class="disable-select svelte-konfhz" id="text"><div class="name svelte-konfhz">${escape(name)}</div>
        <div id="messagePreview" class="svelte-konfhz"><div id="message" class="svelte-konfhz"></div>
            <div id="time" class="svelte-konfhz"></div></div></div></div>` : ``}`}`;
});
const NewChatTab_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".newChatsContainer.svelte-486iq3{width:100%;height:50px;display:flex;justify-content:flex-start;align-items:center;cursor:pointer}.newChatsContainer.svelte-486iq3:hover{background-color:#7e7e7e}.name.svelte-486iq3{color:white;margin-left:8px}",
  map: null
};
const NewChatTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { topic } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.topic === void 0 && $$bindings.topic && topic !== void 0)
    $$bindings.topic(topic);
  $$result.css.add(css$4);
  return `<div class="newChatsContainer svelte-486iq3"><div id="propic"></div>
    <div class="name svelte-486iq3">${escape(name)}</div>
</div>`;
});
const ChatMenuLeft_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-e4aqsw{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}#close.svelte-e4aqsw{width:35px;height:35px;transform:rotate(45deg);position:relative;left:50%;margin-right:20px;cursor:pointer}#ChatsContainer.svelte-e4aqsw{position:relative;width:25%;min-width:300px;height:95%;float:left;display:flex;flex-direction:column;border-radius:20px;align-items:center;margin-left:20px;top:50%;transform:translateY(-50%);background-color:white;overflow:hidden}#TopSectionChatsContainer.svelte-e4aqsw{width:100%;min-height:80px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:#ffffff;border-radius:20px}#topOrganizer.svelte-e4aqsw{display:flex;width:100%;justify-content:space-between;align-items:center}#addChatsIcon.svelte-e4aqsw{width:30px;height:30px;display:flex;align-items:center;justify-content:center;margin-right:10px;cursor:pointer}#addChatsIcon.svelte-e4aqsw:hover{transform:rotate(180deg);transition:0.5s}.title.svelte-e4aqsw{font-size:24px;font-weight:bold;width:100%;padding-left:15px;margin-top:5px}#search.svelte-e4aqsw{width:95%;height:30px;border-radius:20px;border:1px solid #ffffff;outline:none;padding-left:10px;margin-top:10px;background-color:#e3e3e3}#ChatsList.svelte-e4aqsw{width:100%;scrollbar-width:thin;overflow-y:scroll;overflow-x:hidden;background-color:#ffffff;margin-top:10px;border-radius:20px;display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px}#ChatsList.svelte-e4aqsw::-webkit-scrollbar{width:8px;background-color:none;border-radius:20px}#ChatsList.svelte-e4aqsw::-webkit-scrollbar-thumb{background-color:rgb(155, 155, 155);border-radius:20px}#ChatsList.svelte-e4aqsw::-webkit-scrollbar-track-piece:end{background:transparent;margin-bottom:15px}#ChatsList.svelte-e4aqsw::-webkit-scrollbar-track-piece:start{background:transparent;margin-top:15px}#newChatTab.svelte-e4aqsw{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:40%;height:60%;display:none;flex-direction:column;align-items:center;justify-content:flex-start;background-color:#454545;border-radius:20px;z-index:999;padding:10px}#newChatTabBackdrop.svelte-e4aqsw{position:absolute;display:none;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.5);z-index:998;backdrop-filter:blur(2px)}#top.svelte-e4aqsw{width:100%;display:flex;align-items:center;justify-content:center;flex-direction:column}#searchBar.svelte-e4aqsw{width:70%;height:100%;display:flex;align-items:center;justify-content:center}#text.svelte-e4aqsw{color:white;text-align:center;font-size:1.3vmax;font-weight:bold;margin-bottom:10px}#separator.svelte-e4aqsw{width:90%;height:1px;background-color:white;margin-top:10px;margin-bottom:10px}#middle.svelte-e4aqsw{width:100%;height:100%;overflow-y:auto}",
  map: null
};
const ChatMenuLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var Chats = [];
  var newChats = [];
  let lastMSG = "";
  let lastMSGTime = "";
  chats.subscribe((value) => {
    console.log(value);
    Chats = [...value];
  });
  lastMsg.subscribe((value) => {
    if (value.includes("data:image")) {
      lastMSG = "Foto";
    } else {
      lastMSG = value;
    }
  });
  lastMsgTime.subscribe((value) => {
    lastMSGTime = value;
  });
  lastMsgUser.subscribe((value) => {
    let chatsList = document.getElementsByClassName("name");
    for (let i = 0; i < chatsList.length; i++) {
      console.log(chatsList[i].innerHTML);
      console.log(value);
      if (chatsList[i].innerHTML == value) {
        console.log("parent");
        setTimeout(
          () => {
            chatsList[i].parentElement.children[1].children[0].innerHTML = lastMSG;
            chatsList[i].parentElement.children[1].children[1].innerHTML = lastMSGTime;
          },
          1e3
        );
      }
    }
  });
  $$result.css.add(css$3);
  return `<div id="ChatsContainer" class="svelte-e4aqsw"><div id="TopSectionChatsContainer" class="svelte-e4aqsw"><div id="topOrganizer" class="svelte-e4aqsw"><div class="title svelte-e4aqsw">Chats</div>
            <div id="addChatsIcon" class="svelte-e4aqsw"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox=" 0 0 24 24" class="svelte-e4aqsw"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" class="svelte-e4aqsw"></path></svg></div></div>
        <input type="text" id="search" placeholder="Cerca..." class="svelte-e4aqsw"></div>
    <div class="svelte-e4aqsw"></div>
    <div id="ChatsList" class="svelte-e4aqsw">${each(Chats, (chat) => {
    return `${validate_component(ChatTab, "ChatTab").$$render(
      $$result,
      {
        name: chat.name,
        topic: chat.topic,
        isSearch: chat.isSearch
      },
      {},
      {}
    )}`;
  })}</div></div>

<div id="newChatTabBackdrop" class="svelte-e4aqsw"></div>

<div id="newChatTab" class="svelte-e4aqsw"><div id="close" class="svelte-e4aqsw"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox=" 0 0 24 24" class="svelte-e4aqsw"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" class="svelte-e4aqsw"></path></svg></div>
    <div id="top" class="svelte-e4aqsw"><div id="text" class="svelte-e4aqsw"><div class="svelte-e4aqsw">Inserisci il nome dell&#39;utente con cui vorresti chattare</div></div>
        <div id="searchBar" class="svelte-e4aqsw"><input type="text" id="search" placeholder="Cerca..." class="svelte-e4aqsw"></div></div>
    <div id="separator" class="svelte-e4aqsw"></div>
    <div id="middle" class="svelte-e4aqsw">${each(newChats, (chats2) => {
    return `${validate_component(NewChatTab, "NewChatTab").$$render($$result, { name: chats2.name, topic: chats2.topic }, {}, {})}`;
  })}</div>
</div>`;
});
const Message_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".message.svelte-iga2yy{width:100%;margin-bottom:15px}.senderBubble{position:relative;height:100%;background-color:#bcc5f0cc;border-radius:10px;border-bottom-right-radius:5px;padding:10px;max-width:75%;min-width:70px;margin-right:10px;float:right;overflow-wrap:break-word}.recipientBubble{position:relative;height:100%;background-color:#c2c2c2;border-radius:10px;border-bottom-left-radius:5px;padding:10px;max-width:75%;min-width:70px;float:left;overflow-wrap:break-word}.disable-select.svelte-iga2yy{user-select:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none}#text.svelte-iga2yy{margin-bottom:20px}#time.svelte-iga2yy{position:absolute;font-size:13px;width:fit-content;right:5px;bottom:5px}img.svelte-iga2yy{width:95%;height:95%;border-radius:5px}",
  map: null
};
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text } = $$props;
  let { time } = $$props;
  let { user = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.time === void 0 && $$bindings.time && time !== void 0)
    $$bindings.time(time);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$result.css.add(css$2);
  return `<div class="message svelte-iga2yy"><div${add_attribute("class", user === "sender" ? "senderBubble" : "recipientBubble", 0)}>${text.includes("base64,") ? `<img${add_attribute("src", text, 0)} class="svelte-iga2yy">` : `<div id="text" class="svelte-iga2yy">${escape(text)}</div>`}
            
        <div class="disable-select svelte-iga2yy" id="time">${escape(time)}</div></div>
</div>`;
});
const src = "/_app/immutable/assets/no-comment.e2649e83.png";
const Chat_svelte_svelte_type_style_lang$1 = "";
const css$1 = {
  code: "#ChatContainer.svelte-5c6j3b.svelte-5c6j3b{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;top:50%;transform:translateY(-50%);width:75%;min-width:800px;min-height:700px;height:95%;float:left;border-radius:20px;margin-left:20px;margin-right:50px;background-color:white}#emptyPlace.svelte-5c6j3b.svelte-5c6j3b{position:relative;width:50%;height:50%;display:flex;align-items:center;justify-content:center;flex-direction:column}#emptyPlace.svelte-5c6j3b>h3.svelte-5c6j3b{color:rgb(78, 78, 78);font-size:2vh}#empty.svelte-5c6j3b.svelte-5c6j3b{width:25%}#internal.svelte-5c6j3b.svelte-5c6j3b{display:none;flex-direction:column;align-items:center;justify-content:space-evenly;width:100%;height:100%}#TopSection.svelte-5c6j3b.svelte-5c6j3b{height:70px;width:95%;border-radius:20px;background:#e3e3e3;display:flex;justify-content:space-between}#ProPicAndName.svelte-5c6j3b.svelte-5c6j3b{width:auto;min-width:200px;height:100%;display:flex;align-items:center;justify-content:space-evenly;gap:10px}#proPic.svelte-5c6j3b.svelte-5c6j3b{position:relative;height:64px;width:64px;border-radius:100%;background-size:cover;margin-left:10px}#name.svelte-5c6j3b.svelte-5c6j3b{position:relative;width:auto;font-weight:bold}#ChatInput.svelte-5c6j3b svg.svelte-5c6j3b{width:auto;height:40px;background-color:white;border-radius:100%;padding:5px}.interspace.svelte-5c6j3b.svelte-5c6j3b{width:100%;height:30px;display:flex;justify-content:center}.date.svelte-5c6j3b.svelte-5c6j3b{font-weight:bold;font-size:20px}#ChatContent.svelte-5c6j3b.svelte-5c6j3b{width:90%;overflow-y:scroll;height:calc(100% - 270px);scrollbar-width:thin;display:flex;flex-direction:column}#ChatContent.svelte-5c6j3b.svelte-5c6j3b::-webkit-scrollbar{width:8px;background-color:none;border-radius:20px}#ChatContent.svelte-5c6j3b.svelte-5c6j3b::-webkit-scrollbar-thumb{background-color:rgb(155, 155, 155);border-radius:20px}#ChatContent.svelte-5c6j3b.svelte-5c6j3b::-webkit-scrollbar-track-piece:end{background:transparent;margin-bottom:15px}#ChatContent.svelte-5c6j3b.svelte-5c6j3b::-webkit-scrollbar-track-piece:start{background:transparent;margin-top:15px}#ChatInput.svelte-5c6j3b.svelte-5c6j3b{width:90%;height:60px;background-color:#e3e3e3;border-radius:15px;display:flex;align-items:center;justify-content:space-around}input.svelte-5c6j3b.svelte-5c6j3b{width:80%;height:80%;border-radius:15px;border:none;outline:none;padding-left:10px;font-size:15px;background-color:#e3e3e3}#allegati.svelte-5c6j3b.svelte-5c6j3b{width:auto;height:30px;border-radius:100%;transform:rotate(45deg);margin-left:5px;display:flex;align-items:center;justify-content:center}#allegatiDiv.svelte-5c6j3b.svelte-5c6j3b{width:200px;height:150px;transform:rotate(-45deg) translate(40%, -75%);margin-left:5px;display:none;flex-direction:column;align-items:center;justify-content:space-around;position:absolute;background-color:#e3e3e3;border-radius:15px;overflow:hidden}#allegatiDiv.svelte-5c6j3b>div.svelte-5c6j3b{width:100%;height:calc(100% / 3);text-align:center;line-height:5vh}#allegatiDiv.svelte-5c6j3b>div.svelte-5c6j3b:hover{width:100%;height:calc(100% / 3);text-align:center;line-height:5vh;background-color:#cfcfcf}#send.svelte-5c6j3b.svelte-5c6j3b{width:auto;height:30px;border-radius:100%;margin-left:5px;margin-right:5px;display:flex;align-items:center;justify-content:center}#allegati.svelte-5c6j3b>svg.svelte-5c6j3b,#send.svelte-5c6j3b>svg.svelte-5c6j3b{width:auto;height:100%;border-radius:100%}#ChatInput.svelte-5c6j3b svg.svelte-5c6j3b:active{background-color:#cfcfcf}#imgSender.svelte-5c6j3b.svelte-5c6j3b{width:100%;height:100%;display:none;flex-direction:column;align-items:center;justify-content:center;position:absolute;top:0;left:0;backdrop-filter:blur(5px);background-color:#e3e3e372;z-index:999}#imagePreview.svelte-5c6j3b.svelte-5c6j3b{max-width:50vw;max-height:70vh;border-radius:20px}#imgSend.svelte-5c6j3b.svelte-5c6j3b{width:40px;height:40px;position:absolute;bottom:10px;right:10px;cursor:pointer}",
  map: null
};
let date = "";
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $newMessages, $$unsubscribe_newMessages;
  $$unsubscribe_newMessages = subscribe(newMessages, (value) => $newMessages = value);
  let name = "";
  let input = "";
  let newMsg = {
    content: "Null",
    ts: "Null",
    from: "Null"
  };
  let msgToDisplay = [];
  let newMsgs = [newMsg];
  currentImage.subscribe((value) => {
    let propic = document.getElementById("proPic");
    if (propic != null || propic != void 0)
      propic.style.backgroundImage = "url(" + value + ")";
  });
  Token.subscribe((value) => {
  });
  currentChat.subscribe((value) => {
    console.log(value);
    name = value;
  });
  newMessages.subscribe((value) => {
    console.log(value);
    let newest = $newMessages;
    if (newest.length > 0) {
      console.log(newest[0]);
      newMsgs = [...newMsgs, newest[0]];
      let ChatContent = document.getElementById("ChatContent");
      if (ChatContent)
        setTimeout(
          () => {
            ChatContent.scrollTop = ChatContent.scrollHeight;
          },
          1
        );
    }
  });
  Messages.subscribe((value) => {
    msgToDisplay = [];
    newMsgs = [];
    console.log(value);
    console.log("Messages del cazzo");
    let ChatContent = document.getElementById("ChatContent");
    if (ChatContent)
      setTimeout(
        () => {
          ChatContent.scrollTop = ChatContent.scrollHeight;
        },
        1
      );
    for (let i = value.length - 1; i >= 0; i--) {
      msgToDisplay.push(value[i]);
    }
    console.log("Messaggi: ");
    console.log(msgToDisplay);
    msgToDisplay = [...msgToDisplay];
    if (msgToDisplay.length > 0) {
      lastMsgUser.set(name);
      lastMsg.set(msgToDisplay[msgToDisplay.length - 1].content);
      lastMsgTime.set(msgToDisplay[msgToDisplay.length - 1].ts);
    }
  });
  $$result.css.add(css$1);
  $$unsubscribe_newMessages();
  return `<div id="ChatContainer" class="svelte-5c6j3b"><div id="imgSender" class="svelte-5c6j3b"><img id="imagePreview" src="" alt="toSend" class="svelte-5c6j3b">
        <div id="imgSend" class="svelte-5c6j3b"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M291.48,449.94A15,15,0,0,1,278,441.5L207.5,296.57,62.57,226.08a15,15,0,0,1,1-27.41L435.48,49.08A15,15,0,0,1,455,68.6L305.4,440.54A15,15,0,0,1,292,449.93Zm-185.38-236,119.18,58a15,15,0,0,1,6.93,6.93l58,119.18L414,90Z"></path><path d="M218.72,300.35a15,15,0,0,1-10.6-25.61L430.47,52.39a15,15,0,1,1,21.21,21.22L229.33,296A15,15,0,0,1,218.72,300.35Z"></path></svg></div></div>

    <div id="emptyPlace" class="svelte-5c6j3b"><img id="empty"${add_attribute("src", src, 0)} alt="empty" class="svelte-5c6j3b">
        <h3 class="svelte-5c6j3b">Sembra che non ci sia nessuna chat aperta qui!</h3></div>

    <div id="internal" class="svelte-5c6j3b"><div id="TopSection" class="svelte-5c6j3b"><div id="ProPicAndName" class="svelte-5c6j3b"><div id="proPic" class="svelte-5c6j3b"></div>
                <div id="name" class="svelte-5c6j3b">${escape(name)}</div></div>
        

        

        </div>
    
        <div class="interspace svelte-5c6j3b"><div class="date svelte-5c6j3b">${escape(date)}</div></div>

        <div id="ChatContent" class="svelte-5c6j3b">${each(msgToDisplay, (msg) => {
    return `${msg.content != "Null" ? `${validate_component(Message, "Message").$$render(
      $$result,
      {
        text: msg.content,
        time: msg.ts,
        user: msg.from
      },
      {},
      {}
    )}` : ``}`;
  })}
            
            
            ${each(newMsgs, (msgs) => {
    return `${msgs.content != "Null" ? `${validate_component(Message, "Message").$$render(
      $$result,
      {
        text: msgs.content,
        time: msgs.ts,
        user: msgs.from
      },
      {},
      {}
    )}` : ``}`;
  })}
            <div id="anchor"></div></div>
    
        <div id="ChatInput" class="svelte-5c6j3b"><div id="allegati" class="svelte-5c6j3b"><div id="allegatiDiv" class="svelte-5c6j3b"><div class="svelte-5c6j3b">Immagine
                        <input style="display: none;" type="file" accept=".jpg, .jpeg, .png" class="svelte-5c6j3b"></div>
                    <div class="svelte-5c6j3b">Documento</div>
                    <div class="svelte-5c6j3b">Video</div></div>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-5c6j3b"><path d="M17.004 5H9C7.162 5 5.414 5.737 4.076 7.076C2.737 8.415 2 10.163 2 12C2 13.838 2.737 15.586 4.076 16.924C5.414 18.263 7.162 19 9 19H17V17H9C7.697 17 6.45 16.471 5.49 15.51C4.529 14.55 4 13.303 4 12C4 10.698 4.529 9.451 5.49 8.49C6.45 7.529 7.697 7 9 7H17H17.004C17.794 7 18.543 7.314 19.113 7.886C19.684 8.457 19.999 9.208 20 10.002C19.9997 10.3947 19.9214 10.7835 19.7696 11.1457C19.6179 11.5079 19.3957 11.8363 19.116 12.112C18.8392 12.3922 18.5098 12.6148 18.1466 12.7672C17.7835 12.9196 17.3938 12.9987 17 13H9C8.86963 12.9984 8.74086 12.9711 8.62108 12.9196C8.50129 12.8681 8.39286 12.7935 8.302 12.7C8.20794 12.609 8.13283 12.5003 8.08099 12.3802C8.02916 12.2601 8.00163 12.1308 8 12C8 11.748 8.11 11.493 8.301 11.302C8.39171 11.2079 8.50021 11.1327 8.6202 11.0809C8.7402 11.029 8.86929 11.0015 9 11H17V9H9C8.21 9 7.459 9.315 6.886 9.889C6.314 10.461 6 11.211 6 12C6 12.789 6.314 13.54 6.888 14.114C7.16401 14.3939 7.49277 14.6164 7.85529 14.7685C8.21781 14.9205 8.60688 14.9992 9 15H17.001C17.6572 14.9995 18.3068 14.8691 18.9123 14.6163C19.5178 14.3635 20.0673 13.9933 20.529 13.527C20.9948 13.0652 21.3644 12.5156 21.6167 11.9101C21.8689 11.3047 21.9988 10.6552 21.9987 9.99929C21.9986 9.34337 21.8686 8.69395 21.6161 8.08854C21.3637 7.48313 20.9939 6.93371 20.528 6.472C20.0674 6.0055 19.5186 5.63515 18.9137 5.38246C18.3087 5.12977 17.6596 4.99976 17.004 5Z" fill="black"></path></svg></div>

            
            <input type="text" placeholder="Scrivi qui..." name="input" class="svelte-5c6j3b"${add_attribute("value", input, 0)}>
            
            <div id="send" class="svelte-5c6j3b"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="svelte-5c6j3b"><path d="M291.48,449.94A15,15,0,0,1,278,441.5L207.5,296.57,62.57,226.08a15,15,0,0,1,1-27.41L435.48,49.08A15,15,0,0,1,455,68.6L305.4,440.54A15,15,0,0,1,292,449.93Zm-185.38-236,119.18,58a15,15,0,0,1,6.93,6.93l58,119.18L414,90Z"></path><path d="M218.72,300.35a15,15,0,0,1-10.6-25.61L430.47,52.39a15,15,0,1,1,21.21,21.22L229.33,296A15,15,0,0,1,218.72,300.35Z"></path></svg></div></div></div>

</div>`;
});
const hi = {
  id: "",
  ver: "0.22.8",
  ua: "Just-smart",
  lang: "it-IT",
  platf: "web"
};
const hi$1 = {
  hi
};
const login = {
  id: "",
  scheme: "basic",
  secret: "YWxpY2U6YWxpY2UxMjM="
};
const login$1 = {
  login
};
const sub$2 = {
  id: "",
  topic: "",
  get: {
    what: "sub desc tags cred"
  }
};
const sub$3 = {
  sub: sub$2
};
const sub$1 = {
  id: "",
  topic: "",
  get: {
    what: "sub desc"
  }
};
const subTopic = {
  sub: sub$1
};
const get$1 = {
  id: "",
  topic: "",
  what: "data"
};
const get$2 = {
  get: get$1
};
const pub$2 = {
  id: "",
  topic: "",
  noecho: true,
  content: ""
};
const pub$3 = {
  pub: pub$2
};
const get = {
  id: "",
  topic: "fnd",
  what: "sub"
};
const searchGet = {
  get
};
const set = {
  id: "",
  topic: "fnd",
  desc: {
    "public": ""
  }
};
const searchSet = {
  set
};
const sub = {
  id: "",
  topic: "fnd",
  get: {
    what: "sub"
  }
};
const searchSub = {
  sub
};
const pub$1 = {
  id: "",
  topic: "",
  noecho: true,
  head: {
    mime: "text/x-drafty"
  },
  content: {
    ent: [
      {
        tp: "EX",
        data: {
          mime: "",
          val: "",
          name: "a",
          size: 0
        }
      }
    ],
    fmt: [
      {
        at: -1
      }
    ]
  }
};
const imgPub = {
  pub: pub$1
};
const pub = {
  id: "",
  topic: "",
  noecho: true,
  head: {
    mime: "text/x-drafty"
  },
  content: {
    ent: [
      {
        tp: "EX",
        data: {
          mime: "",
          ref: "",
          name: "a",
          size: 0
        }
      }
    ],
    fmt: [
      {
        at: -1
      }
    ]
  }
};
const extra = {
  attachments: []
};
const imgPubAttached = {
  pub,
  extra
};
const OldChat_svelte_svelte_type_style_lang = "";
const WebSocket_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  onDestroy(() => {
    socket.close();
  });
  let currentChat2 = "";
  let messages = [];
  let oldMsg = false;
  let secret;
  let isSearchFlag = "false";
  let flag = false;
  secretKey.subscribe((value) => {
    secret = value;
    if (value != "")
      localStorage.setItem("secretKey", value);
    console.log("secretKey" + value);
  });
  let toSend = "";
  if (secret != null) {
    toSend = localStorage.getItem("secretKey");
  }
  var socket = new WebSocket("ws://chat.justsmart.it/v0/channels?apikey=AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K");
  let id = "";
  socket.onopen = function(e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    id = Math.floor(Math.random() * (1e6 - 1e5) + 1e5).toString();
    hi$1.hi.id = id;
    console.log(JSON.stringify(hi$1));
    if (socket.readyState == 1)
      socket.send(JSON.stringify(hi$1));
    login$1.login.id = id;
    console.log(toSend);
    let converted = btoa(toSend);
    console.log(converted);
    login$1.login.secret = converted.toString();
    setTimeout(
      function() {
        socket.send(JSON.stringify(login$1));
      },
      500
    );
    sub$3.sub.id = id;
    sub$3.sub.topic = "me";
    setTimeout(
      function() {
        socket.send(JSON.stringify(sub$3));
      },
      1e3
    );
    flag = true;
  };
  socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
    let data = JSON.parse(event.data);
    switch (Object.keys(data)[0]) {
      case "ctrl":
        console.log("ctrl");
        if (Object.keys(data.ctrl).includes("text")) {
          if (data.ctrl.text == "delivered") {
            Messages.set(messages);
            oldMsg = true;
            messages = [];
            msgNumber.set(data.ctrl.params.count);
            console.log(data.ctrl.params.count);
          } else if (data.ctrl.text == "accepted") {
            console.log("accepted");
            messages = [];
          } else if (Object.keys(data.ctrl).includes("params") && Object.keys(data.ctrl.params).includes("token")) {
            console.log("count");
            Token.set(data.ctrl.params.token);
          }
        }
        break;
      case "data":
        if (Object.keys(data.data.content).includes("ent")) {
          console.log("image");
          parseImage(data);
        } else
          parseMessages(data);
        break;
      case "meta":
        if (Object.keys(data.meta).includes("sub")) {
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
  function listSubbed(subbed) {
    console.log("listSubbed" + flag);
    if (flag) {
      chats.set([]);
      subbed.forEach((element) => {
        if (Object.keys(element).includes("public")) {
          console.log(element.user);
          let newSub = {
            name: element.public.fn == void 0 ? "undefined" : element.public.fn,
            topic: isSearchFlag == "false" ? element.topic : element.user,
            isSearch: isSearchFlag
          };
          chats.update((n) => n.concat(newSub));
        }
        isSearchFlag = "false";
      });
    }
    flag = false;
  }
  currentChatTopic.subscribe((value) => {
    console.log("currentChatTopic resetted");
    Messages.set([]);
    oldMsg = false;
    currentChat2 = value;
    subTopic.sub.id = id;
    subTopic.sub.topic = value;
    console.log("SUBTOPIC");
    console.log(JSON.stringify(subTopic));
    get$2.get.id = id;
    get$2.get.topic = value;
    get$2.get.what = "data";
    console.log("GET");
    console.log(JSON.stringify(get$2));
    if (socket.readyState == 1) {
      socket.send(JSON.stringify(subTopic));
      setTimeout(
        () => {
          socket.send(JSON.stringify(get$2));
        },
        200
      );
    }
  });
  function parseMessages(data) {
    console.log("parseMessages" + data);
    let content = data.data.content;
    let sender = data.data.from;
    let timestamp = data.data.ts;
    data.data.dayWeek;
    timestamp = timestamp.replace("Z", "-02:00");
    timestamp = timestamp.toString();
    let adesso = new Date(timestamp);
    let message = {
      "from": sender == currentChat2 ? "recepient" : "sender",
      content,
      "seq": data.data.seq,
      "ts": adesso.getUTCHours() + ":" + ((adesso.getMinutes() < 10 ? "0" : "") + adesso.getMinutes())
    };
    messages.push(message);
    if (oldMsg) {
      newMessages.set(messages);
      messages = [];
    }
  }
  function parseImage(data) {
    console.log("parseImage");
    let ent = data.data.content.ent[0].data;
    let src2 = "data:" + ent.mime + ";base64," + ent.val;
    let sender = data.data.from;
    let timestamp = data.data.ts;
    data.data.dayWeek;
    timestamp = timestamp.replace("Z", "-02:00");
    timestamp = timestamp.toString();
    let adesso = new Date(timestamp);
    console.log(currentChat2);
    let message = {
      "from": sender == currentChat2 ? "recepient" : "sender",
      "content": src2,
      "seq": data.data.seq,
      "ts": adesso.getUTCHours() + ":" + ((adesso.getMinutes() < 10 ? "0" : "") + adesso.getMinutes())
    };
    console.log(message);
    messages.push(message);
    if (oldMsg) {
      console.log("oldMsg");
      newMessages.set(messages);
      messages = [];
    }
  }
  msgToSend.subscribe((value) => {
    console.log("msgToSend");
    console.log(value);
    pub$3.pub.id = id;
    pub$3.pub.topic = currentChat2;
    pub$3.pub.content = value.content;
    console.log(JSON.stringify(pub$3));
    if (socket.readyState == 1)
      socket.send(JSON.stringify(pub$3));
  });
  refresh.subscribe((value) => {
    console.log("refresh");
    if (socket.readyState == 1 && value == true) {
      sub$3.sub.id = id;
      sub$3.sub.topic = "me";
      socket.send(JSON.stringify(sub$3));
      refresh.set(false);
    }
  });
  userSearch.subscribe((value) => {
    if (value != "")
      isSearchFlag = "true";
    console.log("userSearch");
    console.log(value);
    if (socket.readyState == 1) {
      searchSub.sub.id = id;
      console.log(JSON.stringify(searchSub));
      socket.send(JSON.stringify(searchSub));
      searchSet.set.id = id;
      searchSet.set.desc.public = value;
      searchGet.get.id = id;
      setTimeout(
        function() {
          socket.send(JSON.stringify(searchSet));
        },
        500
      );
      setTimeout(
        function() {
          socket.send(JSON.stringify(searchGet));
        },
        1e3
      );
    }
  });
  addChat.subscribe((value) => {
    console.log("addChat");
    console.log(value);
    if (socket.readyState == 1) {
      searchSet.set.id = id;
      searchSet.set.desc.public = "␡";
      socket.send(JSON.stringify(searchSet));
      get$2.get.id = id;
      get$2.get.topic = value;
      get$2.get.what = "desc";
      setTimeout(
        function() {
          socket.send(JSON.stringify(get$2));
        },
        500
      );
      searchGet.get.id = id;
      setTimeout(
        function() {
          socket.send(JSON.stringify(searchGet));
        },
        1e3
      );
      setTimeout(
        function() {
          chats.set([]);
          get$2.get.what = "sub";
          get$2.get.topic = "me";
          socket.send(JSON.stringify(get$2));
        },
        1500
      );
    }
  });
  imgToSend.subscribe((value) => {
    console.log("imgToSend");
    console.log(value);
    imgPub.pub.id = id;
    imgPub.pub.topic = currentChat2;
    imgPub.pub.content.ent[0].data.mime = value.type;
    imgPub.pub.content.ent[0].data.val = value.content;
    imgPub.pub.content.ent[0].data.size = value.size;
    console.log(JSON.stringify(imgPub));
    if (socket.readyState == 1) {
      console.log("sending");
      socket.send(JSON.stringify(imgPub));
    }
  });
  attachment.subscribe((value) => {
    console.log("imgToSend");
    console.log(value);
    let tempObj = value;
    imgPubAttached.pub.id = id;
    imgPubAttached.pub.topic = currentChat2;
    imgPubAttached.pub.content.ent[0].data.mime = tempObj.type;
    imgPubAttached.pub.content.ent[0].data.ref = tempObj.url;
    imgPubAttached.pub.content.ent[0].data.size = tempObj.size;
    imgPubAttached.extra.attachments[0] = value.url;
    console.log(JSON.stringify(imgPubAttached));
    if (socket.readyState == 1) {
      console.log("sending");
      socket.send(JSON.stringify(imgPubAttached));
    }
  });
  return ``;
});
const Chat_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-sof1yo{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.homePage{width:100vw;height:100vh;display:flex}#mainContainer.svelte-sof1yo{width:100%;height:100%;display:flex}",
  map: null
};
const Chat_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  refreshChatList.subscribe((value) => {
    if (value) {
      refresh2();
    }
    refreshChatList.set(false);
  });
  let unique = {};
  function refresh2() {
    unique = {};
  }
  onDestroy(() => {
    console.log("destroyed");
    currentChat.set("");
    currentChatTopic.set("");
  });
  $$result.css.add(css);
  return `<div id="mainContainer" class="svelte-sof1yo">${validate_component(ChatMenuLeft, "ChatMenuLeft").$$render($$result, {}, {}, {})}
        ${validate_component(Chat, "Chat").$$render($$result, {}, {}, {})}
        ${validate_component(WebSocket_1, "WebSocket").$$render($$result, {}, {}, {})}
    </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Chat_1, "Chat").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
