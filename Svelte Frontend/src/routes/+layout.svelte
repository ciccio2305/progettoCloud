<script>
    import HomepageLayout from "../components/layouts/HomepageLayout.svelte";
    import SideMenu from "../components/SideMenu.svelte";
    import Dashboard from "../components/Dashboard.svelte";
    import { page } from '$app/stores';
    import {refreshChatList} from "../services/stores.js";
    
    refreshChatList.subscribe(value => {
        if(value){
            refresh();
        }
        refreshChatList.set(false);
    })

    let unique = {};
    function refresh(){
        unique = {};
    }

</script>


<div class = "page">

    <HomepageLayout>
        {#if $page.url.pathname == "/" || $page.url.pathname == "/register" || $page.url.pathname == "/login"}
            <slot/>
        {:else}
            <SideMenu/> 
            <slot/>
        {/if}
        
    </HomepageLayout>
    
</div>





<style>
html, body{
        font-family: 'Montserrat';
    }
.page{
        background-color: rgb(230, 227, 223);
        min-height: 100%;
        min-width: 100%;
        overflow-y: hidden;
        
    }
    :global(.homePage){
        width: 100vw;
        height: 100vh;
        display: flex;
        
        }
        
</style>
