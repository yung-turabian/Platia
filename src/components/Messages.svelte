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

  function scrollToBottom() {
    // Use setTimeout to allow DOM updates before scrolling
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }

  //setInterval(scrollToBottom, 1000);
  window.addEventListener("load", scrollToBottom);
</script>

<div class="relative" id="messages">
  {#each messages as message (message.id)}
    <div class="flex flex-row ml-12">
      <img
        class="avatar mr-6"
	      src={`https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${message.expand?.user?.username}`}
        alt="avatar"
        width="40px"
      />
      <div class="flex flex-col">
        <div class="flex flex-row">
          <p class="text-gray-900 dark:text-white mr-1">
            {message.expand?.user?.username}
          </p>
          <p class="text-gray-400 dark:text-gray-500 text-xs mt-1">
            {convertToLocal(message.created)}
          </p>
        </div>
        <p class="font-medium text-gray-900 dark:text-white">
          {message.message}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage} autocomplete="off" method="post">
    <input  autocomplete="new-password" placeholder="Message" type="text" bind:value={newMessage} />
    <button type="submit">Send</button>
</form>
