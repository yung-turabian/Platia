<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Channel 5</title>
<h1>Channel 5</h1>

{#if $currentUser}
    <Messages chatroom="chatroom5" />  
{/if}
