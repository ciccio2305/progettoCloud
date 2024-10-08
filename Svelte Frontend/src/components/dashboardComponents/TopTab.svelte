<script>
    import { construct_svelte_component, onMount } from "svelte/internal";
    import CardCalendar from "./components/CardCalendar.svelte";
    import config from "../../services/config";

    let containerCalendar="offDisplay";
    let Button=false;
    let currentYear= new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let month=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
    let week=["Dom","Lun","Mar", "Mer", "Gio", "Ven", "Sab"];


    let maledettoSalvo = new Date();
    console.log(maledettoSalvo);

    let datearray = maledettoSalvo.toString().split(" ");
    let currentDay=""
    let currentDate=datearray[2];

    switch(datearray[0]){
        case "Mon":
            currentDay="Lun"
            break;
        case "Tue":
            currentDay="Mar"
            break;
        case "Wed":
            currentDay="Mer"
            break;
        case "Thu":
            currentDay="Gio"
            break;
        case "Fri":
            currentDay="Ven"
            break;
        case "Sat":
            currentDay="Sab"
            break;
        case "Sun":
            currentDay="Dom"
            break;
        
        default:
            break;
    }

    
    // let currentDate=new Date().getDate();
    // let currentDay=new Date(currentYear,currentMonth,currentDate).getDay();
    let username = ' '
    let role = ' '
    
    let fileinput;

    function calendarButton(){
        console.log("giorno corrente: "+ currentDay);
        Button=!Button;
        displayButton();
    }
    function displayButton(){
        if(Button){
            containerCalendar="containerCalendar";
        }
        else containerCalendar="offDisplay";
        
    }
    var email;
    
    function init(){
        fetch(config.getHost()+"/api/whoami", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => response.json())
            .then(data => {
                username = data.name
                email = data.email
                role = data.role
                let propic = data.propic
                document.getElementById("picture").style.backgroundImage = "url(" + propic + ")"
            })
            .catch(error => console.log(error));
        }
        init();
    
        const onFileSelected = (e) => {
        

            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
                    
            reader.onload = e => {
                console.log(e.target.result);
                
            
            fetch(config.getHost()+"/api/upload_picture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    file: e.target.result
                })
                
            })
            .then(() => { init(); })
        }
    }
</script>

<div id="topTab">
    <div id="topBar">

        <div id="left">
            <div id="organizerLeft">
                <div id="picture" on:click={fileinput.click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                    <input style="display: none;" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}>
                </div>
                <div id="name">
                    <div id="nameText">{username}</div>
                    <div id="roleText">{role}</div>
                </div>
                <div id="separator"></div>
                <div id="calendar" on:click={calendarButton}> 
                    <div id="calendarIcon">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20ZM9 18H7V16H9V18ZM9 14H7V12H9V14ZM13 18H11V16H13V18ZM13 14H11V12H13V14ZM17 18H15V16H17V18ZM17 14H15V12H17V14ZM19 9H5V7H19V9Z" fill="black"/>
                            </svg>
                            
                    </div>
                    <div id="date">{currentDate} {currentDay}</div>
                </div>
            </div>
            

            <div class={containerCalendar}>
                <CardCalendar/>
            </div>
        </div>

        <div id="mid">
            <div id="searchBar">
                <div id="searchBarIcon">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z" fill="black"/>
                        <path d="M11.412 8.58599C11.791 8.96599 12 9.46799 12 9.99999H14C14.0009 9.47442 13.8976 8.95389 13.6961 8.46848C13.4946 7.98307 13.1989 7.54242 12.826 7.17199C11.312 5.65999 8.68701 5.65999 7.17401 7.17199L8.58601 8.58799C9.34601 7.82999 10.656 7.83199 11.412 8.58599Z" fill="black"/>
                        </svg>
                </div>
                <input type="text" id="searchBarInput" placeholder="Cerca..."/>
            </div>
        </div>

        <div id="right">
            <div id="notificationIcon">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13.586V10C19 6.783 16.815 4.073 13.855 3.258C13.562 2.52 12.846 2 12 2C11.154 2 10.438 2.52 10.145 3.258C7.185 4.074 5 6.783 5 10V13.586L3.293 15.293C3.19996 15.3857 3.12617 15.4959 3.07589 15.6172C3.0256 15.7386 2.99981 15.8687 3 16V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H20C20.2652 19 20.5196 18.8946 20.7071 18.7071C20.8946 18.5196 21 18.2652 21 18V16C21.0002 15.8687 20.9744 15.7386 20.9241 15.6172C20.8738 15.4959 20.8 15.3857 20.707 15.293L19 13.586ZM19 17H5V16.414L6.707 14.707C6.80004 14.6143 6.87383 14.5041 6.92412 14.3828C6.9744 14.2614 7.00019 14.1313 7 14V10C7 7.243 9.243 5 12 5C14.757 5 17 7.243 17 10V14C17 14.266 17.105 14.52 17.293 14.707L19 16.414V17ZM12 22C12.6193 22.0008 13.2235 21.8086 13.7285 21.4502C14.2335 21.0917 14.6143 20.5849 14.818 20H9.182C9.38566 20.5849 9.76648 21.0917 10.2715 21.4502C10.7765 21.8086 11.3807 22.0008 12 22Z" fill="black"/>
                </svg>
                <div id="notificationCounter"></div>
            </div>   
                
        </div>

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

    #topTab{
        width: 100%;
        height: 10%;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #topBar{
        width: 95%;
        height: 70%;
        background-color: #ffffff;
        border-radius: 15px;
        display: flex;
        align-items: center;
    }

    #left{
        width: 60%;
        height: 100%;
        
        border-radius: 15px;
        float: left;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        
        min-width: 700px;
    }

    #picture{
        width: 10%;
        height: 85%;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        /* background-image: url('../../img/blank-profile-picture.png'); */
        background-size: cover;
        background-position: center;
        overflow: hidden;
    }

    #picture:hover{
        cursor: pointer;
    }

    #picture > svg{
        display: none;
        
    }

    #picture:hover > svg{
        background-color: #e3e3e35b;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 50%;
    }

    
    #name{
        width:auto;
        height: 50%;
        
        border-radius: 15px;
        
        float: left;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
    }

    #nameText{
        font-size: 2vh;
    }

    #roleText{
        font-size: 1.3vh;
    }

    #separator{
        width: 1.5px;
        height: 70%;
        background-color: #e3e3e3;
        border-radius: 15px;
        float: left;
        margin-left: 10px;
    }

    #calendar{
        width: 8vw;
        min-width: 150px;
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

    #calendarIcon{
        width: 30%;
        height: 100%;
        float: left;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    #calendarIcon>svg{
        width:auto;
        height:80%;
    }

    #date{
        width:50%;
        text-align: left;
        font-size: 1.8vh;
    }

    #mid{
        width: 35%;
        min-width: 250px;
        height: 100%;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .containerCalendar{
        margin-top: 10vh;
        display: block;
    }

    .offDisplay{
        
        display: none;
    }

    #searchBar{
        min-width: 200px;
        width: 100%;
        height: 50%;
        background-color: #e3e3e3;
        border-radius: 15px;
        float: left;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    #searchBarIcon{
        width: 10%;
        height: 90%;
        float: left;
        
        display:flex;
        align-items: center;
        justify-content: center;
    }

    #searchBarIcon>svg{
        width: auto;
        height: 90%;
    }

    #searchBar input{
        width: 80%;
        height: 50%;
        border: none;
        background-color: #e3e3e3;
        border-radius: 15px;
        font-weight: bold;
        font-size: 1.8vh;
        outline: none;
    }

    #right{
        width: 5%;
        height: 100%;
        min-width: 50px;
        border-radius: 15px;
        display:flex;
        align-items:center;
        justify-content: center; 
    }

    #notificationIcon{
        width: 50%;
        height: 50%;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    #organizerLeft{
        width: 30vw;
        min-width: 400px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

</style>