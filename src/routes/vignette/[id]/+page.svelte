<script>
    import { currentUser, pb } from "$lib/pocketbase";
    import Choice from "$lib/components/Choice.svelte";
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>{data.post.title}</h1>
<p>{data.post.content}</p>
<Choice />

<a
    href="/main"
    class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >continue</a
>
