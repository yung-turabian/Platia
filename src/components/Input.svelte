<script lang='ts'>

import { currentUser, pb } from '../lib/pocketbase';
import { user } from 'Messages.svelte';

    let newMessage: string;

  async function sendMessage() {
    const data = {
      message: newMessage,
      user: $currentUser.id,
    };
    const createdMessage = await pb.collection('chatroom1').create(data);
    newMessage = '';
  }
</script>

<form on:submit|preventDefault={sendMessage}>
    <input placeholder="Message" type="text" bind:value={newMessage} />
    <button type="submit">Send</button>
</form>
