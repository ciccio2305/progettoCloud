<script>
    import { goto } from "$app/navigation";
    import User from "../../services/user";
    import { secretKey } from "../../services/stores";
    import { onMount } from "svelte";
    import config from "../../services/config";
    let email='';
    let password='';
    let loading=false;
    let errorState=false;
    let errorMessage='';

    onMount(() => {
        fetch(config.getHost() + "/api/whoami", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((response) => response.json())
            .then((data) => {
                if(!Object.keys(data).includes('error')) gotoHomepage()
            })
            .catch((error) => console.log(error));
    })
    
    async function send_login() {
        console.log("send_login()");
        loading=true;
        errorState=false;
        loginBlock(loading, errorState, errorMessage);
        let newMail = email.replace(/@/g, "_._at");
        secretKey.set(newMail + ":" + password);
        try {
            const resp=await User.login(email, password).then(res=>res.text()).then(data=>{
                if (data.includes("Logged")){
                    gotoHomepage();
                }
                else{
                    loginBlock(false,true,data)
                }
            });
            loading=false;
        } catch (error) {
            errorState=true;
            errorMessage=error.toString();
            loading=false;
            console.error(error);
            loginBlock(loading, errorState, errorMessage);
        }
        
    }

    function loginBlock(loading, errorState, errorMessage){
        if (loading){
            document.getElementById('loader').style.display='block';
            let div = document.createElement('div');
            div.setAttribute('id','cover');
            document.getElementsByClassName('login_container')[0].appendChild(div);
        }
        if (errorState) {
            document.getElementById('loader').style.display='none';
            document.getElementById('cover').remove();
            let div = document.getElementsByClassName('errorBanner')[0];
            div.innerHTML=errorMessage;
            div.style.opacity = 1;
            setTimeout(function(){ div.style.opacity = 0; }, 5000);
        }
    }
    
    function gotoRegister() {
        goto("../register");
    }
    function gotoHomepage(){
        goto("../homepage");
    }

    async function updateEmail(e) {
        email = e.target.value;
    }

    async function updatePassword(e) {
        password = e.target.value;
    }

</script>

<div class="login_page">
    <!--scheda login e logo-->
    <div class="errorBanner"></div>
    <div class="login_container">
    
            <span id="loader"></span>
            
        
        <div id="title">Login</div>
        <!-- <div id="subtitle">Bentornato! Inserisci le tue credenziali.</div> -->
            <div id="form">
                <div class="placeholder"><div id="namePlaceholder">Email</div></div>
                <input type="text"  on:input={updateEmail} name="email" />
                <div class="errorPlaceholder" id="errorName"></div>

                <div class="placeholder"><div id="passPlaceholder" >Password</div></div>
                <input type="password"  on:input={updatePassword} name="password" />
                <div class="errorPlaceholder" id="errorPass"></div>

                <div id="submit" on:click={send_login}>Submit</div>
            </div>
            
            
            <div>Non hai un account?
            <div on:click={gotoRegister} id="register">Registrati</div></div>
            <!-- <div on:click={home} id="homepage">Homepage</div> -->
        
    </div>
    <div id="homepage" on:click={gotoHomepage}>Homepage</div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
    *{
        font-family: 'Montserrat';
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    
    .login_page {
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-image: url("../../img/bg2.png");
        background-size: cover;
    }

    /*scheda login*/
    .login_container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        width: 400px;
        height: 400px;

        background-color: rgb(255, 255, 255);
        border-radius: 10px;

        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        overflow: hidden;
    }
    
    #title {
        font-size: 30px;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: -20px;
    }

    #subtitle {
        position: absolute;
        font-size: 18px;
        left: 25px;
        top: 90px;
    }

    #form{ 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        height: 280px;
    }

    .placeholder{
        width: 90%;
        margin-bottom: -15px;
    }

    #namePlaceholder {
        font-weight:bold;
    }

    #passPlaceholder {

        font-weight:bold;
    }

    .errorPlaceholder{
        font-weight:bold;
        color: red;
        width: 90%;
        margin-top: -15px;
    } 

    input {
        width: 90%;
        height: 40px;
        border-radius: 5px;
        border: none;
        background-color: rgba(188, 197, 240, 0.5);
        font-size: 20px;
        outline: none;
        padding: 8px;
    }

    #submit {
        width: 90%;
        height: 40px;
        background-color: rgb(57, 111, 211);
        color: white;
        font-size: 24px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
    }

    #register {
        text-decoration: underline;
        font-size: 15px;
        cursor: pointer;
        display: inline-block;
    }
    

    :global(#cover){
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .errorBanner{
        position: absolute;
        top: calc(50% - 240px);
        left: 50%;
        transform: translate(-50%,-50%);
        width: 400px;
        height: 50px;
        background-color: white;
        border-radius: 15px;
        opacity: 0;
        color: red;
        font-size: 17px;
        line-height: 30px;
        padding: 10px;
        text-align: center;
        transition: opacity 0.5s;
    }
    #homepage{
        width: 150px;
        height: 50px;
        background-color: rgb(57, 111, 211);
        color: white;
        position: absolute;
        top: 95vh;
        right: 0px;
        transform: translate(-50%,-50%);
        border-radius: 15px;
        text-align: center;
        line-height: 50px;
        font-style: normal;
        font-size: 20px;
        cursor: pointer;
    }

    /*fine blocco input Utente e password*/

    /*----------------------------------------------------------*/

    .registrati {
        position: relative;
        top: 40px;
        text-decoration: underline;
        cursor: pointer;
    }

    /*Scheda logo*/
    
    
    @media only screen and (max-width: 768px) {
        .email {
            width: 95%;
        }
        .password {
            width: 95%;
        }
    }




.login_container span{

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  box-sizing: border-box;
  
}

.login_container span:nth-child(1)
{
  transform:rotate(0deg);
}


.login_container span:before
{
  content: '';
  position: absolute;
  width:100%;
  height: 3px;
  background: rgb(57, 111, 211);
  animation: animate 3s linear infinite;
}

@keyframes animate {
  0% {
  transform:scaleX(0);
  transform-origin: left;
  }

  50%
  {
    transform:scaleX(1);
    transform-origin: left;
  }
  50.1%
  {
    transform:scaleX(1);
  transform-origin: right;
    
  }
  
  100%
  {
    transform:scaleX(0);
  transform-origin: right;
    
  }
  
  
} 
</style>
