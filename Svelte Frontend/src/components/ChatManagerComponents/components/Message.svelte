<script>
    export let text;
    export let time;
    export let user = "";
</script>

<div class="message">
    <div class="{user === 'sender' ? 'senderBubble' : 'recipientBubble'}">
        {#if text.includes("base64,")}
            <img src={text}/>
        {:else}
            <div id="text">{text}</div>
        {/if}
            
        <div class="disable-select" id="time">{time}</div>
    </div>
</div>
                    

<style>
    .message {
        width: 100%;
        margin-bottom: 15px;
    }
    
    :global(.senderBubble) {
        position: relative;
        height: 100%;
        background-color:#bcc5f0cc;
        border-radius: 10px;
        border-bottom-right-radius: 5px;
        padding: 10px;
        max-width: 75%;
        min-width: 70px;
        margin-right: 10px;
        float: right;
        overflow-wrap: break-word;
    }

    :global(.recipientBubble) {
        position: relative;
        height: 100%;
        background-color:#c2c2c2;
        border-radius: 10px;
        border-bottom-left-radius: 5px;
        padding: 10px;
        max-width: 75%;
        min-width: 70px;
        float: left;
        overflow-wrap: break-word;
    }

    .disable-select {
        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }

    #text {
        margin-bottom: 20px;
    }
    #time {
        position: absolute;
        font-size: 13px;
        width: fit-content;
        right: 5px;
        bottom: 5px;
    }

    img {
        width: 95%;
        height: 95%;
        border-radius: 5px;
    }
</style>