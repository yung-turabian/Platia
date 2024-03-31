<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Platia - Channel 1</title>

{#if $currentUser}
    <Messages chatroom="chatroom1" />
{/if}
