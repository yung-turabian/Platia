<script>
    import Messages from "../../../components/Messages.svelte";
    import { currentUser } from '$lib/pocketbase';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>{data.post.name}</h1>

{#if $currentUser}
    <Messages chatroom={data.post.name} />
{/if}
