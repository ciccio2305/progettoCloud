<script>
    import { Hour} from "../../../services/stores";
    import { Minute } from "../../../services/stores";
    const selectMenu = document.querySelectorAll("select");
    let optionsHour = [];
    let optionsMinute = [];
    let currentTime=new Date();
    let selectedOptionHour = currentTime.getHours();
    let selectedOptionMinute = currentTime.getMinutes();

    for(let i=0; i<=23; i++){
        i= i<10? "0" + i : i;
        optionsHour.push(`<option value="${i}">${i}</option>`);
    }

    for(let i=0; i<=59; i++){
        i=i<10 ? "0" + i : i;
        optionsMinute.push(`<option value="${i}">${i}</option>`);
    }

    function handleSelectChangeHour(event) {
        selectedOptionHour = event.target.value;
        Hour.set(selectedOptionHour);
    }

    function handleSelectChangeMinute(event) {
        selectedOptionMinute = event.target.value;
        Minute.set(selectedOptionMinute);
    }


</script>

<div class="currentTime">{selectedOptionHour}:{selectedOptionMinute}</div>
<div class="buttonHours">
    <select name="Hour" id="Hour" value="Ora" on:change={handleSelectChangeHour}>
        <option value="Ora" selected hidden>Ora</option>
        {@html optionsHour.join('')}
    </select>
    <select name="Minute" id="Minute" value="Minuto" on:change={handleSelectChangeMinute}>
        <option value="Minuto" selected hidden>Minuto</option>
        {@html optionsMinute.join('')}
    </select>
</div>


<style>

    .currentTime{
        width:100%;
        height: 60%;

        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: bolder;
        font-size:large;
    }

    .buttonHours{
        width:100%;
        height: 40%;

        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    #Hour{
        width: 50%;
        height: 100%;
    }

    #Minute{
        width: 50%;
        height: 100%;
    }

    select{
        text-align: center;
    }
</style>