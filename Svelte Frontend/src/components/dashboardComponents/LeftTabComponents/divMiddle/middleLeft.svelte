<script>

    import config from "../../../../services/config";
    let uncompleted = 0;
    let completed = 0;
    let sezione = "";

    fetch(config.getHost() + '/api/stats/get_completed_month', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
        }).then(response => response.json())
        .then(data => { 
            console.log(data);
            if (data.length == undefined)
                completed = 0;
            else 
                completed = data.length;
                
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
    
        fetch(config.getHost()+"/api/whoami", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => response.json())
            .then(data => {
                if(data.sezione == "primasezionecivile") sezione = "Prima Sezione Civile";
                else if(data.sezione == "secondasezionecivile") sezione = "Seconda Sezione Civile";
                else if(data.sezione == "terzasezionecivile") sezione = "Terza Sezione Civile";
                else if(data.sezione == "quartasezionecivile") sezione = "Quarta Sezione Civile";
                else if(data.sezione == "quintasezionecivile") sezione = "Quinta Sezione Civile";
                else if(data.sezione == "sestasezionecivile") sezione = "Sesta Sezione Civile";
            })
            .catch(error => console.log(error));

</script>
<div class="secondTitleMiddle">{sezione}</div>
<div class="completed">
    <div class="result">Completati</div>
    <div class="totalObjectivesContainer">
        <div class="iconTotalObjects">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z"></path></svg>
        </div>

        <div class="totalObjectives">{completed}</div>
    </div>
    <div class="bonus">25% in più dello scorso mese</div>
</div>

<div class="inProgress">
    <div class="result">In Corso</div>
    <div class="totalObjectivesContainer">
        <div class="iconTotalObjects">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14z"></path></svg>
        </div>

        <div class="totalObjectives">{uncompleted}</div>
    </div>
    <div class="malus">3% in meno dello scorso mese</div>
</div>

<style>
    .secondTitleMiddle{
        width:100%;
        height:50%;
        margin-left:7px;

        display: flex;
        align-items: center;
        justify-content: left;
        font-size: 1vmax;
        font-weight: bold;
        
    }
    .completed{
        width: 80%;
        height: 100%;
        margin-left:10px;

        display: flex;
        flex-direction: column;
        justify-content: left;
        background-color: #e3e3e3;
        border-radius:5px;
        padding: 5px;
    }

    .inProgress{
        width: 80%;
        height: 100%;
        margin-left:10px;

        display: flex;
        flex-direction: column;
        justify-content: left;
        background-color: #e3e3e3;
        border-radius:5px;
        padding: 5px;
    }

    .result{
        width:50%;
        font-size: 1vmax;
    }

    .totalObjectivesContainer{
        display: flex;
        width: 7vw;
        align-items: center ;
    }

    .iconTotalObjects{
        width: 0.9vw;
        height: 100%;
        display: inline-block;
    }

    .totalObjectives{
        text-align: center;
        font-size: 1vmax;
    }

    .bonus{
        width:100%;
        font-size: 0.7vmax;
        color: rgb(0, 197, 7);
        margin-top: 5px;
    }
    .malus{
        width:100%;
        font-size: 0.7vmax;
        color: rgb(187, 30, 22);
        margin-top: 5px;
    }
</style>