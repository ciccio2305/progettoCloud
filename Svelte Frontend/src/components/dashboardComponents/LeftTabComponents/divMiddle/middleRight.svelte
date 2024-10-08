<script>
  import Performance1 from "./../../../../icons/Performance1.png"
  import Performance2 from "./../../../../icons/Performance2.png"
    import { Bar } from 'svelte-chartjs'
    import config from "../../../../services/config";
    
    let monthCompleted = 0;
    let allMonthCompleted = 0;
    function getMonthCompleted(){
        fetch(config.getHost() + '/api/stats/get_completed_month_user', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
            }).then(response => response.json())
            .then(data => { 
                monthCompleted = data.length;
                console.log(monthCompleted); 
                console.log()
                datas2.datasets[0].data[0] = monthCompleted;
            
            })
        fetch(config.getHost() + '/api/stats/get_completed_month', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
            }).then(response => response.json())
            .then(data => { 
                allMonthCompleted = data.length;
                console.log(allMonthCompleted); 
                console.log()
                datas2.datasets[0].data[1] = allMonthCompleted;
            
            })
    }

    let allCompletedWeek = -1;
    let userCompletedWeek = -1;
    fetch(config.getHost() + '/api/stats/get_completed_week', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
        }).then(response => response.json())
        .then(data => { 
            allCompletedWeek = data.length;
            datas.datasets[0].data[1] = allCompletedWeek;
            console.log( "allWeek:" + allCompletedWeek)
        })

    fetch(config.getHost() + '/api/stats/get_completed_week_user', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
        }).then(response => response.json())
        .then(data => { 
            console.log(data);
            userCompletedWeek = data.length;
            datas.datasets[0].data[0] = userCompletedWeek;
            console.log( "userWeek:" + userCompletedWeek)
        })
    
    getMonthCompleted();

    import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';

  Chart.register(
    BarElement,
  );

    var datas = {
        labels: ['Tu', 'Sezione'],
        datasets: [
            {
            data: [0, 0],
            backgroundColor: [
                'rgba(0, 197, 7)',
                'rgba(187, 30, 22)'
            ],
            borderWidth: 2,
            borderColor: [
                'rgba(0, 197, 7)',
                'rgba(187, 30, 22)'
            ],
            },
        ],
        };

    var datas2 = {
        labels: ['Tu', 'Sezione'],
        datasets: [
            {
            data: [0, 0],
            backgroundColor: [
                'rgba(0, 197, 7)',
                'rgba(187, 30, 22)'
            ],
            borderWidth: 2,
            borderColor: [
                'rgba(0, 197, 7)',
                'rgba(187, 30, 22)'
            ],
            },
        ],
        };

    var options = {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: { legend: {display: false}},
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
  
<div class="completed">
    <div class="result">Completati</div>
    <div  style="font-size: 0.6vmax;">Questa settimana</div>
    <div class="graphic1">
        <Bar data={datas} options={options} />
    </div>
    
</div>

<div class="inProgress">
    <div class="result">Completati</div>
    <div style="font-size: 0.6vmax;">Questo mese</div>
    <div class="graphic1">
        <Bar data={datas2} options={options}/>
    </div>
</div>

<style>
    .completed{
        width: 30%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        
    }

    .inProgress{
        width: 30%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .result{
        width:100%; 
        font-size: 0.8vmax;
        text-align: center;
        
    }

    .graphic1{
        width: 100%;
        height:80%;

        display: flex;
        justify-content: center;

        font-size: 0.8vmax;
    }


</style>
