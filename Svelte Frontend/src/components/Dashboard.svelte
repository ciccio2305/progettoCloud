<script>
    import TopTab from "./dashboardComponents/TopTab.svelte";
    import LeftTab from "./dashboardComponents/LeftTab.svelte";
    import RightTab from "./dashboardComponents/RightTab.svelte";
</script>

<div id="dashboardContainer">
    <TopTab/>
    <LeftTab/>
    <RightTab/>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
    *{
        font-family: 'Montserrat';
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    #dashboardContainer{
        width: 100%;
        height: 100%;
        background-color: rgba(188, 197, 240, 0.5);
    }

    @media(max-width: 1100px){
        #dashboardContainer{
            width: 100%;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(188, 197, 240, 0.5);
            overflow-y: scroll;
        }

    }
</style>