<script lang="ts">

import "../app.pcss";

import { DarkMode, Navbar } from 'flowbite-svelte';

let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';	

</script>
<DarkMode {btnClass}></DarkMode>
<a class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
href="/">BACK</a>


<slot />