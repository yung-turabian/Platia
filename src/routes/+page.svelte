<script lang="ts">
    import Login from "../components/Login.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Platia</title>

<Login />

{#if $currentUser}
    <a href="/chatroomOne">chatroom 1</a>
    <a href="/chatroomOne">chatroom 2</a>
    <a href="/chatroomOne">chatroom 3</a>
    <a href="/chatroomOne">chatroom 4</a>
    <a href="/chatroomOne">chatroom 5</a>
{/if}
