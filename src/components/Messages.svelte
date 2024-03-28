<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { currentUser, pb } from '$lib/pocketbase';

  export let chatroom: string;
  
  let newMessage: string;
  let messages: any[] = [];
  let unsubscribe: () => void;

  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection(chatroom).getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultList.items;

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection(chatroom)
      .subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          // Fetch associated user
          const user = await pb.collection('users').getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
        }
        if (action === 'delete') {
          messages = messages.filter((m) => m.id !== record.id);
        }
      });
  });

  // Unsubscribe from realtime messages
  onDestroy(() => {
    unsubscribe?.();
  });

  async function sendMessage() {
    const data = {
      message: newMessage,
      user: $currentUser.id,
    };

    if (newMessage.trim()) {
      const createdMessage = await pb.collection(chatroom).create(data);
    }
    newMessage = '';
  }

  function convertToLocal(UTC : string) {
    const utcWOMillis = UTC.slice(0, -5) + "Z";
    const utcDate = new Date(utcWOMillis);
    const offsetMins = utcDate.getTimezoneOffset();
    const localTime = new Date(utcDate.getTime() - offsetMins * 60 * 1000);
    return localTime.toLocaleString();
  }
</script>

<div class="messages">
  {#each messages as message (message.id)}
    <div class="msg">
      <img
        class="avatar"
	      src={`https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${message.expand?.user?.username}`}
        alt="avatar"
        width="40px"
      />
      <div>
        <small>
          Sent by @{message.expand?.user?.username}
          <br> {convertToLocal(message.created)}
        </small>
        <p class="msg-text">{message.message}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage} autocomplete="off" method="post">
    <input  autocomplete="new-password" placeholder="Message" type="text" bind:value={newMessage} />
    <button type="submit">Send</button>
</form>
