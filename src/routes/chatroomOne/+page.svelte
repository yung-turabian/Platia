<script lang="ts">
    import Messages from "../../components/Messages.svelte";
    import Input from "../../components/Input.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<h1>Channel 1</h1>

{#if $currentUser}
    <Messages />
    <Input />
{/if}
