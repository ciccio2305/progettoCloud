<script>
    
    import { onMount } from 'svelte';
    import le from '../../../icons/left.png';
    import ri from '../../../icons/right.png';
    import { Data } from "../../../services/stores";

    let calendario = [];
    let meseCorrente = new Date().getMonth();
    let annoCorrente = new Date().getFullYear();
    let correntDate=new Date().getDate();
    let numberDay="notNumberDay";
    let formattedDate=new Date(annoCorrente, meseCorrente).toLocaleDateString('default', { month: 'long', year: 'numeric'});
    let uppercaseFormattedDate=formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    

    onMount(() => {
      generaCalendario(meseCorrente, annoCorrente);
    });
  
    function generaCalendario(mese, anno) {
      calendario = [];
      // Calcola il numero di giorni nel mese
      const giorniMese = new Date(anno, mese + 1, 0).getDate();
      
      // Ottieni il primo giorno del mese
      const startDay = new Date(anno, mese, 1);
      const endDay=new Date(anno, mese, giorniMese);
      
      let startWeek = startDay.getDay()-1;
      let endWeek=endDay.getDay()-1;
      console.log(endWeek);
      //mese scorso
      const daysMonthpast = new Date(anno, mese , 0).getDate();
      //mese prossimo
      const daysMonthfuture= new Date(anno, mese +2 , 0).getDate();
      
  
      let giorno = 1;
      let dayFuture=1;
      let notMonth;
      // Genera le righe del calendario
      for (let riga = 0; riga < 6; riga++) {
        let settimana = [];
        if(startWeek==-1){
          startWeek=6;
        }
        let distance=startWeek-1;
        let distanceFuture=endWeek;
        // Genera i giorni della settimana
        for (let colonna = 0; colonna < 7; colonna++) {
          if ((riga === 0 && colonna < startWeek)){ 
            let dayPast=daysMonthpast-distance;
            distance--;
            settimana.push({ giorno: dayPast , notMonth: null});
          }
          else if(giorno > giorniMese && distanceFuture<7) {
            settimana.push({ giorno: dayFuture, notMonth: null});
            dayFuture++;
          }
           else {
            settimana.push({ giorno: giorno, notMonth: 1, monthCurrent: mese, currentYear: anno });
            giorno++;
          }
        }
  
        calendario.push(settimana);
  
        if (giorno > giorniMese) {
          break;
        }
      }
    }

    function rightBottom(){
        meseCorrente=meseCorrente+1;
        console.log("mesecorrente: "+meseCorrente);
        formattedDate=new Date(annoCorrente, meseCorrente).toLocaleDateString('default', { month: 'long', year: 'numeric'});
        uppercaseFormattedDate=formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        generaCalendario(meseCorrente, annoCorrente);
    }
    function leftBottom(){
        meseCorrente=meseCorrente-1;
        formattedDate=new Date(annoCorrente, meseCorrente).toLocaleDateString('default', { month: 'long', year: 'numeric'});
        uppercaseFormattedDate=formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        generaCalendario(meseCorrente, annoCorrente);
    }

    function colorDay(day, month){
      let monthCurrent=new Date().getMonth();
      if (day==correntDate && month==monthCurrent){
          numberDay="numberDay";
          return true;
      }
      else{
        numberDay="notNumberDay";
        return false;
      }
    }

    function getValue(e){
        const td=e.target;

        let day = td.textContent;
        let month = uppercaseFormattedDate.split(" ")[0];
        month = month.slice(0, 3);
        let year = uppercaseFormattedDate.split(" ")[1];
        let date = day + " " + month + " " + year;
        Data.set(date)

    }

  </script>
  
  <div class="calendario">

    <div class="top">
        <div class="left" on:click={leftBottom}></div>
            <div class="mese-anno">{uppercaseFormattedDate}</div>
        <div class="right"  on:click={rightBottom}></div>
    </div> 

    <div class="table">
        <table>
            <thead>
              <tr>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mer</th>
                <th>Gio</th>
                <th>Ven</th>
                <th>Sab</th>
                <th>Dom</th>
              </tr>
            </thead>
            <tbody>
              {#each calendario as settimana} 
                <tr>
                  {#each settimana as giorno}
                      <td class:non-mese={giorno.notMonth==null} class:numberDay={colorDay(giorno.giorno, giorno.monthCurrent)} on:click={(e) => {getValue(e)}}>
                        {#if giorno.giorno}
                          {giorno.giorno}
                        {/if}
                      </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
    </div>
    
  </div>
  
  <style>
    .calendario {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        margin-top: 5vh;
        background-color: #e3e3e3;
        border-radius:5px;
        gap: 15px;
      
        width: 22vw;
        min-width: 250px;
        height: 20vh;
    }
  
    .top {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 0px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .mese-anno{
        font-weight: bold;
        margin-top: 10px;
    }
    .left{
        background-image: url("../../../icons/left.png");
        background-size: cover;
        background-position: center;
        width: 25px;
        margin-top: 10px;
    }
    .right{
        background-image: url("../../../icons/right.png");
        background-size: cover;
        background-position: center;
        width: 24px;
        margin-top: 10px;
    }
    .table{
        width: 100%;
        overflow-x: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  
    table {
        width: 100vw;
        border-collapse: collapse;
        border:none;
    }
    th{
       width:calc(100%/7);
        font-size: small;
    }
  
    td{
        padding: 3px;
        font-size: small;
        text-align: center;
    }

    td:hover{
        
        background-color: rgb(45, 171, 249);
        cursor: pointer;
    }
    
  
    .non-mese{
        
        opacity: 0.4;
    }

    .numberDay{
        background-color: #87a7f9;
        cursor: pointer;
    }

  </style>
  