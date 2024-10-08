import { c as create_ssr_component, s as subscribe, o as onDestroy, b as add_attribute, e as escape, v as validate_component } from "../../../chunks/index.js";
import { c as currentPath, l as ls, P as Path } from "../../../chunks/SideMenu.svelte_svelte_type_style_lang.js";
import { c as config } from "../../../chunks/config.js";
const TitleTab_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.tab.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{width:100%;height:80px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid rgb(57, 107, 235)}.title.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{margin-left:10px;font-weight:bold;font-size:4.2vh}.new.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{width:3vw;height:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-right:3vw;cursor:pointer;z-index:1;transition:0.5s width}.new.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg:hover{width:10vw}.new.svelte-14lsogg:hover>.new1.svelte-14lsogg>img.svelte-14lsogg{transform:rotate(180deg)}img.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{transition:0.5s}.textNewButton.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{font-size:2vh;display:none;opacity:0;transition:0.5s opacity;transition-delay:1s}.new.svelte-14lsogg:hover>.new1.svelte-14lsogg>.textNewButton.svelte-14lsogg{display:block;opacity:1}.new1.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{width:100%;height:5vh;display:flex;align-items:center;background-color:rgb(255, 255, 255);justify-content:center;border-radius:10px}.new1.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg:hover{background-color:rgb(165, 163, 161)}.dirButton.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{width:100%;height:5vh;border-radius:10px;background-color:white;font-size:15px;line-height:5vh;text-align:center;display:none}.dirButton.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg:hover{width:100%;height:5vh;border-radius:10px;background-color:rgb(199, 199, 199);font-size:15px;line-height:5vh;text-align:center;transition:0.2s}.fileButton.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{width:100%;height:5vh;border-radius:10px;background-color:white;font-size:15px;line-height:5vh;text-align:center;display:none}.fileButton.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg:hover{width:100%;height:5vh;border-radius:10px;background-color:rgb(199, 199, 199);font-size:15px;line-height:5vh;text-align:center;transition:0.2s}.path.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{width:20vw;height:5vh;display:flex;background-color:white;border-radius:10px;margin-top:5px;align-items:center;pointer-events:none;font-weight:bold;border:none;padding:1vh}#filter.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{width:100%;height:100%;backdrop-filter:blur(3px);position:absolute;top:0;left:0;z-index:999;display:none}.newInput.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:25vw;height:15vw;background-color:rgb(255, 255, 255);border-radius:20px;z-index:1000;display:none;text-align:center;line-height:7vh;font-size:2.5vh;font-weight:bolder}.newInput.svelte-14lsogg>div.svelte-14lsogg.svelte-14lsogg{margin-top:3vh}.newInput.svelte-14lsogg>div.svelte-14lsogg>input.svelte-14lsogg{width:50%;height:5vh;border-radius:10px;background-color:white;font-size:15px;line-height:5vh;text-align:center;display:block;margin:auto}.newInput.svelte-14lsogg>img.svelte-14lsogg.svelte-14lsogg{width:2vw;height:2vw;cursor:pointer;display:block;transform:rotate(45deg);left:22.5vw;position:relative}.submit.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg{background-color:rgb(51, 84, 218);color:white;border-radius:10px;width:10vw;height:6vh;margin:auto;margin-top:2vh;line-height:6vh}.submit.svelte-14lsogg.svelte-14lsogg.svelte-14lsogg:hover{cursor:pointer;background-color:rgb(0, 35, 175)}#contextMenu{width:200px;height:150px;position:absolute;z-index:999;background-color:#a3a3a3;display:none;flex-direction:column;align-items:center;justify-content:center;border-radius:15px;overflow:hidden}#contextMenu > div{height:calc(100% / 3);text-align:center;line-height:calc(150px / 3);width:100%;cursor:pointer}#contextMenu > div:hover{background-color:#e3e3e3}",
  map: null
};
const TitleTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentPath, $$unsubscribe_currentPath;
  $$unsubscribe_currentPath = subscribe(currentPath, (value) => $currentPath = value);
  var text = "";
  var path = "";
  var nome = "";
  currentPath.subscribe((value) => {
    path = value;
  });
  function refreshPath() {
    console.log("REFRESH PATH(): " + path);
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
    if (style.display == "none" && (currentElementType.innerHTML == "File di testo" || currentElementType.innerHTML == "Cartella")) {
      e.preventDefault();
      console.log(currentElement);
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
        disable.onclick = function(e2) {
          e2.preventDefault();
          e2.stopPropagation();
          e2.stopImmediatePropagation();
          console.log("click");
          let div2 = document.getElementById("contextMenu");
          let style2 = getComputedStyle(div2);
          if (style2.display === "flex") {
            div2.style.display = "none";
            document.body.style.pointerEvents = "auto";
          }
          disable.remove();
        };
      }
    } else {
      let disable = document.getElementById("disable");
      disable?.click();
    }
  };
  onDestroy(() => {
    document.oncontextmenu = null;
  });
  $$result.css.add(css$4);
  $$unsubscribe_currentPath();
  return `<div id="contextMenu" class="svelte-14lsogg"><div class="svelte-14lsogg">Apri</div>
    <div class="svelte-14lsogg">Rinomina</div>
    <div class="svelte-14lsogg">Elimina</div></div>

<div class="tab svelte-14lsogg"><div class="title svelte-14lsogg">File</div>

    <input class="path svelte-14lsogg"${add_attribute("value", $currentPath, 0)}>

    <div class="new svelte-14lsogg"><div class="new1 svelte-14lsogg"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAJlJREFUSEvtltsJgDAMRU83cBQ3UDfSSXQjdQNHcQQpVBCkDysaheT3ht72NGljEAoj5Isav0b+d6hLYHB4WmC5iir3xDUwOrMGmNQ4RkBRxwjt+qPFZVum8OzEar3TukA7rT4tdMe2RapUBJ68GbB0TvFJYzHUIcqPFpcaHwko6te+RbFB4OaDho63twkmL5A7gSQb+BLFjDd6nCgfe6urvwAAAABJRU5ErkJggg==" class="svelte-14lsogg">
            <div class="textNewButton svelte-14lsogg">Nuovo</div></div>

        <div class="dirButton svelte-14lsogg">Nuova Cartella  
        </div>

        <div class="fileButton svelte-14lsogg">Nuovo File
        </div></div>

    <div class="newInput svelte-14lsogg"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAJlJREFUSEvtltsJgDAMRU83cBQ3UDfSSXQjdQNHcQQpVBCkDysaheT3ht72NGljEAoj5Isav0b+d6hLYHB4WmC5iir3xDUwOrMGmNQ4RkBRxwjt+qPFZVum8OzEar3TukA7rT4tdMe2RapUBJ68GbB0TvFJYzHUIcqPFpcaHwko6te+RbFB4OaDho63twkmL5A7gSQb+BLFjDd6nCgfe6urvwAAAABJRU5ErkJggg==" class="svelte-14lsogg">
        <div class="svelte-14lsogg">Inserisci il nome del${escape(nome)}
            <input type="text" class="svelte-14lsogg"${add_attribute("value", text, 0)}>
            <div class="submit svelte-14lsogg">Conferma
            </div></div></div>

    <div id="filter" class="svelte-14lsogg"></div>
</div>`;
});
const InfoTab_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-1yb4lqe.svelte-1yb4lqe{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.tabInfocontainer.svelte-1yb4lqe.svelte-1yb4lqe{width:100%;position:relative;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:flex-start}.tabInfo.svelte-1yb4lqe.svelte-1yb4lqe{width:78vw;height:50px;display:flex;align-items:center;border-bottom:2px solid rgb(169, 169, 169);position:relative}.tabInfo.svelte-1yb4lqe>div.svelte-1yb4lqe{width:calc(100%/5)}.tipo.svelte-1yb4lqe.svelte-1yb4lqe{font-weight:bold;font-size:2vh}.nome.svelte-1yb4lqe.svelte-1yb4lqe{font-weight:bold;font-size:2vh}.data.svelte-1yb4lqe.svelte-1yb4lqe{font-weight:bold;font-size:2vh}.altreInfo.svelte-1yb4lqe.svelte-1yb4lqe{font-weight:bold;font-size:2vh}.button.svelte-1yb4lqe.svelte-1yb4lqe{width:25px;height:25px;display:flex;align-items:center;justify-content:center;cursor:pointer}.controls.svelte-1yb4lqe.svelte-1yb4lqe{width:9vw;height:50px;display:flex;align-items:center;justify-content:center;gap:20px;padding-left:10px;float:right}img.svelte-1yb4lqe.svelte-1yb4lqe{width:100%;height:100%}#refresh.svelte-1yb4lqe>img.svelte-1yb4lqe{width:30px;height:30px}",
  map: null
};
const InfoTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="tabInfocontainer svelte-1yb4lqe"><div class="controls svelte-1yb4lqe"><div class="button svelte-1yb4lqe" id="refresh"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAfhJREFUSEvt1ruvTVEQBvDfjXeoKNDoBBGFUkS8H/EIrYRSJUKhofGMRKJSkCgUKh0h3s+g0VAo8AdI0AniFSIjc2Tfnb33WVxxI+6qzlkza76Zb741aw8YpjUwTLhGgP8a8/8M1WOwDEsxO+l5htu4gy+llJVWHH5bcBTTW4K/xiGcxNd+CZQAT8QVLKoFe57/Z9X272MFPneB9wMej6tYnEFeYDciePyONRnrsDfp344TQ634CPZkkOjhRrxtCToWS3C9H2jYuyqeklWNwxMswPuSoIgzwcDhNsF1AW/FmQRansotwQ3QC1iFa9jQBF4Fnla5IgGwK6n9hLX4Vrk+L1syCE2cx+qK/TI21cGrwJFpCCn61LbuYg0imfqKO34JKxtsN1KAP+95neou8N8F7eUxCLypx0HXxbyLvUM3s1cfW6iYijlpm5A9Ho1zOF458xSvulRdrbyr0qY8tuFUGjbjbJNTl6oDfB8OtPS0Kd4MPEJcxQ85Xt/8KnDdP0QX1betGK0PMTcdDmbijf79Rmbv0I7s1QMcwy28S+OkfLH2Y37uhX092jRR9OkTlEeghbXUQyghoJm1/X5C/OFeWvEo7MwxGP1rWveSlRggf+RZrILEQxAfAUHjvDQ8xumc5x0SGGwqrbg4YKnjCHApU0P2+/+o/g7oX1of1iIDHwAAAABJRU5ErkJggg==" class="svelte-1yb4lqe"></div>

        <div class="button svelte-1yb4lqe"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAARZJREFUSEvF1yFLBEEYBuDn8AQRRKOgSTCYxGAVo000mNRs0mwyajHdcU0ERdHmXzD7V2z+ARm4g2E53bvdm5nNwz7fLPO9821HoadTyJUKXsMhnvEzbnMp4DP0sDyEz1PDK3jAcQR9Yj8lfIBHrFaQZPAi7nHxxyFNAu/iDRv/dMZM4S5ucI25mnacGbyJd+xM2P+t4dB2l7jDwoRoWNYKDmHwir0pwNHSxvAp+sMwaOBOv+NxYZAcnscXtptIbQKkGByKLvKp46+V/XDFeJF2GhUQAuQKtzkDJN79Fl5yRmaMF7kk4gKyX4sxXmQQiAvIPvrEeJFhrxo6AyzhA0cpp8zqu9dxgid854RrL7YUfxK1aFjwCyo9NB9yN2XdAAAAAElFTkSuQmCC" class="svelte-1yb4lqe"></div>

        <div class="button svelte-1yb4lqe"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQpJREFUSEvd178uBUEUB+DvPoDWqyg9gpL412hElAotBb3GC5CoxAtIRKugl6gQJZGICCEnuZtcxV12d3ZGzAPM95vNzjlnBgqtQSFXHTyBJZzgPnXAOvgAC3jCKo5S4nXwGaZHsGOs4DFFgCZweA9YxGlXvClcefvYwEvbAG3h8G4wh4s2eBc4vA/sYBvvTQJ0hSvrErO4/i2eCg7vFZvYw+dPAVLClXWOedzV4X3A4cVdX8fhOLwvuPLGFp2+4QhwhSm8jZ7+38LZP3WRnyv7dSpSQLKXzGgSu9jK2SSKtMXsg0CR0SfbsBfz9AyesYYYd5Otulo9ieXhPH2bTBxu9CefMKkP+W2/L++/UB+fSrrtAAAAAElFTkSuQmCC" class="svelte-1yb4lqe"></div></div>

    <div class="tabInfo svelte-1yb4lqe"><div class="nome svelte-1yb4lqe">Nome</div>
        <div class="tipo svelte-1yb4lqe">Tipo</div>
        <div class="data svelte-1yb4lqe">Ultima Modifica</div>
        <div class="altreInfo svelte-1yb4lqe">Altre Informazioni</div>
        <div class="altreInfo svelte-1yb4lqe">Completato</div></div>
</div>`;
});
const ListFile_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-137xdln.svelte-137xdln{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.listContainer.svelte-137xdln.svelte-137xdln{width:80vw;height:80%;display:flex;flex-direction:column;align-items:center;overflow-y:scroll}#loader{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:15vw;height:10vw;background-color:rgb(255, 255, 255);border-radius:20px;z-index:1000;display:none;align-items:center;justify-content:center;flex-direction:column;text-align:center}.listContainer.svelte-137xdln.svelte-137xdln::-webkit-scrollbar{width:12px;background-color:none;border-radius:20px}.listContainer.svelte-137xdln.svelte-137xdln::-webkit-scrollbar-thumb{background-color:rgb(155, 155, 155);border-radius:20px}.container{width:100%;height:50px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid grey;cursor:pointer;transition:0.5s height}.bigContainer{width:100%;height:50px;display:flex}.container:hover{height:60px;background-color:rgb(174, 174, 174)}.listContainer>div>div>span{width:calc(100%/5)}.icon{width:25px;position:relative;margin-right:5px}.lds-ellipsis.svelte-137xdln.svelte-137xdln{display:inline-block;position:relative;width:80px;height:40px}.lds-ellipsis.svelte-137xdln div.svelte-137xdln{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:13px;height:13px;border-radius:50%;background:rgb(57, 111, 211);animation-timing-function:cubic-bezier(0, 1, 1, 0)}.lds-ellipsis.svelte-137xdln div.svelte-137xdln:nth-child(1){left:8px;animation:svelte-137xdln-lds-ellipsis1 0.6s infinite}.lds-ellipsis.svelte-137xdln div.svelte-137xdln:nth-child(2){left:8px;animation:svelte-137xdln-lds-ellipsis2 0.6s infinite}.lds-ellipsis.svelte-137xdln div.svelte-137xdln:nth-child(3){left:32px;animation:svelte-137xdln-lds-ellipsis2 0.6s infinite}.lds-ellipsis.svelte-137xdln div.svelte-137xdln:nth-child(4){left:56px;animation:svelte-137xdln-lds-ellipsis3 0.6s infinite}@keyframes svelte-137xdln-lds-ellipsis1{0%{transform:scale(0)}100%{transform:scale(1)}}@keyframes svelte-137xdln-lds-ellipsis3{0%{transform:scale(1)}100%{transform:scale(0)}}@keyframes svelte-137xdln-lds-ellipsis2{0%{transform:translate(0, 0)}100%{transform:translate(24px, 0)}}#filter.svelte-137xdln.svelte-137xdln{position:absolute;width:100vw;height:100vw;backdrop-filter:blur(2px);z-index:999;display:none}.switch{position:relative;display:inline-block;width:50px;height:24px}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s}.slider:before{position:absolute;content:"";height:16px;width:16px;left:4px;bottom:4px;background-color:white;-webkit-transition:.4s;transition:.4s}input:checked + .slider{background-color:#2196F3}input:focus + .slider{box-shadow:0 0 1px #2196F3}input:checked + .slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.slider.round{border-radius:34px}.slider.round:before{border-radius:50%}`,
  map: null
};
const ListFile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  fetch(config.getHost() + "/api/whoami", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    currentPath.set("/" + data.sezione);
    ls(Path);
  }).catch((error) => console.log(error));
  $$result.css.add(css$2);
  return `<div id="filter" class="svelte-137xdln"></div>
<div id="loader" class="svelte-137xdln"><h2 class="svelte-137xdln">Documento in <br class="svelte-137xdln"> apertura</h2>
    <div class="lds-ellipsis svelte-137xdln"><div class="svelte-137xdln"></div><div class="svelte-137xdln"></div><div class="svelte-137xdln"></div><div class="svelte-137xdln"></div></div></div>
<div class="listContainer svelte-137xdln"></div>`;
});
const FileContainer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-xfpidf{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}#fileContainer.svelte-xfpidf{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between}",
  map: null
};
const FileContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div id="fileContainer" class="svelte-xfpidf">${validate_component(TitleTab, "TitleTab").$$render($$result, {}, {}, {})}
    ${validate_component(InfoTab, "InfoTab").$$render($$result, {}, {}, {})}
    ${validate_component(ListFile, "ListFile").$$render($$result, {}, {}, {})}
</div>`;
});
const FileManager_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.homePage{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center}",
  map: null
};
const FileManager_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(FileContainer, "FileManager").$$render($$result, {}, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(FileManager_1, "FileManager").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
