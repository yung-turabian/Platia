<script lang="ts">
    import Login from "$lib/components/Login.svelte";
    import { currentUser } from "$lib/pocketbase";
    import { pb } from "$lib/pocketbase";
</script>

<title>Platia</title>

<Login />

{#if $currentUser}
    <a
        href="/main"
        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >continue</a
    >
{/if}
