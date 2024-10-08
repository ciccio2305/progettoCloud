<script>
    import { onMount } from 'svelte';
    import { start_hydrating } from 'svelte/internal';
    import { myWords } from '../../services/stores';
    import { totalWords } from '../../services/stores';
    let padSrc = localStorage.getItem("padSrc");

    
    onMount(() => {
        console.log("on mount");
        let iframe = document.querySelector("iframe") 
        console.log(iframe);

        if (iframe)
            iframe.onload = () => {
                console.log("onload");
                setTimeout(() => {
                    let stats = iframe?.contentDocument?.body.querySelector("#padStats");
                    let authorStats = iframe?.contentDocument?.body.querySelector(".authorStats");
                    parsePadStats(stats, authorStats);
                }, 1000);
                
                
            }
    })
    
    function parsePadStats(stats, authorStats){
        console.log(stats);
        let statArray = stats.getElementsByClassName("stats");
        for (let i = 0; i < statArray.length; i++) {
            console.log(statArray[i].innerHTML);  
            if (i==2) {
                totalWords.set(statArray[i].innerHTML);
                console.log("totalWords: " + statArray[i].innerHTML);
            }
        }

        let authorArray = authorStats.getElementsByClassName("stats");
        let tds = [];
        for (let i = 0; i < authorArray.length; i++) {
            tds.push(authorArray[i].getElementsByTagName("td"));
            
        }
        console.log(tds);
        let mywords;
        for (let i = 0; i < tds.length; i++) {
            for (let j = 0; j < tds[i].length; j++) {
                if ( j % 3 != 0) {
                    console.log(tds[i][j].innerHTML);
                    mywords = tds[0][2].innerHTML;
                    myWords.set(mywords);
                }
            }   
        }

    }

    // {
    //     "charsWs": 0,
    //     "words": 0,
    //     "authorsNum": 0,
    // }


</script>


    <div id="etherpadContainer">
        <iframe title="etherpad" id ="iframe" src={padSrc} width=600 height=400 frameborder="0"></iframe> 
    </div>



<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
    *{
        font-family: 'Montserrat';
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    :global(.homePage){
        width: 100vw;
        height: 100vh;
        display: flex;
        
        }

    #etherpadContainer{
        /* width: calc(100% - 80px); */
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #iframe{
        width: 100%;
        height: 100%;
        /* border: 2px solid black; */
        /* border-radius: 15px; */
    }


   
    
</style>
