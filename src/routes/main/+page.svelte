<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Platia</title>

{#if $currentUser}
    <Messages chatroom="chatroom" />
{/if}
