import { c as create_ssr_component, s as subscribe, v as validate_component } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import { r as refreshChatList } from "../../chunks/SideMenu.svelte_svelte_type_style_lang.js";
import "../../chunks/Dashboard.svelte_svelte_type_style_lang.js";
import "../../chunks/endpoints.js";
const HomepageLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="homePage">${slots.default ? slots.default({}) : ``}</div>`;
});
const css$1 = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-1ibn89b.svelte-1ibn89b{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.sideMenu.svelte-1ibn89b.svelte-1ibn89b{background-color:white;height:100vh;width:4vw;min-height:420px;display:flex;flex-direction:column;transition:all 0.5s;min-width:50px}.sideMenu.svelte-1ibn89b.svelte-1ibn89b:hover{width:10vw;transition:all 0.5s}.entry.svelte-1ibn89b.svelte-1ibn89b{z-index:1;height:30px}.sideMenu.svelte-1ibn89b:hover #clicker.svelte-1ibn89b{width:100%;height:100%}#upperSection.svelte-1ibn89b div.svelte-1ibn89b{cursor:pointer}#midSection.svelte-1ibn89b div.svelte-1ibn89b{cursor:pointer}#lowerSection.svelte-1ibn89b div.svelte-1ibn89b{cursor:pointer}#upperSection.svelte-1ibn89b.svelte-1ibn89b{width:100%;height:80px;min-height:80px;display:flex;align-items:center;justify-content:center;flex-direction:column;border-bottom:2px solid rgb(59, 59, 59)}#midSection.svelte-1ibn89b.svelte-1ibn89b{width:100%;height:calc(100% - 230px);display:flex;align-items:center;justify-content:flex-start;flex-direction:column;border-bottom:2px solid rgb(59, 59, 59);padding-top:20px;gap:30px}#lowerSection.svelte-1ibn89b.svelte-1ibn89b{width:100%;height:150px;display:flex;align-items:center;justify-content:center;flex-direction:column;justify-content:space-evenly}.icon.svelte-1ibn89b.svelte-1ibn89b{width:25px;height:25px;background-size:cover;cursor:pointer;display:inline-block}.text.svelte-1ibn89b.svelte-1ibn89b{font-size:15px;font-weight:bold;line-height:25px;opacity:0;width:0px;white-space:nowrap;overflow:hidden;display:none}.sideMenu.svelte-1ibn89b:hover .text.svelte-1ibn89b{animation:0.8s ease-out 0.2s forwards svelte-1ibn89b-openclose;display:block}#clicker.svelte-1ibn89b.svelte-1ibn89b{cursor:pointer;width:40px;height:80px;min-height:80px;display:flex;align-items:center;justify-content:center}#midSection.svelte-1ibn89b .icon.svelte-1ibn89b{margin-bottom:30px;z-index:1}#lowerSection.svelte-1ibn89b .icon.svelte-1ibn89b{z-index:1}#file.svelte-1ibn89b.svelte-1ibn89b{background-image:url("../icons/file.png")}#chat.svelte-1ibn89b.svelte-1ibn89b{background-image:url("../icons/chat.png")}#etherpad.svelte-1ibn89b.svelte-1ibn89b{background-image:url("../icons/etherpad.png")}#exit.svelte-1ibn89b.svelte-1ibn89b{background-image:url("../icons/exit.png")}#logo.svelte-1ibn89b.svelte-1ibn89b{background-image:url("../img/Logo.png");margin-left:0px;width:40px;height:40px;background-size:cover;display:inline-block}#selector.svelte-1ibn89b.svelte-1ibn89b{height:40px;width:1.8vw;background-color:rgba(57, 111, 211, 0.3);border-radius:5px;position:absolute;top:0px;left:1vw;opacity:0;transition:all 0.5s}.sideMenu.svelte-1ibn89b:hover #selector.svelte-1ibn89b{width:8vw;left:0.5vw;transition-delay:0.1s}@keyframes svelte-1ibn89b-openclose{0%{width:0;opacity:0;margin-left:-15px}100%{width:110px;opacity:1;margin-left:15px}}@keyframes svelte-1ibn89b-blink{0%{opacity:1}50%{opacity:0}100%{opacity:1}}@media(max-width: 1600px){#selector.svelte-1ibn89b.svelte-1ibn89b{width:2vw}.sideMenu.svelte-1ibn89b:hover #selector.svelte-1ibn89b{width:2vw}.sideMenu.svelte-1ibn89b:hover .text.svelte-1ibn89b{display:none}.sideMenu.svelte-1ibn89b.svelte-1ibn89b:hover{width:55px}}@media(max-width: 1300px){#selector.svelte-1ibn89b.svelte-1ibn89b{width:30px}.sideMenu.svelte-1ibn89b.svelte-1ibn89b:hover{width:35px}.sideMenu.svelte-1ibn89b:hover #selector.svelte-1ibn89b{width:30px}}@media(max-width: 1000px){#selector.svelte-1ibn89b.svelte-1ibn89b{width:35px}.sideMenu.svelte-1ibn89b:hover #selector.svelte-1ibn89b{width:35px}}@media(max-width: 800px){#selector.svelte-1ibn89b.svelte-1ibn89b{width:30px;margin-left:5px}}@media(max-width: 500px){#selector.svelte-1ibn89b.svelte-1ibn89b{width:30px;margin-left:5px}}`,
  map: null
};
const SideMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  function selectorBehav() {
    let startPosMid = 92;
    let offset = 60;
    let selector = document.getElementById("selector");
    let selected = $page.url.pathname.split("/")[1];
    console.log(selected);
    switch (selected) {
      case "homepage":
        selector.style.opacity = 0;
        break;
      case "fileManager":
        selector.style.opacity = 1;
        selector.style.top = startPosMid + "px";
        break;
      case "chat":
        selector.style.opacity = 1;
        selector.style.top = startPosMid + offset + "px";
        break;
      case "etherpadManager":
        selector.style.opacity = 1;
        selector.style.top = startPosMid + 2 * offset + "px";
        break;
    }
  }
  function pos() {
    let startPosMid = 92;
    let offsetMid = 60;
    let sideMenu = document.getElementsByClassName("sideMenu")[0];
    let chat = document.getElementsByClassName("chatEntry")[0];
    let file = document.getElementsByClassName("fileEntry")[0];
    let etherpad = document.getElementsByClassName("etherpadEntry")[0];
    document.getElementsByClassName("settingsEntry")[0];
    let logout = document.getElementsByClassName("exitEntry")[0];
    let selector = document.getElementById("selector");
    let style = window.getComputedStyle(selector);
    sideMenu?.addEventListener("mouseleave", function() {
      selectorBehav();
    });
    if (document.readyState == "complete") {
      selectorBehav();
    }
    file?.addEventListener("mouseover", function() {
      if (style.opacity == 0) {
        selector.style.opacity = 1;
        selector.style.animation = "opacity 0.2s";
      }
      selector.style.top = startPosMid + "px";
      selector.style.transition = "top 0.2s ease-in-out";
    });
    chat?.addEventListener("mouseover", function() {
      if (style.opacity == 0) {
        selector.style.opacity = 1;
        selector.style.animation = "opacity 0.2s";
      }
      selector.style.top = startPosMid + offsetMid + "px";
      selector.style.transition = "top 0.2s ease-in-out";
    });
    etherpad?.addEventListener("mouseover", function() {
      if (style.opacity == 0) {
        selector.style.opacity = 1;
        selector.style.animation = "opacity 0.2s";
      }
      selector.style.top = startPosMid + 2 * offsetMid + "px";
      selector.style.transition = "top 0.2s ease-in-out";
    });
    logout?.addEventListener("mouseover", function() {
      if (style.opacity == 0) {
        selector.style.opacity = 1;
        selector.style.animation = "opacity 0.2s";
      }
      selector.style.top = "calc(100% - 98px)";
      selector.style.transition = "top 0.2s ease-in-out";
    });
  }
  setTimeout(
    () => {
      pos();
    },
    100
  );
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<div class="sideMenu svelte-1ibn89b"><div id="upperSection" class="svelte-1ibn89b"><div id="clicker" class="svelte-1ibn89b"><div id="logo" class="svelte-1ibn89b"></div></div></div>

    <div id="midSection" class="svelte-1ibn89b"><div id="selector" class="svelte-1ibn89b"></div>

        <div style="display: flex" class="fileEntry entry svelte-1ibn89b"><div class="icon svelte-1ibn89b" id="file"></div>
            <div class="text svelte-1ibn89b"><div class="svelte-1ibn89b">Esplora File </div></div></div>

        <div style="display: flex" class="chatEntry entry svelte-1ibn89b"><div class="icon svelte-1ibn89b" id="chat"></div>
            <div class="text svelte-1ibn89b"><div class="svelte-1ibn89b">Messaggi </div></div></div>

        <div style="display: flex" class="etherpadEntry entry svelte-1ibn89b"><div class="icon svelte-1ibn89b" id="etherpad"></div>
            <div class="text svelte-1ibn89b"><div class="svelte-1ibn89b">Etherpad </div></div></div></div>

    <div id="lowerSection" class="svelte-1ibn89b">

        <div style="display: flex" class="exitEntry entry svelte-1ibn89b"><div class="icon svelte-1ibn89b" id="exit"></div>
            <div class="text svelte-1ibn89b"><div class="svelte-1ibn89b">Log Out </div></div></div></div>

    
</div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".page.svelte-2i6cw9{background-color:rgb(230, 227, 223);min-height:100%;min-width:100%;overflow-y:hidden}.homePage{width:100vw;height:100vh;display:flex}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  refreshChatList.subscribe((value) => {
    if (value) {
      refresh();
    }
    refreshChatList.set(false);
  });
  let unique = {};
  function refresh() {
    unique = {};
  }
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div class="page svelte-2i6cw9">${validate_component(HomepageLayout, "HomepageLayout").$$render($$result, {}, {}, {
    default: () => {
      return `${$page.url.pathname == "/" || $page.url.pathname == "/register" || $page.url.pathname == "/login" ? `${slots.default ? slots.default({}) : ``}` : `${validate_component(SideMenu, "SideMenu").$$render($$result, {}, {}, {})} 
            ${slots.default ? slots.default({}) : ``}`}`;
    }
  })}
    
</div>`;
});
export {
  Layout as default
};
