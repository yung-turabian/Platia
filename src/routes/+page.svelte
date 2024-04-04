<script lang="ts">
    import Login from "$lib/components/Login.svelte";
    import { currentUser } from "$lib/pocketbase";
    import { pb } from "$lib/pocketbase";
</script>

<title>Platia</title>

<Login />

{#if $currentUser}
    <body>
        <div class="container mx-auto mt-4 flex flex-wrap justify-center pt-4">
            <div
            class="w-full max-w-sm rounded-lg border border-gray-400 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
            >
            <h1 class="w-full rounded-lg px-5 py-2.5 
            text-center text-3xl font-bold dark:text-white text-black"
            >Welcome!</h1>
            <p class="w-full rounded-lg px-5 py-2.5 
            text-left text-sm font-medium dark:text-white text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Pretium lectus quam id leo in vitae turpis. 
                Commodo sed egestas egestas fringilla phasellus faucibus 
                scelerisque eleifend. Id aliquet risus feugiat in ante metus dictum. 
                Augue neque gravida in fermentum et sollicitudin. Pharetra diam sit amet 
                nisl suscipit adipiscing bibendum est. Diam quam nulla porttitor massa. 
                Integer feugiat scelerisque varius morbi. Mi ipsum faucibus vitae aliquet 
                nec ullamcorper sit amet risus. Morbi quis commodo odio aenean. 
                Aliquam ut porttitor leo a diam sollicitudin. Diam maecenas ultricies mi 
                eget mauris pharetra et ultrices neque. Purus gravida quis blandit turpis c
                ursus in hac habitasse platea. Sem integer vitae justo eget magna. 
                Lacinia quis vel eros donec ac odio.</p>
            <h2 class="w-full rounded-lg px-5 py-2.5 
            text-center text-2xl font-semibold dark:text-white text-black">
            Instructions</h2>
            <p class="w-full rounded-lg px-5 py-2.5 pb-14
            text-left text-sm font-medium dark:text-white text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Pretium lectus quam id leo in vitae turpis. 
                Commodo sed egestas egestas fringilla phasellus faucibus 
                scelerisque eleifend. Id aliquet risus feugiat in ante metus dictum. 
                Augue neque gravida in fermentum et sollicitudin. Pharetra diam sit amet 
                nisl suscipit adipiscing bibendum est. Diam quam nulla porttitor massa. 
                Integer feugiat scelerisque varius morbi. Mi ipsum faucibus vitae aliquet 
                nec ullamcorper sit amet risus. Morbi quis commodo odio aenean. 
                Aliquam ut porttitor leo a diam sollicitudin. Diam maecenas ultricies mi 
                eget mauris pharetra et ultrices neque. Purus gravida quis blandit turpis c
                ursus in hac habitasse platea. Sem integer vitae justo eget magna. 
                Lacinia quis vel eros donec ac odio.</p>
            <a href="/vignette/egmpdb5wxn0i5ds">
                <button
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5
                text-center text-sm font-medium text-white hover:bg-blue-800 
                focus:ring-4 focus:ring-blue-300 
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Begin</button>
            </a>
            </div>
        </div>
    </body>
{/if}
