<script>   
    import config from "../../../../services/config";
    let weekCompleted = 0;
    let uncompleted = 0;
    
    fetch(config.getHost() + '/api/stats/get_completed_week_user', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
        }).then(response => response.json())
        .then(data => { 
            console.log(data);
            if (data.length == undefined)
                weekCompleted = 0;
            else 
                weekCompleted = data.length;
                
        })

    fetch(config.getHost() + '/api/stats/get_uncompleted', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
        }).then(response => response.json())
        .then(data => { 
            uncompleted = data.length;
        })
        
</script>

<div class="completed">
    <div class="result">Completati</div>
    <div class="totalObjectivesContainer">
        <div class="iconTotalObjects">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"></path></svg>
        </div>

        <div class="totalObjectives">{weekCompleted}</div>
    </div>
    <div class="bonus">15% in più della scorsa settimana</div>
</div>

<div class="inProgress">
    <div class="result">In Corso</div>
    <div class="totalObjectivesContainer">
        <div class="iconTotalObjectsInprogress">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg>
        </div>

        <div class="totalObjectives">{uncompleted}</div>
    </div>
    <div class="malus">25% in meno della scorsa settimana</div>
</div>

<style>
    .completed{
        width: 45%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #e3e3e3;
        border-radius:5px;
        padding: 5px;
    }

    .inProgress{
        width: 45%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #e3e3e3;
        border-radius:5px;

        padding: 8px;
    }

    .result{
        width:50%;
        margin-left: 9px;
        font-size: 0.8vmax;
    }

    .totalObjectivesContainer{
        display: flex;
        width: 7vw;
        margin-left: 7px;
        align-items: center;
    }

    .iconTotalObjects{
        width: 0.9vw;
        height: 100%;
        display: inline-block;
    }

    .iconTotalObjectsInprogress{
        width: 0.8vw;
        height: 100%;
        display: inline-block;
        font-size: 0.8vmax;
    }

    .totalObjectives{
        width: 20%;
        text-align: center;
        font-size: 0.8vmax;
    }

    .bonus{
        width:100%;
        font-size: 0.6vmax;
        margin-left: 9px;
        color: rgb(0, 197, 7);
    }

    .malus{
        width:100%;
        font-size: 0.6vmax;
        margin-left: 9px;
        color: rgb(187, 30, 22);
    }
</style>