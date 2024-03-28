<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Channel 4</title>
<h1>Channel 4</h1>

{#if $currentUser}
    <Messages chatroom="chatroom4" />  
{/if}
