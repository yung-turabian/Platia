<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";
    import Login from "../../components/Login.svelte";
</script>

<h1>Channel 1</h1>

<Login />

{#if $currentUser}
    <Messages />
{/if}
