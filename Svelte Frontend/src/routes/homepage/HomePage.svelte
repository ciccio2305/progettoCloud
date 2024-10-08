<script>
    import SideMenu from "../../components/SideMenu.svelte";
    import Dashboard from "../../components/Dashboard.svelte";
    
</script>

<Dashboard/> 

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
</style>