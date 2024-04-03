<script>
    import Messages from "$lib/components/Messages.svelte";
    import { currentUser } from "$lib/pocketbase";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

{#if $currentUser}
    <Messages chatroom={data.post.name} />
{/if}
