<script>
    import TitleTab from "./fileManagerComponents/TitleTab.svelte";
    import InfoTab from "./fileManagerComponents/InfoTab.svelte";
    import ListFile from "./fileManagerComponents/ListFile.svelte";
</script>

<div id="fileContainer">
    <TitleTab/>
    <InfoTab/>
    <ListFile/>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');
    *{
        font-family: 'Montserrat';
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    #fileContainer{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
</style>