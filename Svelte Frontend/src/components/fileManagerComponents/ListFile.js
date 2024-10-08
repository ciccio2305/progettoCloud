import { goto } from "$app/navigation";
import { element } from "svelte/internal";
import { currentChat } from "../../services/stores";
import { currentPath } from "../../services/stores";
import { timestamp } from "../../services/stores";
import { lastPad } from "../../services/stores";
import config from "../../services/config.js";

var father_dir;

export var Path = "";
currentPath.subscribe((value) => {
  Path = value;
});

export var pathPrevious = "";
currentPath.subscribe((value) => {
  pathPrevious = value;
});
export var pathNext = "";

export function openPad(name) {
  let loader = document.getElementById("loader");
  loader.style.display = "flex";
  let filter = document.getElementById("filter");
  filter.style.display = "block";
  console.log("nome del pad:" + name);
  fetch(config.getHost() + "/api/get_pad" + name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let url = data.destination_url;
      console.log(url);
      localStorage.setItem("padSrc", url);
      goto("/etherpadManager");
    })
    .catch((error) => {
      console.log(error);
    });
  let minutes = Date.now();
  console.log("minutes: " + minutes);
  timestamp.set(Date.now());
  lastPad.set(name);
}

export function createFile(nameFile) {
  fetch(config.getHost() + "/api/touch" + Path + "/" + nameFile, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response.text());
    })
    .then(() => {
      ls(Path);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function createDir(nameDir) {
  fetch(config.getHost() + "/api/mkdir" + Path + "/" + nameDir, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response.text());
    })
    .then(() => {
      ls(Path);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function ls(path) {
  var elements = [];
  pathNext = Path;
  currentPath.set(path);
  currentPath.subscribe((value) => {
    Path = value;
  });
  pathPrevious = path.substring(0, path.lastIndexOf("/"));

  console.log("currentPathList" + path);
  console.log("pathPreviousList" + pathPrevious);
  console.log("pathNext:" + pathNext);

  fetch(config.getHost() + "/api/ls" + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
        if (element.type == "PAD") {
          father_dir = element.father_dir;
          console.log("status: " + element.completato);
          var file = new fileElement(element.name, element.type, element.lastModified, element.father_dir, element.completato);
          elements.push(file);
        } else {
          father_dir = element.father_dir;
          var dir = new dirElement(element.name, element.type, element.lastModified, element.father_dir);

          elements.push(dir);
        }
      });
    })
    .then(() => {
      refreshPage(elements, path);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function refreshPage(elements) {
  console.log("REFRESHPAGE");

  setTimeout(() => {
    document.querySelector(".listContainer").innerHTML = "";
    for (let el of elements) {
      if (el.type == "PAD") {
        let file = generateDiv(el.name, el.father_dir, el.status);
        document.querySelector(".listContainer")?.appendChild(file);
      } else {
        let dir = generateDir(el.name, el.father_dir);
        document.querySelector(".listContainer")?.appendChild(dir);
      }
    }
  }, 300);
}

function generateDiv(name, father_dir, completed) {
  console.log("Completed:" + completed);

  let bigDiv = document.createElement("div");
  bigDiv.classList.toggle("bigContainer");
  let icon = document.createElement("i");
  icon.classList.toggle("icon");
  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M18 22a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12zM13 4l5 5h-5V4zM7 8h3v2H7V8zm0 4h10v2H7v-2zm0 4h10v2H7v-2z"></path></svg>';
  bigDiv.appendChild(icon);

  let div = document.createElement("div");
  div.classList.toggle("container");
  let span = document.createElement("span");
  span.innerHTML = name;

  span.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    openPad(father_dir + name);
  });
  div.appendChild(span);

  span = document.createElement("span");
  span.innerHTML = "File di testo";
  div.appendChild(span);

  span = document.createElement("span");
  span.innerHTML = "lastModified";
  div.appendChild(span);

  span = document.createElement("span");
  span.innerHTML = "otherInfo";
  div.appendChild(span);

  span = document.createElement("span");
  let input = document.createElement("input");
  input.type = "checkbox";
  if (completed == true) input.checked = true;
  else input.checked = false;

  let label = document.createElement("label");
  label.classList.toggle("switch");
  label.appendChild(input);

  span = document.createElement("span");
  span.classList.toggle("slider");
  span.classList.toggle("round");
  label.appendChild(span);

  span = document.createElement("span");
  span.appendChild(label);
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    fetch(config.getHost() + "/api/stats/update_status" + father_dir + name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data == "correttamente") console.log("correttamente");
        console.log("fetched");
      });
  });
  div.appendChild(span);

  bigDiv.appendChild(div);

  return bigDiv;
}

function generateDir(name, father_dir) {
  if (!name) return;
  console.log("FATHER: " + father_dir);
  console.log("NAME: " + name);
  console.log("PATHNEXT GENERATEDIR: " + pathNext);
  let bigDiv = document.createElement("div");
  bigDiv.classList.toggle("bigContainer");
  let icon = document.createElement("i");
  icon.classList.toggle("icon");
  icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg>';
  bigDiv.appendChild(icon);

  let div = document.createElement("div");
  div.classList.toggle("container");

  let span = document.createElement("span");
  span.innerHTML = name;
  div.appendChild(span);
  span = document.createElement("span");

  span.innerHTML = "Cartella";
  div.appendChild(span);
  span = document.createElement("span");
  span.innerHTML = "lastModified";
  div.appendChild(span);
  span = document.createElement("span");
  span.innerHTML = "otherInfo";
  div.appendChild(span);
  span = document.createElement("span");
  span.innerHTML = "/";
  div.appendChild(span);

  console.log("before pathPre " + pathPrevious);
  console.log("before current " + Path);
  console.log("before pathNext " + pathNext);
  div.onclick = () => {
    console.log("div.onclick. pathPrevious " + pathPrevious);
    currentPath.set(father_dir + name);
    currentPath.subscribe((value) => {
      Path = value;
    });
    pathPrevious = father_dir;
    pathNext = Path;
    // currentPath.subscribe(value=>{pathNext=value});
    console.log("after pathPrevious " + pathPrevious);
    console.log("after current " + Path);
    console.log("after pathNext " + pathNext);
    ls(Path);
  };

  bigDiv.appendChild(div);
  return bigDiv;
}

class fileElement {
  constructor(name, type, lastModified, father_dir, status) {
    this.name = name;
    this.type = type;
    this.lastModified = lastModified;
    this.father_dir = father_dir;

    this.status = status;
  }
}

class dirElement {
  constructor(name, type, lastModified, father_dir) {
    this.name = name;
    this.type = type;

    this.lastModified = lastModified;
    this.father_dir = father_dir;
  }
}

ls(Path);
