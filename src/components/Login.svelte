<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentUser, pb } from "../lib/pocketbase";
    import { Alert } from 'flowbite-svelte';

    let username: string;
    let password: string;
    let error: string;

    async function login() {
        error = '';
        try {
            const user = await pb
                .collection("users")
                .authWithPassword(username, password);
            console.log(user);
        } catch (err) {
            console.log(err);
            error = 'Incorrect username or password.';
        }
    }

    async function signUp() {
        try {
            const data = {
                username,
                password,
                passwordConfirm: password,
                name: username,
            };
            const createdUser = await pb.collection("users").create(data);
            await login();
        } catch (err) {
            console.error(err);
            error = 'User already exists.';
        }
    }

    function signOut() {
        pb.authStore.clear();
    }
</script>

<div class="container mt-4 flex flex-wrap justify-center mx-auto pt-16">
    <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full">
        {#if $currentUser}
            <p class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 text-center pb-4">
                Signed in as {$currentUser.username}
            </p>

            <button 
            on:click={signOut}
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Sign Out</button>
        {:else}
            <form on:submit|preventDefault autocomplete="on" method="post" class="space-y-6">
                <div class="heading">
                    <a class="back" href="/"><i class="bi bi-arrow-left dark:text-white" /></a>
                    <h2 class="text-xl font-medium text-gray-900 dark:text-white">Login</h2>
                </div>

                <div>
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Username</label>
                    <input
                        type="username"
                        required
                        name="username"
                        placeholder="Username"
                        bind:value={username}
                        autocomplete="on"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>

                <div>
                    <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Password</label
                    >
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                        autocomplete="off"
                        bind:value={password}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                {#if error}
				<div class="mt-6">
					<Alert alertId="alert-red" color="red" closeBtn>
						{error}
					</Alert>
				</div>
			    {/if}
                <button 
                    type="submit"
				    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    on:click={login}
                >Log in</button
                >

                <button
				type="submit"
				class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				on:click={signUp}
                >Register</button
			    >
            </form>
        {/if}
    </div>
</div>