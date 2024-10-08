<script>
  import config from "../../services/config";
  import { currentPath } from "../../services/stores";
  import {ls, Path } from "./ListFile";

  fetch(config.getHost() + "/api/whoami", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      currentPath.set("/" + data.sezione);
      ls(Path)
    })
    .catch((error) => console.log(error));
</script>

<div id="filter"></div>
<div id="loader">
    <h2>Documento in <br> apertura</h2>
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
</div>
<div class="listContainer">
    
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
   
   *{
       font-family: 'Montserrat';
       margin: 0px;
       padding: 0px;
       box-sizing: border-box;
   }

   .listContainer{
      width: 80vw;
       height:80%;
       display: flex;
       flex-direction: column;
       align-items: center;
       overflow-y: scroll;
     
   }

   :global(#loader) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15vw;
    height: 10vw;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
   }

   .listContainer::-webkit-scrollbar {
      width: 12px;
      background-color: none;
      border-radius: 20px;
    }

    .listContainer::-webkit-scrollbar-thumb {

      background-color: rgb(155, 155, 155);
      border-radius: 20px;
    }

   :global(.container){
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid grey;
        cursor: pointer;
        transition: 0.5s height;
   }
   :global(.bigContainer){
        width: 100%;
        height: 50px;
        display: flex;
        
   }

    :global(.container:hover){
        height: 60px;
        background-color: rgb(174, 174, 174);
    }

   :global(.listContainer>div>div>span){
       width: calc(100%/5);
      
   }

   :global(.icon){
        width: 25px;
        position: relative;
        margin-right: 5px;
   }

   .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 40px;
    
}
.lds-ellipsis div {
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(57, 111, 211);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

#filter{
    position: absolute;
    width: 100vw;
    height: 100vw;
    backdrop-filter: blur(2px);
    z-index: 999;
    display: none;
}

:global(.switch) {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

/* Hide default HTML checkbox */
:global(.switch input) {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
:global(.slider) {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

:global(.slider:before) {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

:global(input:checked + .slider) {
  background-color: #2196F3;
}

:global(input:focus + .slider) {
  box-shadow: 0 0 1px #2196F3;
}

:global(input:checked + .slider:before) {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
:global(.slider.round) {
  border-radius: 34px;
}

:global(.slider.round:before) {
  border-radius: 50%;
}

</style>