<script>
    import ProPic from "../../../img/proPic2.png";
</script>

<div id="leftTab">
    <div id="chatPreview">
        <div id="contactPreview">
            <div id="contactContainer"> 
            <img id="contactPicture" src={ProPic} alt="propic">
            <!-- <div id="status"></div> -->
            </div>
            <div id="nameContainer">
                <div id="contactName">
                    Nome Cognome
                </div>
        </div>

        <div id="quickActions">
            <div id="call">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.57 22C16.8356 22.0015 17.0988 21.9502 17.3444 21.8489C17.5899 21.7476 17.8128 21.5984 18 21.41L20.71 18.7C20.8963 18.5126 21.0008 18.2592 21.0008 17.995C21.0008 17.7308 20.8963 17.4774 20.71 17.29L16.71 13.29C16.5226 13.1038 16.2692 12.9992 16.005 12.9992C15.7408 12.9992 15.4874 13.1038 15.3 13.29L13.7 14.88C12.5923 14.5846 11.5663 14.0409 10.7 13.29C9.95112 12.4223 9.40763 11.3969 9.11 10.29L10.7 8.69C10.8863 8.50264 10.9908 8.24919 10.9908 7.985C10.9908 7.72082 10.8863 7.46737 10.7 7.28L6.7 3.28C6.51264 3.09375 6.25919 2.98921 5.995 2.98921C5.73082 2.98921 5.47737 3.09375 5.29 3.28L2.59 6C2.40163 6.18725 2.25245 6.41013 2.15115 6.65565C2.04985 6.90117 1.99847 7.16441 2 7.43C2.09073 11.2723 3.62608 14.9393 6.3 17.7C9.06072 20.3739 12.7277 21.9093 16.57 22ZM6 5.41L8.59 8L7.3 9.29C7.17782 9.40445 7.08633 9.54774 7.03392 9.70673C6.9815 9.86573 6.96984 10.0353 7 10.2C7.37377 11.8704 8.16511 13.4187 9.3 14.7C10.5804 15.8364 12.129 16.6279 13.8 17C13.9622 17.0339 14.1302 17.027 14.2891 16.9799C14.4479 16.9327 14.5926 16.8469 14.71 16.73L16 15.41L18.59 18L16.59 20C13.2737 19.9146 10.1095 18.5911 7.72 16.29C5.41291 13.8995 4.08561 10.7311 4 7.41L6 5.41ZM20 11H22C22.0259 9.811 21.8109 8.62906 21.3677 7.52541C20.9246 6.42176 20.2627 5.41925 19.4217 4.5783C18.5808 3.73735 17.5782 3.07537 16.4746 2.63226C15.3709 2.18914 14.189 1.97407 13 2V4C13.9279 3.96791 14.8525 4.12701 15.7163 4.46744C16.5801 4.80786 17.3646 5.32232 18.0212 5.97884C18.6777 6.63537 19.1921 7.41991 19.5326 8.28371C19.873 9.14751 20.0321 10.0721 20 11Z" fill="black"/>
                    <path d="M13 8C15.1 8 16 8.9 16 11H18C18 7.78 16.22 6 13 6V8Z" fill="black"/>
                </svg>    
            </div>

            <div id="videoCall">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 7C18 5.897 17.103 5 16 5H4C2.897 5 2 5.897 2 7V17C2 18.103 2.897 19 4 19H16C17.103 19 18 18.103 18 17V13.667L22 17V7L18 10.333V7ZM16.002 17H4V7H16L16.001 11.999L16 12L16.001 12.001L16.002 17Z" fill="black"/>
                </svg>
                    
            </div>

            <div id="options">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="black"/>
                    </svg>
                    
            </div>
        </div>

        </div>
        <div id="separator">
            <div id="separatorLine"></div>
            <div id="separatorText">Oggi</div>
            <div id="separatorLine"></div>
        </div>
        <div id="chat">
            <div id="chatMessages">
                <div class="message me">
                    <div class="container">
                        <div class="text">Ciao, la prossima settimana ricordati di compilare il modulo.</div>
                        <div class="time">12:00</div>
                    </div>
                </div>
                <div class="message me">
                    <div class="container ">
                        <div class="text">Mi raccomando!</div>
                        <div class="time">12:00</div>
                    </div>
                </div>
                <div class="message your">
                    <div class="container ">
                        <div class="text">Hey! Certo non preoccuparti</div>
                        <div class="time">12:00</div>
                    </div>
                </div>
                <div class="message me">
                    <div class="container ">
                        <div class="text">Perfetto.</div>
                        <div class="time">12:00</div>
                    </div>
                </div>
            </div>
            <div id="chatInput">
                <div id="allegati">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.004 5H9C7.162 5 5.414 5.737 4.076 7.076C2.737 8.415 2 10.163 2 12C2 13.838 2.737 15.586 4.076 16.924C5.414 18.263 7.162 19 9 19H17V17H9C7.697 17 6.45 16.471 5.49 15.51C4.529 14.55 4 13.303 4 12C4 10.698 4.529 9.451 5.49 8.49C6.45 7.529 7.697 7 9 7H17H17.004C17.794 7 18.543 7.314 19.113 7.886C19.684 8.457 19.999 9.208 20 10.002C19.9997 10.3947 19.9214 10.7835 19.7696 11.1457C19.6179 11.5079 19.3957 11.8363 19.116 12.112C18.8392 12.3922 18.5098 12.6148 18.1466 12.7672C17.7835 12.9196 17.3938 12.9987 17 13H9C8.86963 12.9984 8.74086 12.9711 8.62108 12.9196C8.50129 12.8681 8.39286 12.7935 8.302 12.7C8.20794 12.609 8.13283 12.5003 8.08099 12.3802C8.02916 12.2601 8.00163 12.1308 8 12C8 11.748 8.11 11.493 8.301 11.302C8.39171 11.2079 8.50021 11.1327 8.6202 11.0809C8.7402 11.029 8.86929 11.0015 9 11H17V9H9C8.21 9 7.459 9.315 6.886 9.889C6.314 10.461 6 11.211 6 12C6 12.789 6.314 13.54 6.888 14.114C7.16401 14.3939 7.49277 14.6164 7.85529 14.7685C8.21781 14.9205 8.60688 14.9992 9 15H17.001C17.6572 14.9995 18.3068 14.8691 18.9123 14.6163C19.5178 14.3635 20.0673 13.9933 20.529 13.527C20.9948 13.0652 21.3644 12.5156 21.6167 11.9101C21.8689 11.3047 21.9988 10.6552 21.9987 9.99929C21.9986 9.34337 21.8686 8.69395 21.6161 8.08854C21.3637 7.48313 20.9939 6.93371 20.528 6.472C20.0674 6.0055 19.5186 5.63515 18.9137 5.38246C18.3087 5.12977 17.6596 4.99976 17.004 5Z" fill="black"/>
                    </svg>
                </div>
                <input type="text" placeholder="Scrivi qui...">
                <div id="emoji">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="black"/>
                        <path d="M14.829 14.828C14.4635 15.1923 14.0317 15.4835 13.557 15.686C12.7023 16.0468 11.7488 16.0995 10.8595 15.835C9.97029 15.5705 9.20056 15.0053 8.682 14.236L7.024 15.355C7.45644 15.9931 8.0066 16.543 8.645 16.975C9.29465 17.4143 10.0246 17.7212 10.793 17.878C11.5898 18.0405 12.4112 18.0405 13.208 17.878C13.9763 17.7209 14.7062 17.4141 15.356 16.975C15.669 16.763 15.968 16.517 16.242 16.244C16.514 15.973 16.762 15.673 16.976 15.355L15.318 14.236C15.1743 14.4485 15.0105 14.6467 14.829 14.828Z" fill="black"/>
                        <path d="M8.5 12C9.32843 12 10 11.3284 10 10.5C10 9.67157 9.32843 9 8.5 9C7.67157 9 7 9.67157 7 10.5C7 11.3284 7.67157 12 8.5 12Z" fill="black"/>
                        <path d="M15.493 11.986C16.3176 11.986 16.986 11.3176 16.986 10.493C16.986 9.66844 16.3176 9 15.493 9C14.6684 9 14 9.66844 14 10.493C14 11.3176 14.6684 11.986 15.493 11.986Z" fill="black"/>
                        </svg>
                        
                </div>
                <div id="vocals">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12V6C16 3.783 14.215 1.979 12.021 1.979C11.9506 1.97942 11.8805 1.98781 11.812 2.004C10.7853 2.05378 9.81693 2.49635 9.10738 3.24015C8.39783 3.98395 8.00136 4.97204 8 6V12C8 14.206 9.794 16 12 16C14.206 16 16 14.206 16 12ZM10 12V6C10 4.897 10.897 4 12 4C12.0547 4.00002 12.1092 3.995 12.163 3.985C13.188 4.06 14 4.935 14 6V12C14 13.103 13.103 14 12 14C10.897 14 10 13.103 10 12Z" fill="black"/>
                        <path d="M6 12H4C4 16.072 7.061 19.436 11 19.931V22H13V19.931C16.939 19.436 20 16.073 20 12H18C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12Z" fill="black"/>
                        </svg>
                        
                </div>
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

    #leftTab{
        position: relative;
        top:50%;
        transform: translateY(-50%);
        width: 75%;
        height: 95%;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #chatPreview{
        width: 90%;
        height: 100%;
        background-color: #ffffff;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
        
    }

    #contactPreview{
        width: 95%;
        height: 25%;
        background-color: #e3e3e3;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 15px;
        margin-top: 20px;
    }

    #contactContainer{
        width: 100%;
        height: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #contactPicture{
        margin-top: 30px;
        border-radius: 100%;
        min-width: 64px;
        min-height: 64px;
        width: 4vw;
        height: 4vw;
        border: 3px solid white;
        background-image: url("../../../img/proPic2.png");
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
    }
   
    #nameContainer{
        height: 33vh;
        width: 100%;
        min-width: 300px;
        padding-top: 5px;

    }

    #contactName{
        padding: 20px;
        min-width: 200px;
        height: 30px;
        text-align: center;
        font-weight: bold;
        font-size: 3vmin;
    }

    #quickActions{
        width: 15%;
        min-width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border: 1px solid black;
    }

    svg{
        width: auto;
        height: 60%;
        background-color: white;
        border-radius: 100%;
    }

    #call{
        width: auto;
        height: 100%;
    }

    #videoCall{
        width: auto;
        height: 100%;
    }

    #options{
        width: auto;
        height: 100%;
    }

    #separator{
        width: 100%;
        height: 5%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }

    #separatorLine{
        width: 40%;
        height: 2%;
        background-color: rgb(228, 228, 228);
    }

    #separatorText{
        width: 15%;
        height: 100%;
        text-align: center;
        font-weight: bold;
        font-size: 3vmin;
    }

    #chat{
        width: 95%;
        height: calc(70% - 40px);
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }

    #chatMessages{
        width: 90%;
        height: 85%;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    #chatInput{
        margin-bottom: 20px;
        width: 100%;
        height: 10%;
        background-color: #e3e3e3;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    #allegati{
        width: 6%;
        height: 70%;
        border-radius: 100%;
        transform: rotate(45deg);
        margin-left: 5px; 
        display:flex;
        align-items: center;
        justify-content: center;
    }

    #allegati>svg{
        width: auto;
        height: 100%;
        border-radius: 100%;
        padding: 5px;
    }

    input{
        width: 80%;
        height: 80%;
        border-radius: 15px;
        border: none;
        outline: none;
        padding-left: 10px;
        font-size: 15px;
        background-color: #e3e3e3;
    }

    #emoji{
        width: 6%;
        height: 70%;
        border-radius: 100%;
        margin-left: 5px;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    #emoji>svg{
        width: auto;
        height: 100%;
        border-radius: 100%;
        padding: 5px;
    }

    #vocals{
        width: 6%;
        height: 70%;
        border-radius: 100%;
        margin-left: 5px;
        margin-right: 5px;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    #vocals>svg{
        width:auto;
        height: 100%;
        border-radius: 100%;
        padding: 5px;
    }

    .message{
        width: 100%;
        height: auto;
        min-height: 15%;
        border-radius: 15px;
        display: flex;
        align-items: center;
        margin-top: 6%;

        margin-right: 20px;

    }

    .container {
        /* min-width: 150px;
        max-width: 90%; */
        width: auto;
        max-width: 65%;
        height: 100%;
        /* min-height: 50px; */
        min-height: 20%;
        background-color: #bc4a4a;
        border-radius: 15px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        margin-left: 20px;
        margin-right: 20px;

    }

    .me{
        justify-content: flex-end;
    }

    .your{
        justify-content: flex-start;
    }

    .message.me > .container{
        background-color:rgba(188, 197, 240, 0.8);
        border-bottom-right-radius: 5px;
    }

    .message.your > .container{
        background-color: #c2c2c2;
        border-bottom-left-radius: 5px;
    }

    .text{
        font-size: 2vh;
    }

    .time{
        width: 100%;
        height: auto;
        text-align: right;
        font-size: 1.6vh;
        color: rgb(0, 0, 0);
        margin-top: 7px;
    }

    </style>