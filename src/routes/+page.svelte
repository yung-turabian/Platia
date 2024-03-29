<script lang="ts">
    import Login from "../components/Login.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Platia</title>

<Login />

{#if $currentUser}
    <a href="/chatroomOne">chatroom 1</a>
    <a href="/chatroomTwo">chatroom 2</a>
    <a href="/chatroomThree">chatroom 3</a>
    <a href="/chatroomFour">chatroom 4</a>
    <a href="/chatroomFive">chatroom 5</a>
{/if}
