<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { currentUser, pb } from '../lib/pocketbase';

  let newMessage: string;
  let messages = [];
  let unsubscribe: () => void;

  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection('chatroom1').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultList.items;

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection('chatroom1')
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
    console.log("sent");
    const data = {
      message: newMessage,
      user: $currentUser.id,
    };
    const createdMessage = await pb.collection('chatroom1').create(data);
    newMessage = '';
  }
</script>

<div class="messages">
  {#each messages as message (message.id)}
    <div class="msg">
      <img
        class="avatar"
	      src={`https://api.dicebear.com/8.x/bottts/svg?seed=${message.expand?.user?.username}`}
        alt="avatar"
        width="40px"
      />
      <div>
        <small>
          Sent by @{message.expand?.user?.username}
        </small>
        <p class="msg-text">{message.message}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
    <input placeholder="Message" type="text" bind:value={newMessage} />
    <button type="submit">Send</button>
</form>
