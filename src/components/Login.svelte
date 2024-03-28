<script lang="ts">
    import { currentUser, pb } from "../lib/pocketbase";

    let username: string;
    let password: string;

    async function login() {
        const user = await pb
            .collection("users")
            .authWithPassword(username, password);
        console.log(user);
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
        }
    }

    function signOut() {
        pb.authStore.clear();
    }
</script>

{#if $currentUser}
    <p>
        Signed in as {$currentUser.username}
        <button on:click={signOut}>Sign Out</button>
    </p>
{:else}
    <form on:submit|preventDefault autocomplete="on" method="post">
        <input placeholder="Username" type="text" bind:value={username}  autocomplete="on"/>

        <input placeholder="Password" type="password" bind:value={password} autocomplete="off"/>
        <button on:click={signUp}>Sign Up</button>
        <button on:click={login}>Login</button>
    </form>
{/if}
