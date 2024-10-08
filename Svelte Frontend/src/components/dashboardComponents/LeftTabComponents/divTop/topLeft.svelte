<script>
    import { onDestroy } from "svelte";
    import { timestamp } from "../../../../services/stores";
    import { myWords } from "../../../../services/stores";
    import { totalWords } from "../../../../services/stores";
    import { lastPad } from "../../../../services/stores";
    import config from "../../../../services/config";
    
    let opMin = 0;
    let contribution = 0;
    let date = "00/00/0000";
    let time = "00:00";
    let word = 0;
    let myword;
    let totalwords = 0;
    let lastPadName = "";

   
    let timeStamp = 0;
    let timeDiff; 

    let LastEditTimestamp="0";
    let LastEditDate="0";
    let LastEditTime="0";

    timestamp.subscribe(value => {
        timeStamp = value;
        console.log("timestamp: " + timeStamp);
        
    });

    myWords.subscribe(value => {
        myword = value;
        word = myword;
    });

    totalWords.subscribe(value => {
        totalwords = value;
    });

    lastPad.subscribe(value => {
        lastPadName = value;
        
    });


    
    let interval = setInterval(() => {
        console.log(timeStamp);
        console.log(totalwords);
        console.log(lastPadName);



        if (timeStamp == 0) return;
        let actualTime = Date.now();
        timeDiff = actualTime - timeStamp;
        opMin = Math.floor(timeDiff/60000);
        console.log("aperto da: " + opMin);

        if (totalwords == 0) return;
        contribution = totalwords / word * 100 ;
        console.log("contribution: " + contribution);


        if (lastPadName == "") return;
        fetch(config.getHost() + "/api/stats/get_last_edited" + lastPadName , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(data => {
            LastEditTimestamp = data.timestamp;
            LastEditDate = new Date(LastEditTimestamp).toLocaleDateString();
            LastEditTime = new Date(LastEditTimestamp).toLocaleTimeString();
        })
        .catch(error => {
            console.log(error);
        });
         
    }, 30000);
    onDestroy(()=>{clearInterval(interval);})
    

    

</script>
<div class="openedContainer">
    <div class="iconOpened">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
            <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
        </svg>
    </div>
    <div class="lastOpened"> Aperto da {opMin} minuti </div>
</div>

<div class="totalWorkContainer">
    <div class="iconWork">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path></svg>
    </div>
    <div class="totalWork"> Hai contribuito per un totale del {contribution}%</div>
</div>


<div class="lastModifiedContainer">
    <div class="iconLastModified">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path></svg>
    </div>
    <div class="lastModified">Ultima modifica il {LastEditDate} alle {LastEditTime}</div>
</div>

<div class="wordContainer">
    <div class="iconWord">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m11.307 4-6 16h2.137l1.875-5h6.363l1.875 5h2.137l-6-16h-2.387zm-1.239 9L12.5 6.515 14.932 13h-4.864z"></path></svg>
    </div>
    <div class="word">Words: {word} </div>
</div>

<style>
    
    .openedContainer{
        display: flex;
        gap: 5px;
        font-size: 1.5vh;
        /* height: 2vh; */
        align-items: center;
        

    }

    .iconOpened{
        width: 2vh;
        height: 2vh;
        display: inline-block;
    }

    .lastOpened{
        line-height: 2vh;
        height: 2vh;
        font-size: 0.7vmax;
    }

    .totalWorkContainer{
        display: flex;
        gap: 5px;
       
        align-items: center;
    }

    .iconWork{
        width: 2.5vh;
        height: 2.5vh;
        display: inline-block;
        
    }

    .totalWork{
        line-height: 2vh;
        font-size: 1.5vh;

        font-size: 0.7vmax;
    }

    .lastModifiedContainer{
        display: flex;
        gap: 5px;
        align-items: center;
       
    }

    .iconLastModified{
        width: 2vh;
        height: 2vh;
        display: inline-block;
    }

    .lastModified{
        line-height: 2vh;
        font-size: 0.7vmax;
    }

    .wordContainer{
        display: flex;
        gap: 5px;
        align-items: center;
    }

    .iconWord{
        width: 2vh;
        height: 2vh;
        display: inline-block;
    }

    .word{
        line-height: 2vh;
        font-size: 0.7vmax;
    }

</style>