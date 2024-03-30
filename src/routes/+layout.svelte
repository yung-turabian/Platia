<script lang="ts">

import "../app.pcss";

import { DarkMode, Navbar } from 'flowbite-svelte';

let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';	

</script>

<DarkMode {btnClass}></DarkMode>

<slot />