<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Platia - Channel 1</title>
<h1>Channel 1</h1>

<a href="/">BACK</a>

{#if $currentUser}
    <Messages chatroom="chatroom1" />
{/if}
