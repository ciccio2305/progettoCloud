<script>
    import * as ListFile from "./ListFile";
    

    function previous(){
        console.log("Previous: "+ ListFile.Path);
        console.log("previousPath: "+ ListFile.pathPrevious);
        if(ListFile.pathPrevious!=""){
            ListFile.ls(ListFile.pathPrevious);
        }
        
        
    }

    function next(){
        console.log("Next");
        console.log("pathNext: "+ ListFile.pathNext);
        console.log("pathPrevious: "+ ListFile.pathPrevious);
        if(ListFile.pathNext!="" && ListFile.pathNext!=ListFile.pathPrevious){
            ListFile.ls(ListFile.pathNext);
        }
    }

    function refresh(){
        console.log("refresh"+ListFile.Path );
        ListFile.ls(ListFile.Path);
    }

</script>
<div class="tabInfocontainer">
    <div class="controls"> 
        <div class="button" id="refresh" on:click={refresh}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAfhJREFUSEvt1ruvTVEQBvDfjXeoKNDoBBGFUkS8H/EIrYRSJUKhofGMRKJSkCgUKh0h3s+g0VAo8AdI0AniFSIjc2Tfnb33WVxxI+6qzlkza76Zb741aw8YpjUwTLhGgP8a8/8M1WOwDEsxO+l5htu4gy+llJVWHH5bcBTTW4K/xiGcxNd+CZQAT8QVLKoFe57/Z9X272MFPneB9wMej6tYnEFeYDciePyONRnrsDfp344TQ634CPZkkOjhRrxtCToWS3C9H2jYuyqeklWNwxMswPuSoIgzwcDhNsF1AW/FmQRansotwQ3QC1iFa9jQBF4Fnla5IgGwK6n9hLX4Vrk+L1syCE2cx+qK/TI21cGrwJFpCCn61LbuYg0imfqKO34JKxtsN1KAP+95neou8N8F7eUxCLypx0HXxbyLvUM3s1cfW6iYijlpm5A9Ho1zOF458xSvulRdrbyr0qY8tuFUGjbjbJNTl6oDfB8OtPS0Kd4MPEJcxQ85Xt/8KnDdP0QX1betGK0PMTcdDmbijf79Rmbv0I7s1QMcwy28S+OkfLH2Y37uhX092jRR9OkTlEeghbXUQyghoJm1/X5C/OFeWvEo7MwxGP1rWveSlRggf+RZrILEQxAfAUHjvDQ8xumc5x0SGGwqrbg4YKnjCHApU0P2+/+o/g7oX1of1iIDHwAAAABJRU5ErkJggg=="/>
        </div>

        <div class="button" on:click={previous}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAARZJREFUSEvF1yFLBEEYBuDn8AQRRKOgSTCYxGAVo000mNRs0mwyajHdcU0ERdHmXzD7V2z+ARm4g2E53bvdm5nNwz7fLPO9821HoadTyJUKXsMhnvEzbnMp4DP0sDyEz1PDK3jAcQR9Yj8lfIBHrFaQZPAi7nHxxyFNAu/iDRv/dMZM4S5ucI25mnacGbyJd+xM2P+t4dB2l7jDwoRoWNYKDmHwir0pwNHSxvAp+sMwaOBOv+NxYZAcnscXtptIbQKkGByKLvKp46+V/XDFeJF2GhUQAuQKtzkDJN79Fl5yRmaMF7kk4gKyX4sxXmQQiAvIPvrEeJFhrxo6AyzhA0cpp8zqu9dxgid854RrL7YUfxK1aFjwCyo9NB9yN2XdAAAAAElFTkSuQmCC"/>
        </div>

        <div class="button" on:click={next}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQpJREFUSEvd178uBUEUB+DvPoDWqyg9gpL412hElAotBb3GC5CoxAtIRKugl6gQJZGICCEnuZtcxV12d3ZGzAPM95vNzjlnBgqtQSFXHTyBJZzgPnXAOvgAC3jCKo5S4nXwGaZHsGOs4DFFgCZweA9YxGlXvClcefvYwEvbAG3h8G4wh4s2eBc4vA/sYBvvTQJ0hSvrErO4/i2eCg7vFZvYw+dPAVLClXWOedzV4X3A4cVdX8fhOLwvuPLGFp2+4QhwhSm8jZ7+38LZP3WRnyv7dSpSQLKXzGgSu9jK2SSKtMXsg0CR0SfbsBfz9AyesYYYd5Otulo9ieXhPH2bTBxu9CefMKkP+W2/L++/UB+fSrrtAAAAAElFTkSuQmCC"/>
        </div>

    </div>

    <div class="tabInfo">
        <div class="nome">Nome</div>
        <div class="tipo">Tipo</div>
        <div class="data">Ultima Modifica</div>
        <div class="altreInfo">Altre Informazioni</div>
        <div class="altreInfo">Completato</div>
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

   .tabInfocontainer{
        width: 100%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: flex-start;
   }
   .tabInfo{
        width: 78vw;
        height: 50px;
        display:flex;
        align-items: center;
        
        border-bottom: 2px solid rgb(169, 169, 169);
        position: relative;
        
    }

    .tabInfo>div{
        width: calc(100%/5);
    }

    .tipo{
        font-weight: bold;
        font-size: 2vh;
    }

    .nome{
        font-weight: bold;
        font-size: 2vh;
    }

    .data{
        font-weight: bold;
        font-size: 2vh;
    }

    .altreInfo{
        font-weight: bold;
        font-size: 2vh;
    }
    .button{
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
    }

    .controls{
        width: 9vw;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap:20px;

        padding-left: 10px;
        float: right;
    }
    img{
        width: 100%;
        height: 100%;
        }

    #refresh>img{
        width: 30px;
        height: 30px;
    }
</style>