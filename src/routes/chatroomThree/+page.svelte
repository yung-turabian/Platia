<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Channel 3</title>
<h1>Channel 3</h1>

{#if $currentUser}
    <Messages chatroom="chatroom3" />  
{/if}
