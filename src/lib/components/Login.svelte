<script lang="ts">
    import { goto } from "$app/navigation";
    import { currentUser, pb } from "$lib/pocketbase";
    import { Alert } from "flowbite-svelte";

    let username: string;
    let password: string;
    let error: string;

    async function login() {
        error = "";
        try {
            const user = await pb
                .collection("users")
                .authWithPassword(username, password);
            console.log(user);
        } catch (err) {
            console.log(err);
            error = "Incorrect username or password.";
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
            error = "User already exists.";
        }
    }

    function signOut() {
        pb.authStore.clear();
    }
</script>

<div class="container mx-auto mt-4 flex flex-wrap justify-center pt-16">
    <div
        class="w-full max-w-sm rounded-lg border border-gray-400 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
    >
        {#if $currentUser}
            <p
                class="mb-2 block pb-4 text-center text-lg font-medium text-gray-900 dark:text-gray-300"
            >
                Signed in as {$currentUser.username}
            </p>

            <button
                on:click={signOut}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Sign Out</button
            >
        {:else}
            <form
                on:submit|preventDefault
                autocomplete="on"
                method="post"
                class="space-y-6"
            >
                <div class="heading">
                    <a class="back" href="/"
                        ><i class="bi bi-arrow-left dark:text-white" /></a
                    >
                    <h2
                        class="text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Login
                    </h2>
                </div>

                <div>
                    <label
                        for="username"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Particpant ID</label
                    >
                    <input
                        type="username"
                        required
                        name="username"
                        placeholder="Username"
                        bind:value={username}
                        autocomplete="on"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                </div>

                <div>
                    <label
                        for="password"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Password</label
                    >
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                        autocomplete="off"
                        bind:value={password}
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
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
                    class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    on:click={login}>Log in</button
                >

                <button
                    type="submit"
                    class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    on:click={signUp}>Register</button
                >
            </form>
        {/if}
    </div>
</div>
