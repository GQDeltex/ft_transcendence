<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { socket } from '../../../plugin/socket';

const props = defineProps<{
  chatName: string;
}>();

let text: Ref<string> = ref('');
let messages: Ref<
  {
    from: { id?: number; username: string };
    to: { id?: number; username: string };
    msg: string;
  }[]
> = ref([]);

socket.on('prc', (data) => {
  console.log('Msg from: ', data);
  messages.value.push(data);
});

socket.on('status', (status) => {
  console.log(status);
  messages.value.push({
    from: { username: '' },
    to: { username: 'No one' },
    msg: status,
  });
});

function sendMsg() {
  if (text.value == '') return;
  console.log(props.chatName, text.value);
  socket.emit('prc', { to: props.chatName, msg: text.value });
  messages.value.push({
    from: { username: 'Me' },
    to: { username: props.chatName },
    msg: text.value,
  });
  text.value = '';
}

onUnmounted(() => socket.off('prc'));
</script>

<template>
  <div class="parent">
    <span class="chatname">chat: {{ chatName }}</span>
    <div class="messages">
      <span
        v-for="message in messages"
        :key="`msg_${message.from}_${message.to}_${message.msg}`"
        >{{ message.from.username }}: {{ message.msg }}<br
      /></span>
    </div>
    <div class="lower">
      <input
        v-model="text"
        alt="inputBox"
        type="text"
        class="text"
        @keyup.enter="sendMsg()"
      />
      <button class="sendbutton" @click="sendMsg()">Send</button>
    </div>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  border: 1px solid #202020;
  height: inherit;
  width: 60vw;
}
.chatname {
  color: #f8971d;
  padding: 1vw;
  font-size: 1vw;
}
.messages {
  height: 100%;
  border-top: 1px solid #202020;
  border-bottom: 1px solid #202020;
  font-size: 1vw;
  padding: 0.5vw;
}
.lower {
  display: flex;
  width: 100%;
}
.text {
  flex-grow: 1;
  font-size: 1vw;
}
.sendbutton {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  font-size: 1vw;
  border-color: transparent;
  cursor: pointer;
}
</style>
