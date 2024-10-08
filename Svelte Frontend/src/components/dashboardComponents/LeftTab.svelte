<script>
    import ProPic from "../../img/proPic2.png";
    import TopLeft from "./LeftTabComponents/divTop/topLeft.svelte";
    import TopRightWeek from "./LeftTabComponents/divTop/topRightWeek.svelte";
    import TopRightMonth from "./LeftTabComponents/divTop/topRightMonth.svelte";
    import MiddleLeft from "./LeftTabComponents/divMiddle/middleLeft.svelte";
    import MiddleRight from "./LeftTabComponents/divMiddle/middleRight.svelte";
    import Graphic from "./../../icons/Graphic.png";
    import config from "../../services/config";
    

    import { Line } from 'svelte-chartjs'
    
    import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  var datas = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December'],
    datasets: [
        {
        label: 'Bozze completate',
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgba(225, 204,230, .3)',
        borderColor: 'rgb(205, 130, 158)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(205, 130,1 58)',
        pointBackgroundColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgba(220, 220, 220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }]
  }

    
    let monthCompleted = 0;
    fetch(config.getHost() + '/api/stats/get_completed_year', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
        }).then(response => response.json())
        .then(data => { 
            console.log(data)
            monthCompleted = data.length;
            data.forEach((el) => {
                datas.datasets[0].data[el.month - 1] += 1;
            });
            console.log(datas.datasets[0].data);
    })
    
    var options = {
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }
        }
    }
    
</script>

<div id="leftTab">
    <div id="chatPreview">
        <div class="divTop">
            <div class="divTopLeft">
                <div class="titleTopLeft">Ultimo documento aperto</div>
                <div class="infoTopLeft"><TopLeft/></div>
                
            </div>
            <div class="divTopRight">
                <div class="titleTopRightWeek">Questa settimana</div>
                <div class="dataWeek"><TopRightWeek/></div>
                <div class="titleTopRightMonth">Questo mese</div>
                <div class="dataMonth"><TopRightMonth/></div>
            </div>
        </div>

        <div class="divMiddle">
            <div class="divMiddleLeft">
                <div class="titleMiddleLeft">La tua sezione - Questo mese</div>
                <div class="infoMiddleLeft"><MiddleLeft/></div>
            </div>
            <div class="divMiddleRight">
                <div class="titleMiddleRight">Le tue performance personali</div>
                <div class="infoMiddleRight"><MiddleRight/></div>
            </div>
        </div>

        <div class="divBottom">
            <div class="titleBottom">Andamento della sezione - mensile</div>
            <div class="divGraphic"> 
                    <Line data={datas} options={options}  />
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
        width: 50%;
        height: 90%;
        
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #chatPreview{
        width: 90%;
        height: 95%;
        background-color: #ffffff;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
        
    }


    .divTop{
        width: 100%;
        height: 33.5%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    }

    .divTopLeft{
        width:35%;
        height:90%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    
    .titleTopLeft{
        width:100%;
        height:15%;

        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1vmax;
    
    }

    .infoTopLeft{
        width: 100%;
        height: 85%;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        background-color: #e3e3e3;
        border-radius: 4px;
        padding: 8px;
        font-size: 1.5vh;
    }

    .divTopRight{
        width:45%;
        height:90%;

        display: flex;
        flex-direction: column;
    }

    .titleTopRightWeek{
        width: 100%;
        height: 15%;

        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1vmax;
    }

    .dataWeek{
        width: 100%;
        height:35%;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .titleTopRightMonth{
        width: 100%;
        height: 15%;

        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1.8vh;
        font-size: 0.9vw;
    }

    .dataMonth{
        width: 100%;
        height:35%;
        
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .divMiddle{
        width: 100%;
        height: 33.5%;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .divMiddleLeft{
        width:35%;
        height:100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .titleMiddleLeft{
        width:100%;
        height:15%;

        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1vmax;
    }

    .infoMiddleLeft{
        width: 100%;
        height: 85%;

        display: flex;
        flex-direction: column;
        background-color: #e3e3e3;
        border-radius: 4px;
    }

    .divMiddleRight{
        width:45%;
        height:100%;

        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .infoMiddleRight{
        width: 100%;
        height: 85%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background-color: #e3e3e3;
        border-radius: 4px;
    }

    .titleMiddleRight{
        width:100%;
        height:15%;

        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1vmax;
    }

    .divBottom{
        width: 100%;
        height: 33.5%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
       
    }

    .titleBottom{
        width:40%;
        height:15%;

        display: flex;
        align-items: center;
        
        font-size: 0.9vmax;
    }

    .divGraphic{
        width: 90%;
        height: 85%;
    }

    @media(max-width: 1100px){
        #leftTab{
            width: 100%;
            height: 400vh;
            
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #chatPreview{
            width: 95%;
            height: 95%;
            background-color: #ffffff;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: start;
            flex-direction: column;
        
        }
    }

    </style>