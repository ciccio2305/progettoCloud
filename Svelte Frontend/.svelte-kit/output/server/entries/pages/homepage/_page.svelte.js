import { c as create_ssr_component, e as escape, d as each, h as null_to_empty, v as validate_component, o as onDestroy, i as spread, j as escape_object, b as add_attribute } from "../../../chunks/index.js";
import { t as timestamp, m as myWords, a as totalWords, b as lastPad, D as Data, H as Hour, M as Minute } from "../../../chunks/SideMenu.svelte_svelte_type_style_lang.js";
import { u as useForwardEvents } from "../../../chunks/Dashboard.svelte_svelte_type_style_lang.js";
import { c as config } from "../../../chunks/config.js";
import { Chart as Chart$1, LineController, BarController, BarElement, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from "chart.js";
import "../../../chunks/endpoints.js";
const css$c = {
  code: '.calendario.svelte-jrx8sr{display:flex;justify-content:flex-start;align-items:center;flex-direction:column;margin-top:5vh;background-color:#e3e3e3;border-radius:5px;gap:15px;width:22vw;min-width:250px;height:20vh}.top.svelte-jrx8sr{width:100%;display:flex;flex-direction:row;justify-content:space-between;margin-top:0px;border-top-left-radius:5px;border-top-right-radius:5px}.mese-anno.svelte-jrx8sr{font-weight:bold;margin-top:10px}.left.svelte-jrx8sr{background-image:url("../../../icons/left.png");background-size:cover;background-position:center;width:25px;margin-top:10px}.right.svelte-jrx8sr{background-image:url("../../../icons/right.png");background-size:cover;background-position:center;width:24px;margin-top:10px}.table.svelte-jrx8sr{width:100%;overflow-x:auto;display:flex;justify-content:center;align-items:center}table.svelte-jrx8sr{width:100vw;border-collapse:collapse;border:none}th.svelte-jrx8sr{width:calc(100%/7);font-size:small}td.svelte-jrx8sr{padding:3px;font-size:small;text-align:center}td.svelte-jrx8sr:hover{background-color:rgb(45, 171, 249);cursor:pointer}.non-mese.svelte-jrx8sr{opacity:0.4}.numberDay.svelte-jrx8sr{background-color:#87a7f9;cursor:pointer}',
  map: null
};
const CardCalendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let calendario = [];
  let meseCorrente = (/* @__PURE__ */ new Date()).getMonth();
  let annoCorrente = (/* @__PURE__ */ new Date()).getFullYear();
  let correntDate = (/* @__PURE__ */ new Date()).getDate();
  let formattedDate = new Date(annoCorrente, meseCorrente).toLocaleDateString("default", { month: "long", year: "numeric" });
  let uppercaseFormattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  function colorDay(day, month) {
    let monthCurrent = (/* @__PURE__ */ new Date()).getMonth();
    if (day == correntDate && month == monthCurrent) {
      return true;
    } else {
      return false;
    }
  }
  $$result.css.add(css$c);
  return `<div class="calendario svelte-jrx8sr"><div class="top svelte-jrx8sr"><div class="left svelte-jrx8sr"></div>
            <div class="mese-anno svelte-jrx8sr">${escape(uppercaseFormattedDate)}</div>
        <div class="right svelte-jrx8sr"></div></div> 

    <div class="table svelte-jrx8sr"><table class="svelte-jrx8sr"><thead><tr><th class="svelte-jrx8sr">Lun</th>
                <th class="svelte-jrx8sr">Mar</th>
                <th class="svelte-jrx8sr">Mer</th>
                <th class="svelte-jrx8sr">Gio</th>
                <th class="svelte-jrx8sr">Ven</th>
                <th class="svelte-jrx8sr">Sab</th>
                <th class="svelte-jrx8sr">Dom</th></tr></thead>
            <tbody>${each(calendario, (settimana) => {
    return `<tr>${each(settimana, (giorno) => {
      return `<td class="${[
        "svelte-jrx8sr",
        (giorno.notMonth == null ? "non-mese" : "") + " " + (colorDay(giorno.giorno, giorno.monthCurrent) ? "numberDay" : "")
      ].join(" ").trim()}">${giorno.giorno ? `${escape(giorno.giorno)}` : ``}
                      </td>`;
    })}
                </tr>`;
  })}</tbody></table></div>
    
  </div>`;
});
const css$b = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-1lmnqgh.svelte-1lmnqgh{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}#topTab.svelte-1lmnqgh.svelte-1lmnqgh{width:100%;height:10%;display:flex;align-items:center;justify-content:center}#topBar.svelte-1lmnqgh.svelte-1lmnqgh{width:95%;height:70%;background-color:#ffffff;border-radius:15px;display:flex;align-items:center}#left.svelte-1lmnqgh.svelte-1lmnqgh{width:60%;height:100%;border-radius:15px;float:left;display:flex;align-items:center;justify-content:flex-start;min-width:700px}#picture.svelte-1lmnqgh.svelte-1lmnqgh{width:10%;height:85%;border-radius:100%;display:flex;align-items:center;justify-content:center;background-size:cover;background-position:center;overflow:hidden}#picture.svelte-1lmnqgh.svelte-1lmnqgh:hover{cursor:pointer}#picture.svelte-1lmnqgh>svg.svelte-1lmnqgh{display:none}#picture.svelte-1lmnqgh:hover>svg.svelte-1lmnqgh{background-color:#e3e3e35b;display:flex;align-items:center;justify-content:center;opacity:50%}#name.svelte-1lmnqgh.svelte-1lmnqgh{width:auto;height:50%;border-radius:15px;float:left;font-weight:bold;display:flex;align-items:center;justify-content:start;flex-direction:column}#nameText.svelte-1lmnqgh.svelte-1lmnqgh{font-size:2vh}#roleText.svelte-1lmnqgh.svelte-1lmnqgh{font-size:1.3vh}#separator.svelte-1lmnqgh.svelte-1lmnqgh{width:1.5px;height:70%;background-color:#e3e3e3;border-radius:15px;float:left;margin-left:10px}#calendar.svelte-1lmnqgh.svelte-1lmnqgh{width:8vw;min-width:150px;height:50%;background-color:#e3e3e3;border-radius:15px;float:left;font-weight:bold;display:flex;align-items:center;justify-content:space-evenly;margin-left:10px;margin-right:10px;cursor:pointer}#calendarIcon.svelte-1lmnqgh.svelte-1lmnqgh{width:30%;height:100%;float:left;display:flex;align-items:center;justify-content:center}#calendarIcon.svelte-1lmnqgh>svg.svelte-1lmnqgh{width:auto;height:80%}#date.svelte-1lmnqgh.svelte-1lmnqgh{width:50%;text-align:left;font-size:1.8vh}#mid.svelte-1lmnqgh.svelte-1lmnqgh{width:35%;min-width:250px;height:100%;border-radius:15px;display:flex;align-items:center;justify-content:center}.containerCalendar.svelte-1lmnqgh.svelte-1lmnqgh{margin-top:10vh;display:block}.offDisplay.svelte-1lmnqgh.svelte-1lmnqgh{display:none}#searchBar.svelte-1lmnqgh.svelte-1lmnqgh{min-width:200px;width:100%;height:50%;background-color:#e3e3e3;border-radius:15px;float:left;display:flex;align-items:center;justify-content:space-evenly}#searchBarIcon.svelte-1lmnqgh.svelte-1lmnqgh{width:10%;height:90%;float:left;display:flex;align-items:center;justify-content:center}#searchBarIcon.svelte-1lmnqgh>svg.svelte-1lmnqgh{width:auto;height:90%}#searchBar.svelte-1lmnqgh input.svelte-1lmnqgh{width:80%;height:50%;border:none;background-color:#e3e3e3;border-radius:15px;font-weight:bold;font-size:1.8vh;outline:none}#right.svelte-1lmnqgh.svelte-1lmnqgh{width:5%;height:100%;min-width:50px;border-radius:15px;display:flex;align-items:center;justify-content:center}#notificationIcon.svelte-1lmnqgh.svelte-1lmnqgh{width:50%;height:50%;display:flex;align-items:center;justify-content:center}#organizerLeft.svelte-1lmnqgh.svelte-1lmnqgh{width:30vw;min-width:400px;height:100%;display:flex;align-items:center;justify-content:space-evenly}",
  map: null
};
const TopTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let containerCalendar = "offDisplay";
  (/* @__PURE__ */ new Date()).getFullYear();
  (/* @__PURE__ */ new Date()).getMonth();
  let maledettoSalvo = /* @__PURE__ */ new Date();
  console.log(maledettoSalvo);
  let datearray = maledettoSalvo.toString().split(" ");
  let currentDay = "";
  let currentDate = datearray[2];
  switch (datearray[0]) {
    case "Mon":
      currentDay = "Lun";
      break;
    case "Tue":
      currentDay = "Mar";
      break;
    case "Wed":
      currentDay = "Mer";
      break;
    case "Thu":
      currentDay = "Gio";
      break;
    case "Fri":
      currentDay = "Ven";
      break;
    case "Sat":
      currentDay = "Sab";
      break;
    case "Sun":
      currentDay = "Dom";
      break;
  }
  let username = " ";
  let role = " ";
  function init() {
    fetch(config.getHost() + "/api/whoami", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then((response) => response.json()).then((data) => {
      username = data.name;
      data.email;
      role = data.role;
      let propic = data.propic;
      document.getElementById("picture").style.backgroundImage = "url(" + propic + ")";
    }).catch((error) => console.log(error));
  }
  init();
  $$result.css.add(css$b);
  return `<div id="topTab" class="svelte-1lmnqgh"><div id="topBar" class="svelte-1lmnqgh"><div id="left" class="svelte-1lmnqgh"><div id="organizerLeft" class="svelte-1lmnqgh"><div id="picture" class="svelte-1lmnqgh"><svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" class="svelte-1lmnqgh"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" class="svelte-1lmnqgh"></path></svg>
                    <input style="display: none;" type="file" accept=".jpg, .jpeg, .png" class="svelte-1lmnqgh"></div>
                <div id="name" class="svelte-1lmnqgh"><div id="nameText" class="svelte-1lmnqgh">${escape(username)}</div>
                    <div id="roleText" class="svelte-1lmnqgh">${escape(role)}</div></div>
                <div id="separator" class="svelte-1lmnqgh"></div>
                <div id="calendar" class="svelte-1lmnqgh"><div id="calendarIcon" class="svelte-1lmnqgh"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-1lmnqgh"><path d="M21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20ZM9 18H7V16H9V18ZM9 14H7V12H9V14ZM13 18H11V16H13V18ZM13 14H11V12H13V14ZM17 18H15V16H17V18ZM17 14H15V12H17V14ZM19 9H5V7H19V9Z" fill="black" class="svelte-1lmnqgh"></path></svg></div>
                    <div id="date" class="svelte-1lmnqgh">${escape(currentDate)} ${escape(currentDay)}</div></div></div>
            

            <div class="${escape(null_to_empty(containerCalendar), true) + " svelte-1lmnqgh"}">${validate_component(CardCalendar, "CardCalendar").$$render($$result, {}, {}, {})}</div></div>

        <div id="mid" class="svelte-1lmnqgh"><div id="searchBar" class="svelte-1lmnqgh"><div id="searchBarIcon" class="svelte-1lmnqgh"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-1lmnqgh"><path d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z" fill="black" class="svelte-1lmnqgh"></path><path d="M11.412 8.58599C11.791 8.96599 12 9.46799 12 9.99999H14C14.0009 9.47442 13.8976 8.95389 13.6961 8.46848C13.4946 7.98307 13.1989 7.54242 12.826 7.17199C11.312 5.65999 8.68701 5.65999 7.17401 7.17199L8.58601 8.58799C9.34601 7.82999 10.656 7.83199 11.412 8.58599Z" fill="black" class="svelte-1lmnqgh"></path></svg></div>
                <input type="text" id="searchBarInput" placeholder="Cerca..." class="svelte-1lmnqgh"></div></div>

        <div id="right" class="svelte-1lmnqgh"><div id="notificationIcon" class="svelte-1lmnqgh"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-1lmnqgh"><path d="M19 13.586V10C19 6.783 16.815 4.073 13.855 3.258C13.562 2.52 12.846 2 12 2C11.154 2 10.438 2.52 10.145 3.258C7.185 4.074 5 6.783 5 10V13.586L3.293 15.293C3.19996 15.3857 3.12617 15.4959 3.07589 15.6172C3.0256 15.7386 2.99981 15.8687 3 16V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H20C20.2652 19 20.5196 18.8946 20.7071 18.7071C20.8946 18.5196 21 18.2652 21 18V16C21.0002 15.8687 20.9744 15.7386 20.9241 15.6172C20.8738 15.4959 20.8 15.3857 20.707 15.293L19 13.586ZM19 17H5V16.414L6.707 14.707C6.80004 14.6143 6.87383 14.5041 6.92412 14.3828C6.9744 14.2614 7.00019 14.1313 7 14V10C7 7.243 9.243 5 12 5C14.757 5 17 7.243 17 10V14C17 14.266 17.105 14.52 17.293 14.707L19 16.414V17ZM12 22C12.6193 22.0008 13.2235 21.8086 13.7285 21.4502C14.2335 21.0917 14.6143 20.5849 14.818 20H9.182C9.38566 20.5849 9.76648 21.0917 10.2715 21.4502C10.7765 21.8086 11.3807 22.0008 12 22Z" fill="black" class="svelte-1lmnqgh"></path></svg>
                <div id="notificationCounter" class="svelte-1lmnqgh"></div></div></div></div>
</div>`;
});
const css$a = {
  code: ".openedContainer.svelte-g7pb8a{display:flex;gap:5px;font-size:1.5vh;align-items:center}.iconOpened.svelte-g7pb8a{width:2vh;height:2vh;display:inline-block}.lastOpened.svelte-g7pb8a{line-height:2vh;height:2vh;font-size:0.7vmax}.totalWorkContainer.svelte-g7pb8a{display:flex;gap:5px;align-items:center}.iconWork.svelte-g7pb8a{width:2.5vh;height:2.5vh;display:inline-block}.totalWork.svelte-g7pb8a{line-height:2vh;font-size:1.5vh;font-size:0.7vmax}.lastModifiedContainer.svelte-g7pb8a{display:flex;gap:5px;align-items:center}.iconLastModified.svelte-g7pb8a{width:2vh;height:2vh;display:inline-block}.lastModified.svelte-g7pb8a{line-height:2vh;font-size:0.7vmax}.wordContainer.svelte-g7pb8a{display:flex;gap:5px;align-items:center}.iconWord.svelte-g7pb8a{width:2vh;height:2vh;display:inline-block}.word.svelte-g7pb8a{line-height:2vh;font-size:0.7vmax}",
  map: null
};
const TopLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let opMin = 0;
  let contribution = 0;
  let word = 0;
  let myword;
  let totalwords = 0;
  let lastPadName = "";
  let timeStamp = 0;
  let timeDiff;
  let LastEditTimestamp = "0";
  let LastEditDate = "0";
  let LastEditTime = "0";
  timestamp.subscribe((value) => {
    timeStamp = value;
    console.log("timestamp: " + timeStamp);
  });
  myWords.subscribe((value) => {
    myword = value;
    word = myword;
  });
  totalWords.subscribe((value) => {
    totalwords = value;
  });
  lastPad.subscribe((value) => {
    lastPadName = value;
  });
  let interval = setInterval(
    () => {
      console.log(timeStamp);
      console.log(totalwords);
      console.log(lastPadName);
      if (timeStamp == 0)
        return;
      let actualTime = Date.now();
      timeDiff = actualTime - timeStamp;
      opMin = Math.floor(timeDiff / 6e4);
      console.log("aperto da: " + opMin);
      if (totalwords == 0)
        return;
      contribution = totalwords / word * 100;
      console.log("contribution: " + contribution);
      if (lastPadName == "")
        return;
      fetch(config.getHost() + "/api/stats/get_last_edited" + lastPadName, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }).then((response) => response.json()).then((data) => {
        LastEditTimestamp = data.timestamp;
        LastEditDate = new Date(LastEditTimestamp).toLocaleDateString();
        LastEditTime = new Date(LastEditTimestamp).toLocaleTimeString();
      }).catch((error) => {
        console.log(error);
      });
    },
    3e4
  );
  onDestroy(() => {
    clearInterval(interval);
  });
  $$result.css.add(css$a);
  return `<div class="openedContainer svelte-g7pb8a"><div class="iconOpened svelte-g7pb8a"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path></svg></div>
    <div class="lastOpened svelte-g7pb8a">Aperto da ${escape(opMin)} minuti </div></div>

<div class="totalWorkContainer svelte-g7pb8a"><div class="iconWork svelte-g7pb8a"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path></svg></div>
    <div class="totalWork svelte-g7pb8a">Hai contribuito per un totale del ${escape(contribution)}%</div></div>


<div class="lastModifiedContainer svelte-g7pb8a"><div class="iconLastModified svelte-g7pb8a"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path></svg></div>
    <div class="lastModified svelte-g7pb8a">Ultima modifica il ${escape(LastEditDate)} alle ${escape(LastEditTime)}</div></div>

<div class="wordContainer svelte-g7pb8a"><div class="iconWord svelte-g7pb8a"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m11.307 4-6 16h2.137l1.875-5h6.363l1.875 5h2.137l-6-16h-2.387zm-1.239 9L12.5 6.515 14.932 13h-4.864z"></path></svg></div>
    <div class="word svelte-g7pb8a">Words: ${escape(word)}</div>
</div>`;
});
const css$9 = {
  code: ".completed.svelte-10v7pb7{width:45%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background-color:#e3e3e3;border-radius:5px;padding:5px}.inProgress.svelte-10v7pb7{width:45%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background-color:#e3e3e3;border-radius:5px;padding:8px}.result.svelte-10v7pb7{width:50%;margin-left:9px;font-size:0.8vmax}.totalObjectivesContainer.svelte-10v7pb7{display:flex;width:7vw;margin-left:7px;align-items:center}.iconTotalObjects.svelte-10v7pb7{width:0.9vw;height:100%;display:inline-block}.iconTotalObjectsInprogress.svelte-10v7pb7{width:0.8vw;height:100%;display:inline-block;font-size:0.8vmax}.totalObjectives.svelte-10v7pb7{width:20%;text-align:center;font-size:0.8vmax}.bonus.svelte-10v7pb7{width:100%;font-size:0.6vmax;margin-left:9px;color:rgb(0, 197, 7)}.malus.svelte-10v7pb7{width:100%;font-size:0.6vmax;margin-left:9px;color:rgb(187, 30, 22)}",
  map: null
};
const TopRightWeek = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let weekCompleted = 0;
  let uncompleted = 0;
  fetch(config.getHost() + "/api/stats/get_completed_week_user", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    if (data.length == void 0)
      weekCompleted = 0;
    else
      weekCompleted = data.length;
  });
  fetch(config.getHost() + "/api/stats/get_uncompleted", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    uncompleted = data.length;
  });
  $$result.css.add(css$9);
  return `<div class="completed svelte-10v7pb7"><div class="result svelte-10v7pb7">Completati</div>
    <div class="totalObjectivesContainer svelte-10v7pb7"><div class="iconTotalObjects svelte-10v7pb7"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"></path></svg></div>

        <div class="totalObjectives svelte-10v7pb7">${escape(weekCompleted)}</div></div>
    <div class="bonus svelte-10v7pb7">15% in più della scorsa settimana</div></div>

<div class="inProgress svelte-10v7pb7"><div class="result svelte-10v7pb7">In Corso</div>
    <div class="totalObjectivesContainer svelte-10v7pb7"><div class="iconTotalObjectsInprogress svelte-10v7pb7"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg></div>

        <div class="totalObjectives svelte-10v7pb7">${escape(uncompleted)}</div></div>
    <div class="malus svelte-10v7pb7">25% in meno della scorsa settimana</div>
</div>`;
});
const css$8 = {
  code: ".completed.svelte-1115q4q{width:45%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background-color:#e3e3e3;border-radius:5px;padding:8px}.inProgress.svelte-1115q4q{width:45%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background-color:#e3e3e3;border-radius:5px;padding:8px}.result.svelte-1115q4q{width:50%;margin-left:9px;font-size:0.8vmax}.totalObjectivesContainer.svelte-1115q4q{display:flex;width:7vw;margin-left:7px;align-items:center}.iconTotalObjects.svelte-1115q4q{width:0.9vw;height:100%;display:inline-block}.iconTotalObjectsInprogress.svelte-1115q4q{width:0.8vw;height:100%;display:inline-block;font-size:0.8vmax}.totalObjectives.svelte-1115q4q{width:20%;text-align:center;font-size:0.8vmax}.bonus.svelte-1115q4q{width:100%;font-size:0.6vmax;margin-left:9px;color:rgb(0, 197, 7)}.malus.svelte-1115q4q{width:100%;font-size:0.6vmax;margin-left:9px;color:rgb(187, 30, 22)}",
  map: null
};
const TopRightMonth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let monthCompleted = 0;
  let uncompleted = 0;
  fetch(config.getHost() + "/api/stats/get_completed_month_user", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    monthCompleted = data.length;
    console.log(monthCompleted);
  });
  fetch(config.getHost() + "/api/stats/get_uncompleted", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    uncompleted = data.length;
  });
  $$result.css.add(css$8);
  return `<div class="completed svelte-1115q4q"><div class="result svelte-1115q4q">Completati</div>
    <div class="totalObjectivesContainer svelte-1115q4q"><div class="iconTotalObjects svelte-1115q4q"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"></path></svg></div>

        <div class="totalObjectives svelte-1115q4q">${escape(monthCompleted)}</div></div>
    <div class="bonus svelte-1115q4q">15% in più della scorsa settimana</div></div>

<div class="inProgress svelte-1115q4q"><div class="result svelte-1115q4q">In Corso</div>
    <div class="totalObjectivesContainer svelte-1115q4q"><div class="iconTotalObjectsInprogress svelte-1115q4q"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg></div>

        <div class="totalObjectives svelte-1115q4q">${escape(uncompleted)}</div></div>
    <div class="malus svelte-1115q4q">25% in meno della scorsa settimana</div>
</div>`;
});
const css$7 = {
  code: ".secondTitleMiddle.svelte-7qksok{width:100%;height:50%;margin-left:7px;display:flex;align-items:center;justify-content:left;font-size:1vmax;font-weight:bold}.completed.svelte-7qksok{width:80%;height:100%;margin-left:10px;display:flex;flex-direction:column;justify-content:left;background-color:#e3e3e3;border-radius:5px;padding:5px}.inProgress.svelte-7qksok{width:80%;height:100%;margin-left:10px;display:flex;flex-direction:column;justify-content:left;background-color:#e3e3e3;border-radius:5px;padding:5px}.result.svelte-7qksok{width:50%;font-size:1vmax}.totalObjectivesContainer.svelte-7qksok{display:flex;width:7vw;align-items:center }.iconTotalObjects.svelte-7qksok{width:0.9vw;height:100%;display:inline-block}.totalObjectives.svelte-7qksok{text-align:center;font-size:1vmax}.bonus.svelte-7qksok{width:100%;font-size:0.7vmax;color:rgb(0, 197, 7);margin-top:5px}.malus.svelte-7qksok{width:100%;font-size:0.7vmax;color:rgb(187, 30, 22);margin-top:5px}",
  map: null
};
const MiddleLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let uncompleted = 0;
  let completed = 0;
  let sezione = "";
  fetch(config.getHost() + "/api/stats/get_completed_month", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    if (data.length == void 0)
      completed = 0;
    else
      completed = data.length;
  });
  fetch(config.getHost() + "/api/stats/get_uncompleted", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    uncompleted = data.length;
  });
  fetch(config.getHost() + "/api/whoami", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    if (data.sezione == "primasezionecivile")
      sezione = "Prima Sezione Civile";
    else if (data.sezione == "secondasezionecivile")
      sezione = "Seconda Sezione Civile";
    else if (data.sezione == "terzasezionecivile")
      sezione = "Terza Sezione Civile";
    else if (data.sezione == "quartasezionecivile")
      sezione = "Quarta Sezione Civile";
    else if (data.sezione == "quintasezionecivile")
      sezione = "Quinta Sezione Civile";
    else if (data.sezione == "sestasezionecivile")
      sezione = "Sesta Sezione Civile";
  }).catch((error) => console.log(error));
  $$result.css.add(css$7);
  return `<div class="secondTitleMiddle svelte-7qksok">${escape(sezione)}</div>
<div class="completed svelte-7qksok"><div class="result svelte-7qksok">Completati</div>
    <div class="totalObjectivesContainer svelte-7qksok"><div class="iconTotalObjects svelte-7qksok"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"></path></svg></div>

        <div class="totalObjectives svelte-7qksok">${escape(completed)}</div></div>
    <div class="bonus svelte-7qksok">25% in più dello scorso mese</div></div>

<div class="inProgress svelte-7qksok"><div class="result svelte-7qksok">In Corso</div>
    <div class="totalObjectivesContainer svelte-7qksok"><div class="iconTotalObjects svelte-7qksok"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg></div>

        <div class="totalObjectives svelte-7qksok">${escape(uncompleted)}</div></div>
    <div class="malus svelte-7qksok">3% in meno dello scorso mese</div>
</div>`;
});
function clean(props2) {
  let { data: data2, type: type2, options: options2, plugins: plugins2, children, $$scope, $$slots, ...rest } = props2;
  return rest;
}
const Chart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { data = { datasets: [] } } = $$props;
  let { options = {} } = $$props;
  let { plugins = [] } = $$props;
  let { updateMode = void 0 } = $$props;
  let { chart = null } = $$props;
  let canvasRef;
  let props = clean($$props);
  onDestroy(() => {
    if (chart)
      chart.destroy();
    chart = null;
  });
  useForwardEvents();
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.updateMode === void 0 && $$bindings.updateMode && updateMode !== void 0)
    $$bindings.updateMode(updateMode);
  if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0)
    $$bindings.chart(chart);
  return `<canvas${spread([escape_object(props)], {})}${add_attribute("this", canvasRef, 0)}></canvas>`;
});
const Line = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chart$1.register(LineController);
  let { chart = null } = $$props;
  let props;
  let baseChartRef;
  useForwardEvents();
  if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0)
    $$bindings.chart(chart);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    props = $$props;
    $$rendered = `${validate_component(Chart, "Chart").$$render(
      $$result,
      Object.assign({}, { type: "line" }, props, { this: baseChartRef }, { chart }),
      {
        this: ($$value) => {
          baseChartRef = $$value;
          $$settled = false;
        },
        chart: ($$value) => {
          chart = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Bar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chart$1.register(BarController);
  let { chart = null } = $$props;
  let props;
  let baseChartRef;
  useForwardEvents();
  if ($$props.chart === void 0 && $$bindings.chart && chart !== void 0)
    $$bindings.chart(chart);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    props = $$props;
    $$rendered = `${validate_component(Chart, "Chart").$$render(
      $$result,
      Object.assign({}, { type: "bar" }, props, { this: baseChartRef }, { chart }),
      {
        this: ($$value) => {
          baseChartRef = $$value;
          $$settled = false;
        },
        chart: ($$value) => {
          chart = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const css$6 = {
  code: ".completed.svelte-1nsb686{width:30%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.inProgress.svelte-1nsb686{width:30%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-around}.result.svelte-1nsb686{width:100%;font-size:0.8vmax;text-align:center}.graphic1.svelte-1nsb686{width:100%;height:80%;display:flex;justify-content:center;font-size:0.8vmax}",
  map: null
};
const MiddleRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let monthCompleted = 0;
  let allMonthCompleted = 0;
  function getMonthCompleted() {
    fetch(config.getHost() + "/api/stats/get_completed_month_user", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then((response) => response.json()).then((data) => {
      monthCompleted = data.length;
      console.log(monthCompleted);
      console.log();
      datas2.datasets[0].data[0] = monthCompleted;
    });
    fetch(config.getHost() + "/api/stats/get_completed_month", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then((response) => response.json()).then((data) => {
      allMonthCompleted = data.length;
      console.log(allMonthCompleted);
      console.log();
      datas2.datasets[0].data[1] = allMonthCompleted;
    });
  }
  let allCompletedWeek = -1;
  let userCompletedWeek = -1;
  fetch(config.getHost() + "/api/stats/get_completed_week", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    allCompletedWeek = data.length;
    datas.datasets[0].data[1] = allCompletedWeek;
    console.log("allWeek:" + allCompletedWeek);
  });
  fetch(config.getHost() + "/api/stats/get_completed_week_user", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    userCompletedWeek = data.length;
    datas.datasets[0].data[0] = userCompletedWeek;
    console.log("userWeek:" + userCompletedWeek);
  });
  getMonthCompleted();
  Chart$1.register(BarElement);
  var datas = {
    labels: ["Tu", "Sezione"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["rgba(0, 197, 7)", "rgba(187, 30, 22)"],
        borderWidth: 2,
        borderColor: ["rgba(0, 197, 7)", "rgba(187, 30, 22)"]
      }
    ]
  };
  var datas2 = {
    labels: ["Tu", "Sezione"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["rgba(0, 197, 7)", "rgba(187, 30, 22)"],
        borderWidth: 2,
        borderColor: ["rgba(0, 197, 7)", "rgba(187, 30, 22)"]
      }
    ]
  };
  var options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        ticks: { beginAtZero: true, stepSize: 1 }
      }
    }
  };
  $$result.css.add(css$6);
  return `<div class="completed svelte-1nsb686"><div class="result svelte-1nsb686">Completati</div>
    <div style="font-size: 0.6vmax;">Questa settimana</div>
    <div class="graphic1 svelte-1nsb686">${validate_component(Bar, "Bar").$$render($$result, { data: datas, options }, {}, {})}</div></div>

<div class="inProgress svelte-1nsb686"><div class="result svelte-1nsb686">Completati</div>
    <div style="font-size: 0.6vmax;">Questo mese</div>
    <div class="graphic1 svelte-1nsb686">${validate_component(Bar, "Bar").$$render($$result, { data: datas2, options }, {}, {})}</div>
</div>`;
});
const css$5 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-xanzvu{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}#leftTab.svelte-xanzvu{width:50%;height:90%;float:left;display:flex;align-items:center;justify-content:center}#chatPreview.svelte-xanzvu{width:90%;height:95%;background-color:#ffffff;border-radius:15px;display:flex;align-items:center;justify-content:start;flex-direction:column}.divTop.svelte-xanzvu{width:100%;height:33.5%;display:flex;flex-direction:row;align-items:center;justify-content:space-evenly}.divTopLeft.svelte-xanzvu{width:35%;height:90%;display:flex;flex-direction:column;align-items:center;justify-content:space-between}.titleTopLeft.svelte-xanzvu{width:100%;height:15%;display:flex;align-items:center;justify-content:left;font-size:1vmax}.infoTopLeft.svelte-xanzvu{width:100%;height:85%;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;background-color:#e3e3e3;border-radius:4px;padding:8px;font-size:1.5vh}.divTopRight.svelte-xanzvu{width:45%;height:90%;display:flex;flex-direction:column}.titleTopRightWeek.svelte-xanzvu{width:100%;height:15%;display:flex;align-items:center;justify-content:left;font-size:1vmax}.dataWeek.svelte-xanzvu{width:100%;height:35%;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.titleTopRightMonth.svelte-xanzvu{width:100%;height:15%;display:flex;align-items:center;justify-content:left;font-size:1.8vh;font-size:0.9vw}.dataMonth.svelte-xanzvu{width:100%;height:35%;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.divMiddle.svelte-xanzvu{width:100%;height:33.5%;display:flex;flex-direction:row;justify-content:space-evenly}.divMiddleLeft.svelte-xanzvu{width:35%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between}.titleMiddleLeft.svelte-xanzvu{width:100%;height:15%;display:flex;align-items:center;justify-content:left;font-size:1vmax}.infoMiddleLeft.svelte-xanzvu{width:100%;height:85%;display:flex;flex-direction:column;background-color:#e3e3e3;border-radius:4px}.divMiddleRight.svelte-xanzvu{width:45%;height:100%;display:flex;align-items:center;flex-direction:column}.infoMiddleRight.svelte-xanzvu{width:100%;height:85%;display:flex;flex-direction:row;align-items:center;justify-content:space-around;background-color:#e3e3e3;border-radius:4px}.titleMiddleRight.svelte-xanzvu{width:100%;height:15%;display:flex;align-items:center;justify-content:left;font-size:1vmax}.divBottom.svelte-xanzvu{width:100%;height:33.5%;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly}.titleBottom.svelte-xanzvu{width:40%;height:15%;display:flex;align-items:center;font-size:0.9vmax}.divGraphic.svelte-xanzvu{width:90%;height:85%}@media(max-width: 1100px){#leftTab.svelte-xanzvu{width:100%;height:400vh;float:left;display:flex;align-items:center;justify-content:center}#chatPreview.svelte-xanzvu{width:95%;height:95%;background-color:#ffffff;border-radius:15px;display:flex;align-items:center;justify-content:start;flex-direction:column}}",
  map: null
};
const LeftTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chart$1.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
  var datas = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    datasets: [
      {
        label: "Bozze completate",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,1 58)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };
  fetch(config.getHost() + "/api/stats/get_completed_year", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    data.length;
    data.forEach((el) => {
      datas.datasets[0].data[el.month - 1] += 1;
    });
    console.log(datas.datasets[0].data);
  });
  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { beginAtZero: true, stepSize: 1 }
      }
    }
  };
  $$result.css.add(css$5);
  return `<div id="leftTab" class="svelte-xanzvu"><div id="chatPreview" class="svelte-xanzvu"><div class="divTop svelte-xanzvu"><div class="divTopLeft svelte-xanzvu"><div class="titleTopLeft svelte-xanzvu">Ultimo documento aperto</div>
                <div class="infoTopLeft svelte-xanzvu">${validate_component(TopLeft, "TopLeft").$$render($$result, {}, {}, {})}</div></div>
            <div class="divTopRight svelte-xanzvu"><div class="titleTopRightWeek svelte-xanzvu">Questa settimana</div>
                <div class="dataWeek svelte-xanzvu">${validate_component(TopRightWeek, "TopRightWeek").$$render($$result, {}, {}, {})}</div>
                <div class="titleTopRightMonth svelte-xanzvu">Questo mese</div>
                <div class="dataMonth svelte-xanzvu">${validate_component(TopRightMonth, "TopRightMonth").$$render($$result, {}, {}, {})}</div></div></div>

        <div class="divMiddle svelte-xanzvu"><div class="divMiddleLeft svelte-xanzvu"><div class="titleMiddleLeft svelte-xanzvu">La tua sezione - Questo mese</div>
                <div class="infoMiddleLeft svelte-xanzvu">${validate_component(MiddleLeft, "MiddleLeft").$$render($$result, {}, {}, {})}</div></div>
            <div class="divMiddleRight svelte-xanzvu"><div class="titleMiddleRight svelte-xanzvu">Le tue performance personali</div>
                <div class="infoMiddleRight svelte-xanzvu">${validate_component(MiddleRight, "MiddleRight").$$render($$result, {}, {}, {})}</div></div></div>

        <div class="divBottom svelte-xanzvu"><div class="titleBottom svelte-xanzvu">Andamento della sezione - mensile</div>
            <div class="divGraphic svelte-xanzvu">${validate_component(Line, "Line").$$render($$result, { data: datas, options }, {}, {})}</div></div></div>
</div>`;
});
const css$4 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-1fqec06.svelte-1fqec06{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.title.svelte-1fqec06.svelte-1fqec06{font-size:1.8vh;font-weight:bold}.top.svelte-1fqec06.svelte-1fqec06{width:100%;height:20%;display:flex;align-items:center;justify-content:space-between;padding-left:15px}.bottom.svelte-1fqec06.svelte-1fqec06{width:100%;height:30%;display:flex;align-items:center;justify-content:space-between;padding-left:15px}.endTime.svelte-1fqec06.svelte-1fqec06{font-size:1.5vh;width:90%;height:100%;display:flex}#endTimeIcon.svelte-1fqec06.svelte-1fqec06{width:10%;height:100%;display:flex;align-items:center;justify-content:center}#endTimeIcon.svelte-1fqec06>svg.svelte-1fqec06{width:100%;height:100%}#endTimeDate.svelte-1fqec06.svelte-1fqec06{width:80%;height:100%;font-weight:bold;text-align:center;line-height:22px;font-size:1.5vh;display:flex;align-items:center;justify-content:space-evenly}#date.svelte-1fqec06.svelte-1fqec06{width:100%;height:50%;display:flex;align-items:center;justify-content:center}.middle.svelte-1fqec06.svelte-1fqec06{width:100%;height:70%;display:flex;align-items:center;justify-content:center}.middleNote.svelte-1fqec06.svelte-1fqec06{width:85%;height:100%}",
  map: null
};
const MemoCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { date = "" } = $$props;
  let { time = "" } = $$props;
  let { note = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.time === void 0 && $$bindings.time && time !== void 0)
    $$bindings.time(time);
  if ($$props.note === void 0 && $$bindings.note && note !== void 0)
    $$bindings.note(note);
  $$result.css.add(css$4);
  return `<div class="cardContainer svelte-1fqec06"><div class="top svelte-1fqec06"><div class="title svelte-1fqec06">${escape(title)}</div></div>

    <div class="middle svelte-1fqec06"><div class="middleNote svelte-1fqec06">${escape(note)}</div></div>
    
    <div class="bottom svelte-1fqec06"><div class="endTime svelte-1fqec06"><div id="endTimeIcon" class="svelte-1fqec06"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-1fqec06"><path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="black" class="svelte-1fqec06"></path><path d="M13 7H11V12.414L14.293 15.707L15.707 14.293L13 11.586V7Z" fill="black" class="svelte-1fqec06"></path></svg></div>
            <div id="endTimeDate" class="svelte-1fqec06"><div id="date" class="svelte-1fqec06">${escape(date)}</div>
                <div id="hour" class="svelte-1fqec06">${escape(time)}</div></div></div></div>
    
</div>`;
});
const css$3 = {
  code: ".currentTime.svelte-1ng582x{width:100%;height:60%;display:flex;align-items:center;justify-content:center;font-weight:bolder;font-size:large}.buttonHours.svelte-1ng582x{width:100%;height:40%;display:flex;flex-direction:row;align-items:center;justify-content:center}#Hour.svelte-1ng582x{width:50%;height:100%}#Minute.svelte-1ng582x{width:50%;height:100%}select.svelte-1ng582x{text-align:center}",
  map: null
};
const CardHours = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  document.querySelectorAll("select");
  let optionsHour = [];
  let optionsMinute = [];
  let currentTime = /* @__PURE__ */ new Date();
  let selectedOptionHour = currentTime.getHours();
  let selectedOptionMinute = currentTime.getMinutes();
  for (let i = 0; i <= 23; i++) {
    i = i < 10 ? "0" + i : i;
    optionsHour.push(`<option value="${i}">${i}</option>`);
  }
  for (let i = 0; i <= 59; i++) {
    i = i < 10 ? "0" + i : i;
    optionsMinute.push(`<option value="${i}">${i}</option>`);
  }
  $$result.css.add(css$3);
  return `<div class="currentTime svelte-1ng582x">${escape(selectedOptionHour)}:${escape(selectedOptionMinute)}</div>
<div class="buttonHours svelte-1ng582x"><select name="Hour" id="Hour" value="Ora" class="svelte-1ng582x"><option value="Ora" selected hidden>Ora</option><!-- HTML_TAG_START -->${optionsHour.join("")}<!-- HTML_TAG_END --></select>
    <select name="Minute" id="Minute" value="Minuto" class="svelte-1ng582x"><option value="Minuto" selected hidden>Minuto</option><!-- HTML_TAG_START -->${optionsMinute.join("")}<!-- HTML_TAG_END --></select>
</div>`;
});
const css$2 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-11c1f3q.svelte-11c1f3q{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}#newPromemoria{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:30vw;height:30vw;background-color:rgb(23, 31, 52);border-radius:20px;z-index:1000;display:none;align-items:center;justify-content:center;flex-direction:column;text-align:center}.windowMemocard{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:30vw;height:30vw;background-color:#e3e3e3;border-radius:20px;z-index:1000;display:none;align-items:center;justify-content:center;flex-direction:column;text-align:center}#titleTextArea.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:100%;border:none;outline:none;resize:none}.Title.svelte-11c1f3q.svelte-11c1f3q{width:100%;display:flex;align-items:start;background-color:white;border-left:3px solid rgb(23, 31, 52);border-right:3px solid rgb(23, 31, 52)}.Note.svelte-11c1f3q.svelte-11c1f3q{width:100%;display:flex;align-items:start;background-color:white;border-left:3px solid rgb(23, 31, 52);border-right:3px solid rgb(23, 31, 52)}.divTextAreaTitle.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:10%;display:flex;align-items:center;justify-content:center;border-left:3px solid rgb(23, 31, 52);border-right:3px solid rgb(23, 31, 52);border-bottom:1px solid rgb(23, 31, 52)}.divTextAreaNote.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:81%;display:flex;align-items:center;justify-content:center;border-radius:0 0 20px 20px;border-left:3px solid rgb(23, 31, 52);border-right:3px solid rgb(23, 31, 52);border-bottom:3px solid rgb(23, 31, 52)}#areaText.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:100%;border:none;outline:none;resize:none;border-radius:0 0 20px 20px}#calendar.svelte-11c1f3q.svelte-11c1f3q{width:7vw;height:50%;background-color:#e3e3e3;border-radius:15px;float:left;font-weight:bold;display:flex;align-items:center;justify-content:space-evenly;margin-left:10px;margin-right:10px;cursor:pointer}.hours.svelte-11c1f3q.svelte-11c1f3q{width:4vw;height:50%;background-color:#e3e3e3;border-radius:15px;float:left;font-weight:bold;display:flex;align-items:center;justify-content:space-between;margin-right:10px;cursor:pointer}.datePromemoria.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:10%;display:flex;align-items:center;flex-direction:row;justify-content:space-between\r\n    }#date.svelte-11c1f3q.svelte-11c1f3q{width:70%;text-align:left;font-size:1.3vh}.buttonHours.svelte-11c1f3q.svelte-11c1f3q{width:70%;text-align:center;font-size:1.3vh}#calendarIcon.svelte-11c1f3q.svelte-11c1f3q{width:20%;height:70%;float:left;display:flex;align-items:center;justify-content:center}.hoursIcon.svelte-11c1f3q.svelte-11c1f3q{width:30%;height:70%;float:left;display:flex;align-items:center;justify-content:center}.roleClose.svelte-11c1f3q.svelte-11c1f3q{widows:100%}.containerCalendar.svelte-11c1f3q.svelte-11c1f3q{width:50%;height:20%;position:absolute;translate:1% 40%;display:flex;margin-top:9vh;align-items:center;justify-content:center}.hoursContainer.svelte-11c1f3q.svelte-11c1f3q{width:40%;height:90px;background-color:white;position:absolute;translate:90% 67%;display:flex;flex-direction:column;border-radius:5px;border:1px solid black;z-index:1000}.offDisplay.svelte-11c1f3q.svelte-11c1f3q{display:none}.saveButton.svelte-11c1f3q.svelte-11c1f3q{width:15%;height:50%;background-color:#e3e3e3;border-radius:15px;display:flex;align-items:center;justify-content:center;margin-right:8px;cursor:pointer}.closePromemoria.svelte-11c1f3q.svelte-11c1f3q{width:5%;height:50%;background-color:#e3e3e3;border-radius:5px;display:flex;align-items:center;justify-content:center;margin-right:8px;cursor:pointer}#rightTab.svelte-11c1f3q.svelte-11c1f3q{width:50%;height:90%;float:right;display:flex;align-items:center;justify-content:space-around;flex-direction:column}#topSection.svelte-11c1f3q.svelte-11c1f3q{width:90%;height:45%;display:flex;flex-direction:column;background-color:#ffffff;border-radius:15px;align-items:center}#roleSetup.svelte-11c1f3q.svelte-11c1f3q{width:90%;height:10vh;display:none;flex-direction:column;background-color:#c0c0c0;border-radius:15px;align-items:center;justify-content:space-between;position:relative;bottom:220px;left:20px;overflow:hidden}.role.svelte-11c1f3q.svelte-11c1f3q{width:100%;text-align:center;font-size:1.5vh;padding-top:10px;height:33%;cursor:pointer}.role.svelte-11c1f3q.svelte-11c1f3q:hover{background-color:#e3e3e3}#bottomSection.svelte-11c1f3q.svelte-11c1f3q{width:90%;height:45%;background-color:#ffffff;border-radius:15px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}#organizer.svelte-11c1f3q.svelte-11c1f3q{width:95%;height:95%;display:none;align-items:center;justify-content:center}#left.svelte-11c1f3q.svelte-11c1f3q{width:50%;height:100%}#sectionList.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow-y:scroll}.sectionItemList{width:90%;height:10%;background-color:#e3e3e3;border-radius:15px;margin-top:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:0.5s height ease-in-out}.sectionItemList:hover{width:90%;height:15%;background-color:#c0c0c0;transition:0.5s height ease-in-out}#center.svelte-11c1f3q.svelte-11c1f3q{height:100%;border:1px solid rgb(79, 79, 79)}#right.svelte-11c1f3q.svelte-11c1f3q{width:50%;height:100%}#userList.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow-y:scroll}.userItemList.svelte-11c1f3q.svelte-11c1f3q{width:90%;height:10%;background-color:#e3e3e3;border-radius:15px;margin-top:10px;display:flex;align-items:center;justify-content:center;cursor:pointer}#sectionList.svelte-11c1f3q.svelte-11c1f3q::-webkit-scrollbar{width:8px;background-color:none;border-radius:20px}#userList.svelte-11c1f3q.svelte-11c1f3q::-webkit-scrollbar{width:8px;background-color:none;border-radius:20px}.title.svelte-11c1f3q.svelte-11c1f3q{font-size:3vh;font-weight:bold;padding-top:25px}#memoTitle.svelte-11c1f3q.svelte-11c1f3q{font-size:3vh;font-weight:bold;width:100%;height:8vh;display:flex;align-items:center;justify-content:space-between}.memorandum.svelte-11c1f3q.svelte-11c1f3q{margin-left:25px}.iconNewPromemoria.svelte-11c1f3q.svelte-11c1f3q{width:2vmax;height:100%;margin-right:10px}.iconNewPromemoria.svelte-11c1f3q:hover>svg.svelte-11c1f3q{transform:rotate(180deg)}svg.svelte-11c1f3q.svelte-11c1f3q{transition:0.5s}.separator.svelte-11c1f3q.svelte-11c1f3q{width:2px;height:90%;background-color:#c9c9c9;border-radius:15px;position:absolute;top:50%;left:calc(100% / 3);transform:translate(-50%, -50%)}.separator.right.svelte-11c1f3q.svelte-11c1f3q{left:calc(100% / 3 * 2)}.section.svelte-11c1f3q.svelte-11c1f3q{width:calc(100% / 3);height:95%;border-radius:15px;display:flex;align-items:center;justify-content:center;flex-direction:column}.containerPromemoria.svelte-11c1f3q.svelte-11c1f3q{width:80%;height:100%;align-items:center;justify-content:center;display:flex;flex-wrap:wrap;gap:100px;overflow-y:scroll;margin-top:10px}.cardContainer{height:200px;background-color:#e7e7e7;border-radius:15px;display:flex;flex:0 0 200px;align-items:center;justify-content:space-between;flex-direction:column;overflow:hidden;padding-top:8px}.titleCard{width:100%;height:10%;text-align:start;font-weight:bolder}.containerPromemoria.svelte-11c1f3q.svelte-11c1f3q::-webkit-scrollbar{width:0px;background-color:none}#noRole.svelte-11c1f3q.svelte-11c1f3q{width:100%;height:100%;background-color:#ffffff;display:none;align-items:center;justify-content:center;font-size:2vh;text-align:center}",
  map: null
};
function checkRole() {
  let role = document.getElementById("roleText")?.innerHTML;
  if (role != "Amministratore" && role != "Magistrato") {
    document.getElementById("organizer").style.display = "none";
    document.getElementById("noRole").style.display = "flex";
  } else {
    document.getElementById("organizer").style.display = "flex";
    document.getElementById("noRole").style.display = "none";
  }
}
const RightTab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allMemo = [{}];
  let currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  let currentMonth = (/* @__PURE__ */ new Date()).getMonth();
  new Date(currentYear, currentMonth).getDay();
  (/* @__PURE__ */ new Date()).getDate();
  let currentTime = /* @__PURE__ */ new Date();
  let memoDate;
  let hourDato = currentTime.getHours();
  let minuteDato = currentTime.getMinutes();
  document.getElementById("newPromemoria");
  let containerCalendar = "offDisplay";
  Data.subscribe((value) => {
    memoDate = value;
  });
  Hour.subscribe((value) => {
    hourDato = value;
  });
  Minute.subscribe((value) => {
    minuteDato = value;
  });
  let hoursContainer = "offDisplay";
  fetch(config.getHost() + "/api/memo/get", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      allMemo.push({
        title: data[i].title,
        note: data[i].note,
        time: data[i].time,
        date: data[i].date
      });
    }
    allMemo = [...allMemo];
    console.log(allMemo);
  });
  let sections = [];
  function getSections() {
    fetch(config.getHost() + "/api/get_all_sections", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then((response) => response.json()).then((data) => {
      document.getElementById("sectionList").innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        sections.push(data[i]);
      }
      for (let i = 0; i < sections.length; i++) {
        let list = document.getElementById("sectionList");
        let item = document.createElement("div");
        item.classList.add("sectionItemList");
        item.innerHTML = sections[i]["sezione"];
        item.addEventListener("click", () => {
          getUsersForSection(sections[i]["sezione"]);
        });
        list.appendChild(item);
      }
    });
  }
  getSections();
  let users = [];
  function getUsersForSection(section) {
    console.log("GetUSERS");
    fetch(config.getHost() + "/api/get_all_users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "sezione": section })
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      users = [];
      for (let i = 0; i < data.length; i++) {
        +console.log(data[i]["name"]);
        users.push({
          "name": data[i]["name"],
          "role": data[i]["ruolo"],
          "mail": data[i]["email"]
        });
      }
      users = [...users];
    }).catch((error) => console.log(error));
  }
  setTimeout(
    () => {
      checkRole();
    },
    2e3
  );
  $$result.css.add(css$2);
  return `<div id="rightTab" class="svelte-11c1f3q"><div id="newPromemoria" class="svelte-11c1f3q"><div class="datePromemoria svelte-11c1f3q"><div id="calendar" class="svelte-11c1f3q"><div id="calendarIcon" class="svelte-11c1f3q"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-11c1f3q"><path d="M21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20ZM9 18H7V16H9V18ZM9 14H7V12H9V14ZM13 18H11V16H13V18ZM13 14H11V12H13V14ZM17 18H15V16H17V18ZM17 14H15V12H17V14ZM19 9H5V7H19V9Z" fill="black" class="svelte-11c1f3q"></path></svg></div>
                <div id="date" class="svelte-11c1f3q">${escape(memoDate)}</div></div>

            <div class="${escape(null_to_empty(containerCalendar), true) + " svelte-11c1f3q"}">${validate_component(CardCalendar, "CardCalendar").$$render($$result, {}, {}, {})}</div>

            <div class="hours svelte-11c1f3q"><div class="hoursIcon svelte-11c1f3q"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" class="svelte-11c1f3q"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.293 14.707L11 12.414V6h2v5.586l3.707 3.707-1.414 1.414z" class="svelte-11c1f3q"></path></svg></div>

                <div class="buttonHours svelte-11c1f3q">${escape(hourDato)}:${escape(minuteDato)}</div></div>
            <div class="${escape(null_to_empty(hoursContainer), true) + " svelte-11c1f3q"}">${validate_component(CardHours, "CardHours").$$render($$result, {}, {}, {})}</div>
            <div class="saveButton svelte-11c1f3q">Salva</div>
            <div class="closePromemoria svelte-11c1f3q">X</div></div>

        <div class="Title svelte-11c1f3q"><label for="titleTextArea" class="svelte-11c1f3q">Titolo</label></div>
        <div class="divTextAreaTitle svelte-11c1f3q"><textarea id="titleTextArea" class="svelte-11c1f3q"></textarea></div>
        
        <div class="Note svelte-11c1f3q"><label for="areaText" class="svelte-11c1f3q">Nota</label></div>
        <div class="divTextAreaNote svelte-11c1f3q"><textarea name="areaText" id="areaText" class="svelte-11c1f3q"></textarea></div></div>

    <div class="windowMemocard svelte-11c1f3q">ciao</div>


    <div id="topSection" class="svelte-11c1f3q"><div id="memoTitle" class="svelte-11c1f3q"><div class="memorandum svelte-11c1f3q">Promemoria</div>
            <div class="iconNewPromemoria svelte-11c1f3q"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" class="svelte-11c1f3q"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" class="svelte-11c1f3q"></path></svg></div></div>
        <div class="containerPromemoria svelte-11c1f3q">${each(allMemo, (memo) => {
    return `${memo.title != void 0 && memo.title != "" ? `${validate_component(MemoCard, "MemoCard").$$render(
      $$result,
      {
        title: memo.title,
        note: memo.note,
        time: memo.time,
        date: memo.date
      },
      {},
      {}
    )}` : ``}`;
  })}</div></div>

    


    <div id="bottomSection" class="svelte-11c1f3q"><div id="roleClose" class="svelte-11c1f3q"></div>
        <div id="organizer" class="svelte-11c1f3q"><div id="left" class="svelte-11c1f3q"><div id="sectionList" class="svelte-11c1f3q"></div></div>
            <div id="center" class="svelte-11c1f3q"></div>
            <div id="right" class="svelte-11c1f3q"><div id="userList" class="svelte-11c1f3q">${each(users, (user) => {
    return `<div class="userItemList svelte-11c1f3q">${escape(user["name"])} - ${escape(user["role"])}</div>`;
  })}</div>
                <div id="roleSetup" class="svelte-11c1f3q"><div class="role svelte-11c1f3q">Amministratore</div>
                    <div class="role svelte-11c1f3q">Magistrato</div>
                    <div class="role svelte-11c1f3q">Addetto UPP</div></div></div></div>
        <div id="noRole" class="svelte-11c1f3q"></div>
        </div>
</div>`;
});
const css$1 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-msb34q{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}#dashboardContainer.svelte-msb34q{width:100%;height:100%;background-color:rgba(188, 197, 240, 0.5)}@media(max-width: 1100px){#dashboardContainer.svelte-msb34q{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(188, 197, 240, 0.5);overflow-y:scroll}}",
  map: null
};
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div id="dashboardContainer" class="svelte-msb34q">${validate_component(TopTab, "TopTab").$$render($$result, {}, {}, {})}
    ${validate_component(LeftTab, "LeftTab").$$render($$result, {}, {}, {})}
    ${validate_component(RightTab, "RightTab").$$render($$result, {}, {}, {})}
</div>`;
});
const HomePage_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.homePage{width:100vw;height:100vh;display:flex}",
  map: null
};
const HomePage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(HomePage, "HomePage").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
