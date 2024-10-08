<script>
    import { goto } from "$app/navigation";
    import config from "../../services/config";
    import User from "../../services/user";
    import Login from "../login/Login.svelte";
    // @ts-ignore
    let name = "";
    let email = "";
    let pass = "";
    let confirmed = "";
    let loading = false;
    let errorState = false;
    let errorMessage = "";
    let roles = [];
    let sezioni = [];
    let sezione = "";
    //
    function test() {
        goto("../");
    }
    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }
    // @ts-ignore
    let a, b, c, d;
    let nameOk, emailOk, passwordOk, confirmPasswordOk, sezioneOk;

    function insert() {
        if (name.length < 3) {
            nameOk = false;
            document.getElementById("errorName").textContent =
                "Nome troppo corto";
        } else {
            nameOk = true;
            document.getElementById("errorName").textContent = "";
        }

        if (!email.includes("@gmail.com")) {
            emailOk = false;
            document.getElementById("errorMail").textContent =
                "Email non corretta";
        } else {
            emailOk = true;
            document.getElementById("errorMail").textContent = "";
        }

        if (
            !pass.match(/[A-Z]/) ||
            !containsSpecialChars(pass) ||
            pass.length < 8
        ) {
            passwordOk = false;
            document.getElementById("errorPass").textContent =
                "Password non corretta";
            document.getElementById("passIntel").style.opacity = "1";
        } else {
            passwordOk = true;
            document.getElementById("errorPass").textContent = "";
            document.getElementById("passIntel").style.opacity = "0";
            document.getElementById("decoration").style.opacity = "0";
            document.getElementById("intel").style.opacity = "0";
        }

        if (confirmed != pass || confirmed.length <= 8) {
            confirmPasswordOk = false;
            document.getElementById("errorRPass").textContent =
                "Le password non corrispondono";
        } else {
            confirmPasswordOk = true;
            document.getElementById("errorRPass").textContent = "";
        }

        if(sezione.length == 0) sezioneOk = false;
        else sezioneOk = true;

        if (nameOk && emailOk && passwordOk && confirmPasswordOk && sezioneOk) {
            send_register();
        }
    }

    async function send_register() {
        loading = true;
        errorState = false;
        registerBlock(loading, errorState, errorMessage);
        try {
            const resp = await User.register(name, email, pass, confirmed, sezione).then(res => res.text()).then(data => {
                    if (data == "ok") {
                        goto("../login");
                    }
                    if (data == 'Something goes wrong'){
                        registerBlock(false, true, data);
                    }
                });
            loading = false;
        } catch (error) {
            errorState = true;
            errorMessage = error.toString();
            loading = false;
            console.error(error);
            registerBlock(loading, errorState, errorMessage);
        }
    }

    function registerBlock(loading, errorState, errorMessage) {
        if (loading) {
            document.getElementById("loader").style.display = "block";
            let div = document.createElement("div");
            div.setAttribute("id", "cover");
            document
                .getElementsByClassName("register_container")[0]
                .appendChild(div);
        }
        if (errorState) {
            document.getElementById("loader").style.display = "none";
            document.getElementById("cover").remove();
            let div = document.getElementsByClassName("errorBanner")[0];
            div.innerHTML = errorMessage;
            div.style.opacity = 1;
            setTimeout(function () {
                div.style.opacity = 0;
            }, 5000);
        }
    }
    function displayIntel() {
        let intel = document.getElementById("intel");
        console.log(intel.style.opacity);
        if (intel.style.opacity == "") intel.style.opacity = "0";

        if (intel.style.opacity == "0") {
            document.getElementById("intel").style.opacity = "1";
            document.getElementById("intel").style.transition = "opacity 0.5s";
            document.getElementById("decoration").style.opacity = "1";
            document.getElementById("decoration").style.transition =
                "opacity 0.5s";
        } else {
            document.getElementById("intel").style.opacity = "0";
            document.getElementById("intel").style.transition = "opacity 0.5s";
            document.getElementById("decoration").style.opacity = "0";
            document.getElementById("decoration").style.transition =
                "opacity 0.5s";
        }
    }

    fetch(config.getHost()+'/api/get_all_sections', {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
        }
    }).then(response => response.json())
    .then(data=>{
        sezioni = data
    })
</script>

<div class="register_page">
    <div class="errorBanner" />
    <div id="passIntel" on:click={displayIntel}>
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M400.344 0.353149C400.238 0.353149 400.097 0.370805 399.991 0.370805C399.868 0.370805 399.762 0.353149 399.638 0.353149C178.941 0.353149 0 179.277 0 400.009C0 620.706 178.941 799.647 399.638 799.647C399.762 799.647 399.868 799.647 399.991 799.647C400.097 799.647 400.238 799.647 400.344 799.647C621.041 799.647 799.982 620.706 799.982 400.009C800 179.277 621.059 0.353149 400.344 0.353149ZM400.344 685.238C400.238 685.238 400.097 685.22 399.991 685.22C399.868 685.22 399.762 685.238 399.638 685.238C363.514 685.238 334.223 655.964 334.223 619.823C334.223 583.717 363.514 554.444 399.638 554.444C399.762 554.444 399.868 554.444 399.991 554.444C400.097 554.444 400.238 554.444 400.344 554.444C436.45 554.444 465.777 583.717 465.777 619.823C465.777 655.947 436.503 685.238 400.344 685.238ZM494.149 186.763C489.877 252.036 460.038 446.161 460.038 446.161C460.038 478.895 433.219 505.414 400.486 505.414C400.309 505.414 400.132 505.414 399.973 505.414C399.815 505.414 399.62 505.414 399.461 505.414C366.745 505.414 339.926 478.859 339.926 446.161C339.926 446.161 310.106 252.036 305.833 186.763C303.714 154.082 328.75 93.399 399.479 93.399C399.656 93.399 399.832 93.4166 399.991 93.4166C400.15 93.4166 400.327 93.399 400.503 93.399C471.214 93.399 496.286 154.082 494.149 186.763Z"
                fill="#E4DD3C"
            />
        </svg>
    </div>
    <div id="decoration">
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 97 97"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M74.6254 8.5441C73.9716 8.20403 73.2375 8.04843 72.502 8.094C71.7664 8.13957 71.0572 8.38459 70.4504 8.80276L17.9087 45.1778C17.3718 45.5497 16.9331 46.0463 16.6301 46.6249C16.327 47.2034 16.1687 47.8469 16.1687 48.5C16.1687 49.1532 16.327 49.7966 16.6301 50.3752C16.9331 50.9538 17.3718 51.4503 17.9087 51.8223L70.4504 88.1973C71.0567 88.6168 71.7663 88.8625 72.5023 88.9077C73.2382 88.9529 73.9726 88.7959 74.6257 88.4537C75.2788 88.1116 75.8259 87.5972 76.2077 86.9664C76.5895 86.3356 76.7915 85.6124 76.7917 84.875V12.125C76.7919 11.3873 76.5901 10.6635 76.2082 10.0323C75.8263 9.40108 75.2789 8.88642 74.6254 8.5441Z"
                fill="#FFFFFF"
            />
        </svg>
    </div>
    <div id="intel">
        <ul>
            <li>La password deve contenere almeno 8 caratteri.</li>
            <br />
            <li>La password deve contenere almeno una lettera maiuscola.</li>
            <br />
            <li>La password deve contenere almeno un numero.</li>
            <br />
            <li>
                La password deve contenere almeno un carattere speciale. <br /> [
                ] . , : ; ! ?
            </li>
        </ul>
    </div>
    <div class="register_container">
        <span id="loader" />
        <div id="title">Registrati</div>

        <div id="form">
            <div class="placeholder"><div id="namePlaceholder">Nome</div></div>
            <input class="input" type="text" name="Nome" bind:value={name} />
            <div class="errorPlaceholder" id="errorName" />

            <div class="placeholder"><div id="mailPlaceholder">Email</div></div>
            <input class="input" type="text" name="Email" bind:value={email} />
            <div class="errorPlaceholder" id="errorMail" />

            <div class="placeholder">
                <div id="passPlaceholder">Password</div>
            </div>
            <input
                class="input"
                type="password"
                name="Password"
                bind:value={pass}
            />
            <div class="errorPlaceholder" id="errorPass" />

            <div class="placeholder">
                <div id="rPassPlaceholder">Ripeti Password</div>
            </div>
            <input
                class="input"
                type="password"
                name="Password_confirmed"
                bind:value={confirmed}
            />
            <div class="errorPlaceholder" id="errorRPass" />
            <div class="placeholder">
                <div id="Sezione">Sezione</div>
            </div>
            <select name="sezioni" id="sezioni" bind:value={sezione}>
                {#each sezioni as sezione}
                    <option value={sezione['sezione']}>{sezione['sezione']}</option>
                {/each}
            </select>
            <div id="submit" on:click={insert}>Registrati</div>
        </div>

        <div>
            Hai già un account? <div class="return_login" on:click={test}>
                Log in
            </div>
        </div>
    </div>
    <div id="homepage">Homepage</div>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap");
    * {
        font-family: "Montserrat";
    }
    :global(.avviso) {
        position: relative;
        color: red;
        margin-bottom: 10px;
    }

    :global(.input) {
        color: black;
        font-size: 17px;
        word-wrap: break-word;
        word-break: break-all;
    }
    :global(.inputError) {
        color: red;
        font-size: 15px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .register_page {
        display: flex;
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background-image: url("../../img/bg2.png");
        background-size: cover;
        overflow: hidden;
    }

    .register_container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        width: 400px;
        height: 550px;

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
    }
    #subtitle {
        position: absolute;
        font-size: 18px;
        left: 25px;
        top: 90px;
    }

    #form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        height: 450px;
    }

    input {
        width: 90%;
        height: 40px;
        border-radius: 5px;
        border: none;
        background-color: rgba(188, 197, 240, 0.5);
        padding: 8px;
        outline: none;
    }

    .placeholder {
        width: 90%;
        margin-bottom: -15px;
    }

    #namePlaceholder {
        font-weight: bold;
    }
    #mailPlaceholder {
        font-weight: bold;
    }
    #passPlaceholder {
        font-weight: bold;
    }
    #rPassPlaceholder {
        font-weight: bold;
    }
    #Ruolo {
        font-weight: bold;
    }
    #Sezione {
        font-weight: bold;
    }
    .errorPlaceholder {
        font-weight: bold;
        color: red;
        width: 90%;
        margin-top: -15px;
    }

    #passIntel {
        width: 25px;
        height: 25px;
        position: absolute;
        top: calc(50% + 28px);
        left: calc(50% + 220px);
        transform: translate(-50%, -50%);
        z-index: 2;
        cursor: pointer;
        opacity: 0;
    }
    #decoration {
        width: 20px;
        height: 20px;
        position: absolute;
        top: calc(50% + 18px);
        left: calc(50% + 240px);
        z-index: 2;
        cursor: pointer;
        opacity: 0;
    }
    #intel {
        width: 300px;
        height: 260px;
        position: absolute;
        top: calc(50% + 23px);
        left: calc(50% + 405px);
        transform: translate(-50%, -50%);

        cursor: pointer;
        background-color: white;
        border-radius: 15px;
        opacity: 0;
        font-weight: 600;
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

    .return_login {
        text-decoration: underline;
        cursor: pointer;
        display: inline-block;
    }

    :global(#cover) {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .errorBanner {
        position: absolute;
        top: calc(50% - 310px);
        left: 50%;
        transform: translate(-50%, -50%);
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

    #homepage {
        width: 100px;
        height: 50px;
        background-color: rgb(57, 111, 211);
        color: white;
        position: absolute;
        top: 100%;
        right: 100%;
        transform: translate(-50%, -50%);
    }

    .register_container span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        box-sizing: border-box;
    }

    .register_container span:nth-child(1) {
        transform: rotate(0deg);
    }

    .register_container span:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        background: rgb(57, 111, 211);
        animation: animate 3s linear infinite;
    }

    @keyframes animate {
        0% {
            transform: scaleX(0);
            transform-origin: left;
        }

        50% {
            transform: scaleX(1);
            transform-origin: left;
        }
        50.1% {
            transform: scaleX(1);
            transform-origin: right;
        }

        100% {
            transform: scaleX(0);
            transform-origin: right;
        }
    }
</style>
