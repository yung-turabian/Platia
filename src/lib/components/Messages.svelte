<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { currentUser, pb } from '$lib/pocketbase';
   import { fade } from 'svelte/transition';

  export let chatroom: string;
  
  let newMessage: string;
  let messages: any[] = [];
  let messagesLoaded = false;
  let unsubscribe: () => void;
  let showScrollButton = false;

  let inBrowser = typeof window !== 'undefined';

  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection(chatroom).getList(1, 100, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultList.items;
    messagesLoaded = true;
    scrollToBottom();

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection(chatroom)
      .subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          // Fetch associated user
          const user = await pb.collection('users').getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
          if (!showScrollButton) {
            scrollToBottom();
          }
          
        }
        if (action === 'delete') {
          messages = messages.filter((m) => m.id !== record.id);
        }
      });
  });

  // Unsubscribe from realtime messages
  onDestroy(() => {
    unsubscribe?.();
    if (inBrowser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  function handleScroll() {
    let scrollTop = window.scrollY;
    let windowHeight = window.innerHeight;
    let fullHeight = document.body.offsetHeight;

    // Check if the scroll is within a certain range from the bottom
    if (scrollTop + windowHeight >= fullHeight) {
      // User is near the bottom, hide scroll button
      showScrollButton = false;
    } else {
      // User is away from the bottom, show scroll button
      showScrollButton = true;
    }
  }

  // Function to scroll to the bottom of the page
  function scrollToBottom() {
    // Use setTimeout to allow DOM updates before scrolling
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }

  async function sendMessage() {
    const data = {
      message: newMessage,
      user: $currentUser.id,
    };


    if (newMessage.trim()) {
      newMessage = '';
      const createdMessage = await pb.collection(chatroom).create(data);
    }
    newMessage = '';
  }

  function UTCtoLocal(timestamp: string): string {
    const utcDate = new Date(timestamp);
    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    
    const isToday = utcDate.getDate() === currentDate.getDate() &&
                    utcDate.getMonth() === currentDate.getMonth() &&
                    utcDate.getFullYear() === currentDate.getFullYear();
    

    const isYesterday = utcDate.getDate() === yesterdayDate.getDate() &&
                        utcDate.getMonth() === yesterdayDate.getMonth() &&
                        utcDate.getFullYear() === yesterdayDate.getFullYear();
    
    const timeString = utcDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: true }).replace(/:\d+\s/, ' ');

    if (!isToday) {
      if (isYesterday) {
        return 'Yesterday'
      }
      const dateString = utcDate.toLocaleDateString('en-US', { timeZone: 'America/New_York' });
      return `${dateString}`;
    }
    
    return timeString;
  }

</script>

{#if !messagesLoaded}
  <!-- Loading screen -->
{:else}
<div class="relative" id="messages" transition:fade={{ delay: 250, duration: 300 }}>
  {#each messages as message (message.id)}
    <div class="ml-12 mt-8">
        <div class="flex flex-row items-center">
          <img
          class="mr-6"
          src={`https://api.dicebear.com/8.x/icons/svg?seed=${message.expand?.user?.username}`}
          alt="avatar"
          width="40px"
          />
          <p class="italic text-gray-900 dark:text-white mr-2">
            {message.expand?.user?.username}
          </p>
          <p class="text-gray-400 dark:text-gray-500 text-xs">
            {UTCtoLocal(message.created)}
          </p>
        </div>

        <p class="font-sans ml-16 text-gray-900 dark:text-white">
          {@html message.message.replace(/(@\w+)/g, '<span class="text-blue-500">$1</span>')}
        </p>
    </div>
  {/each}
</div>

{#if messagesLoaded && showScrollButton}
    <!-- Scroll button -->
    <button 
    transition:fade
    class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 px-3 py-2 rounded-full" on:click={scrollToBottom}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.278 2.231a1.001 1.001 0 0 0-.64-.231H5a2 2 0 0 0-2 2v7.21a2 2 0 0 0 1.779 1.987L12 14v6a2 2 0 0 0 4 0V8l3.03 1.212a2.001 2.001 0 0 0 2.641-1.225l.113-.34a.998.998 0 0 0-.309-1.084l-5.197-4.332z"/></svg>
    </button>
{/if}


<div class="mt-4 mx-auto pb-8 justify-center" transition:fade={{ delay: 250, duration: 300 }}>
  <form on:submit|preventDefault={sendMessage} autocomplete="off" method="post" 
  class="flex items-center space-x-4 w-1/2 mx-auto">
      <input  autocomplete="off" 
      placeholder="Message" 
      type="text" bind:value={newMessage} 
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      />
      <button type="submit"
      class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >Send</button>
  </form>
</div>
{/if}
