<script lang="ts">
    import Login from "../components/Login.svelte";
    import { currentUser } from "$lib/pocketbase";
</script>

<title>Platia</title>

<Login />

{#if $currentUser}
    <a href="/main">main</a>
{/if}
