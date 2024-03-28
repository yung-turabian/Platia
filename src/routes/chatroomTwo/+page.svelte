<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";

</script>

<title>Channel 2</title>
<h1>Channel 2</h1>

{#if $currentUser}
    <Messages chatroom="chatroom2" />
{/if}
