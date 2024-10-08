<script>
    import Card from "./components/Card.svelte";
    import MemoCard from "./components/MemoCard.svelte";
    import CardCalendar from "./components/CardCalendar.svelte";
    import CardHours from "./components/CardHours.svelte";
    import { Data, myWords } from "../../services/stores";
    import { Hour} from "../../services/stores";
    import { Minute } from "../../services/stores";
    import { onMount } from "svelte";
    import config from "../../services/config";
    import user from "../../services/user";
   
    let allMemo = [{}];
    let currentYear= new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let week=["Dom","Lun","Mar", "Mer", "Gio", "Ven", "Sab"];
    let months=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
    let currentDay=new Date(currentYear,currentMonth).getDay();
    let currentDate=new Date().getDate();
    let currentTime=new Date();
    let memoDate;
    let hourDato=currentTime.getHours();
    let minuteDato=currentTime.getMinutes();
    let selectedOptionHour="";
    let selectedOptionMinute="";

    //display div newPromemoria
    let div=document.getElementById("newPromemoria");
    let displayStyle=false;
    function open(){
        hourDato=currentTime.getHours();
        minuteDato=currentTime.getMinutes();
        let month=months[currentMonth];
        memoDate=currentDate+" "+month+" "+currentYear;
        let div=document.getElementById("newPromemoria");
        if(displayStyle==false){
            displayStyle=true;
            div.style.display="flex";
        }
        else{
            displayStyle=false;
            div.style.display="none";
        }
    }

    //display calendario
    let containerCalendar="offDisplay";
    let Button=false;

    function calendarButton(){
        Button=!Button;
        displayButton();
    }
    function displayButton(){
        if(Button){
            containerCalendar="containerCalendar";
            ButtonHours=false;
            hoursContainer="offDisplay";
        }
        else containerCalendar="offDisplay";
        
    }

    //icona calendario
    Data.subscribe(value => {
        memoDate = value;
    });

    Hour.subscribe(value => {
        hourDato = value;
    });

    Minute.subscribe(value => {
        minuteDato = value;
    });

    //display hoursContainer
    let hoursContainer="offDisplay";
    let ButtonHours=false;

    function hoursButton(){
        ButtonHours=!ButtonHours;
        displayButtonHours();
    }
    function displayButtonHours(){
        if(ButtonHours){
            hoursContainer="hoursContainer";
            Button=false;
            containerCalendar="offDisplay";
        }
        else hoursContainer="offDisplay";
    }

    //add promemoria saved 
    function savePromemoria(){
        Button=false;
        ButtonHours=false;
        containerCalendar="offDisplay";
        hoursContainer="offDisplay";
        allMemo.push({
            title: document.getElementById("titleTextArea").value,
            note: document.getElementById("areaText").value,
            time: hourDato.toString() + ":" + minuteDato.toString(),
            date: (memoDate.toString()).replaceAll(' ', '-').replace('Gen', '01').replace('Feb', '02').replace('Mar', '03').replace('Apr', '04').replace('Mag', '05').replace('Giu', '06').replace('Lug', '07').replace('Ago', '08').replace('Set', '09').replace('Ott', '10').replace('Nov', '11').replace('Dic', '12')
        });

        allMemo = [...allMemo];
        
        fetch(config.getHost()+"/api/memo/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    title: document.getElementById("titleTextArea").value,
                    note: document.getElementById("areaText").value,
                    time: hourDato.toString() + ":" + minuteDato.toString(),
                    date: (memoDate.toString()).replaceAll(' ', '-').replace('Gen', '01').replace('Feb', '02').replace('Mar', '03').replace('Apr', '04').replace('Mag', '05').replace('Giu', '06').replace('Lug', '07').replace('Ago', '08').replace('Set', '09').replace('Ott', '10').replace('Nov', '11').replace('Dic', '12')
                })
            })
            .then(response => response.json())
            .catch(error => console.log(error));

            document.getElementById("titleTextArea").value="";
            document.getElementById("areaText").value="";
        
        open();
    }

    function closePromemoria(){
        open();
    }

    fetch(config.getHost()+"/api/memo/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
        .then(data => {
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
        })

        let sections = [];
        function getSections(){
            fetch(config.getHost()+"/api/get_all_sections", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("sectionList").innerHTML = "";
                for (let i = 0; i < data.length; i++) {
                    sections.push(data[i]);
                }
                // sections = [...sections];
                for (let i = 0; i < sections.length; i++) {
                let list = document.getElementById("sectionList");

                let item = document.createElement("div");
                item.classList.add("sectionItemList");
                item.innerHTML = sections[i]["sezione"];
                item.addEventListener("click", () => { getUsersForSection(sections[i]["sezione"]) });
                list.appendChild(item);
            }

            })

            

        }

        getSections();


        let users = [];
    function getUsersForSection(section){
        console.log("GetUSERS");
    
    
        fetch(config.getHost()+"/api/get_all_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "sezione": section
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            users = [];
            for (let i = 0; i < data.length; i++) {+
                console.log(data[i]["name"]);
                users.push({ "name": data[i]["name"],
                                "role": data[i]["ruolo"],
                                "mail": data[i]["email"] });
            }
            users = [...users];
        }).catch(error => console.log(error));

        



        actualSection = section;
    }
    let actualSection;
    function setRole(role){
        console.log(actualMail)
        document.getElementById("roleSetup").style.display = "none";
        fetch(config.getHost()+"/api/set_user_role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                "user": actualMail,
                "ruolo": role
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(error => console.log(error));

        actualMail = "";
        users = [];
        setTimeout(() => {
            getUsersForSection(actualSection);
        }, 500)

    }

    function roleClose(){
        document.getElementById("roleSetup").style.display = "none";
    }
    let actualMail;

    function checkRole(){
        let role = document.getElementById("roleText")?.innerHTML;
        if (role != 'Amministratore' && role != 'Magistrato') {
            document.getElementById("organizer").style.display = "none";
            document.getElementById("noRole").style.display = "flex";
        }else {
            document.getElementById("organizer").style.display = "flex";
            document.getElementById("noRole").style.display = "none";
        }
    }
   

    setTimeout(() => {
        checkRole();
    }, 2000);
</script>

<div id="rightTab">
    <div id="newPromemoria">
        <div class="datePromemoria">
            <div id="calendar" on:click={calendarButton}>
                <div id="calendarIcon">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20ZM9 18H7V16H9V18ZM9 14H7V12H9V14ZM13 18H11V16H13V18ZM13 14H11V12H13V14ZM17 18H15V16H17V18ZM17 14H15V12H17V14ZM19 9H5V7H19V9Z" fill="black"/>
                        </svg>
                        
                </div>
                <div id="date">{memoDate}</div>
            </div>

            <div class={containerCalendar}>
                <CardCalendar/>
            </div>

            <div class="hours"  on:click={hoursButton}>
                <div class="hoursIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3.293 14.707L11 12.414V6h2v5.586l3.707 3.707-1.414 1.414z"></path></svg>
                </div>

                <div class="buttonHours">{hourDato}:{minuteDato}</div>
            </div>
            <div class={hoursContainer}>
                <CardHours/>
            </div>
            <div class="saveButton" on:click={savePromemoria}>Salva</div>
            <div class="closePromemoria" on:click={closePromemoria}>X</div>
        </div>

        <div class="Title">
            <label for="titleTextArea">Titolo</label>
        </div>
        <div class="divTextAreaTitle">
            <textarea  id="titleTextArea"></textarea>
        </div>
        
        <div class="Note">
            <label for="areaText">Nota</label>
        </div>
        <div class="divTextAreaNote">
            <textarea name="areaText" id="areaText"></textarea>
        </div>
    </div>

    <div class="windowMemocard">ciao</div>


    <div id="topSection">
        <div id="memoTitle">
            <div class="memorandum">Promemoria</div>
            <div class="iconNewPromemoria" on:click={open}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
            </div>
        </div>
        <div class="containerPromemoria">
            {#each allMemo as memo}
                {#if memo.title != undefined && memo.title != ""}
                    <MemoCard title={memo.title} note={memo.note} time={memo.time} date={memo.date}/>
                {/if}
            {/each}
        </div>
    </div>

    


    <div id="bottomSection">
        <div id = "roleClose" on:click={roleClose}></div>
        <div id = "organizer">
            <div id = "left">
                <div id = "sectionList">
                    <!-- {#each sections as section}
                    <div class = "sectionItemList" on:click={() => { getUsersForSection()}}>{section["sezione"]}</div>
                    {/each} -->
                </div>
            </div>
            <div id = "center">

            </div>
            <div id = "right">
                <div id = "userList">
                    {#each users as user}
                    <div class = "userItemList" on:click={() => { document.getElementById("roleSetup").style.display = "flex"; actualMail = user["mail"] }}>{user["name"]} - {user["role"]}</div>
                    {/each}
                </div>
                <div id = "roleSetup">
                    <div class = "role" on:click={() => { setRole("Amministratore"); }}>Amministratore</div>
                    <div class = "role" on:click={() => { setRole("Magistrato"); }}>Magistrato</div>
                    <div class = "role" on:click={() => { setRole("Addetto UPP"); }}>Addetto UPP</div>
                </div>
            </div>
        </div>
        <div id = "noRole"></div>
        <!-- Non hai i permessi per modificare i ruoli. Questa sezione rimarrà vuota. -->
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
    :global(#newPromemoria){
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30vw;
        height: 30vw;
        background-color: rgb(23, 31, 52);
        border-radius: 20px;
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }

    :global(.windowMemocard){
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30vw;
        height: 30vw;
        background-color: #e3e3e3;
        border-radius: 20px;
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }

    #titleTextArea{
        width:100%;
        height: 100%;
        border:none;
        outline: none;
        resize: none;
    }

    .Title{
        width:100%;
        
        display: flex;
        align-items: start;
        background-color: white;
        border-left: 3px solid rgb(23, 31, 52);
        border-right: 3px solid rgb(23, 31, 52);
    }

    .Note{
        width:100%;
        
        display: flex;
        align-items: start;
        background-color: white;
        border-left: 3px solid rgb(23, 31, 52);
        border-right: 3px solid rgb(23, 31, 52);
    }

    .divTextAreaTitle{
        width:100%;
        height: 10%;

        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 3px solid rgb(23, 31, 52);
        border-right: 3px solid rgb(23, 31, 52);
        border-bottom: 1px solid rgb(23, 31, 52);
    }

    .divTextAreaNote{
        width:100%;
        height: 81%;

        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 0 20px 20px;
        
        border-left: 3px solid rgb(23, 31, 52);
        border-right: 3px solid rgb(23, 31, 52);
        border-bottom: 3px solid rgb(23, 31, 52);
    }

    #areaText{
        width:100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        border-radius: 0 0 20px 20px;
    }

    #calendar{
        width: 7vw;
        /* min-width: 150px; */
        height: 50%;
        background-color: #e3e3e3;
        border-radius: 15px;
        float: left;
        
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    .hours{
        width: 4vw;
        /* min-width: 150px; */
        height: 50%;
        background-color: #e3e3e3;
        border-radius: 15px;
        float: left;
        
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* margin-left: 10px; */
        margin-right: 10px;
        cursor: pointer;
    }

    .datePromemoria{
        width: 100%;
        height: 10%;

        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between
    }

    #date{
        width:70%;
        text-align: left;
        font-size: 1.3vh;
    }

    .buttonHours{
        width:70%;
        text-align: center;
        font-size: 1.3vh;
    }

    #calendarIcon{
        width: 20%;
        height: 70%;
        float: left;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hoursIcon{
        width: 30%;
        height: 70%;
        float: left;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .roleClose {
        widows: 100%;
    }

    .containerCalendar{
        width: 50%;
        height: 20%;
        position: absolute;
        translate: 1% 40%;
        display:flex;
        margin-top: 9vh;
        align-items: center;
        justify-content: center;
    }

    .hoursContainer {
        width: 40%;
        height: 90px;
        background-color: white;
        position: absolute;
        translate: 90% 67%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        border:1px solid black;
        z-index: 1000;
    }
    .offDisplay{
        
        display: none;
    }

    .saveButton{
        width:15%;
        height:50%;
        background-color: #e3e3e3;
        border-radius: 15px;

        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        cursor: pointer;
    }

    .closePromemoria{
        width:5%;
        height:50%;
        background-color: #e3e3e3;
        border-radius: 5px;

        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        cursor: pointer;
    }


    #rightTab{
        width: 50%;
        height: 90%;

        float: right;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
    }

    #topSection{
        width: 90%;
        height: 45%;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        border-radius: 15px;
        
        align-items: center;
    }

    #roleSetup{
        width: 90%;
        height: 10vh;
        display: none;
        flex-direction: column;
        background-color: #c0c0c0;
        border-radius: 15px;
        
        align-items: center;
        justify-content: space-between;
        position: relative;
        bottom: 220px;
        left: 20px;
        overflow: hidden;
    }

    .role{
        width: 100%;
        text-align: center;
        font-size: 1.5vh;
        padding-top: 10px;
        height: 33%;
        cursor: pointer;
    }

    .role:hover{
        background-color: #e3e3e3;
    }

    #bottomSection{
        width: 90%;
        height: 45%;
        background-color: #ffffff;
        border-radius: 15px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    #organizer{
        width: 95%;
        height: 95%;
        display: none;
        align-items: center;
        justify-content: center;
    }

    #left{
        width: 50%;
        height: 100%;
        
    }

    #sectionList{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: scroll;
    }

    :global(.sectionItemList){
        width: 90%;
        height: 10%;
        background-color: #e3e3e3;
        border-radius: 15px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.5s height ease-in-out;
    }

    :global(.sectionItemList:hover){
        width: 90%;
        height: 15%;
        background-color: #c0c0c0;
        transition: 0.5s height ease-in-out;
    }
    
    #center{
        height: 100%;
        border: 1px solid rgb(79, 79, 79);
    }

    #right{
        width: 50%;
        height: 100%;
        
    }
    #userList{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: scroll;
    }

    .userItemList{
        width: 90%;
        height: 10%;
        background-color: #e3e3e3;
        border-radius: 15px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
    }

    #sectionList::-webkit-scrollbar {
      width: 8px;
      background-color: none;
      border-radius: 20px;
    }

    #userList::-webkit-scrollbar {
      width: 8px;
      background-color: none;
      border-radius: 20px;
    }

    .title{
        font-size: 3vh;
        font-weight: bold;
        padding-top: 25px;
    }

    #memoTitle{
        font-size: 3vh;
        font-weight: bold;
        /* padding-left: 20px;
        padding-top: 25px; */
        

        width:100%;
        height: 8vh;
        display:flex;
        align-items: center;
        justify-content: space-between;
    }

    .memorandum{
        margin-left:25px;
    }
    
    .iconNewPromemoria{
        width: 2vmax;
        height: 100%;

        margin-right: 10px;
    }

    .iconNewPromemoria:hover>svg{
        transform: rotate(180deg);
    }

    svg{
        transition: 0.5s;
    }

    .separator{
        width: 2px;
        height: 90%;
        background-color: #c9c9c9;
        border-radius: 15px;
        position: absolute;
        top: 50%;
        left: calc(100% / 3);
        transform: translate(-50%, -50%);
    }

    .separator.right{
        left: calc(100% / 3 * 2);
    }

    .section{
        width: calc(100% / 3);
        height: 95%;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .containerPromemoria{
        width: 80%;
        height: 100%;
        align-items: center;
        justify-content: center;
        display:flex;
        flex-wrap: wrap;
        gap:100px;
        overflow-y: scroll;
        margin-top: 10px;
    }

    :global(.cardContainer){
       
        height: 200px;
        background-color: #e7e7e7;
        border-radius: 15px;
        display: flex;
        flex: 0 0 200px;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        overflow: hidden;
        padding-top: 8px;

        /* position: relative;
        left: 50%;
        top: 10px;
        transform: translateX(-50%); */
    }

    :global(.titleCard){
        width: 100%;
        height:10%;

        text-align: start;
        font-weight: bolder;
    }

    .containerPromemoria::-webkit-scrollbar {
      width: 0px;
      background-color: none;
    }

    

    #noRole{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: none;

        align-items: center;
        justify-content: center;
        font-size: 2vh;
        text-align: center;
    }
</style>