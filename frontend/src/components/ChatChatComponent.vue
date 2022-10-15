<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { socket } from '../plugins/socket';

const props = defineProps<{
  chatName: string;
}>();

let text: Ref<string> = ref('');
let messages: Ref<
  {
    from: { id: number; username: string };
    to: { id: number; username: string };
    msg: string;
  }[]
> = ref([]);

socket.on('prc', (data) => {
  console.log('Msg from: ', data);
  messages.value.push(data);
});

function sendMsg() {
  console.log(props.chatName, text.value);
  socket.emit('prc', { to: props.chatName, msg: text.value });
  text.value = '';
}

onUnmounted(() => socket.off('prc'));
</script>

<template>
  <div class="parent">
    <span class="chatname">{{ chatName }}</span>
    <div class="messages">
      <span
        v-for="message in messages"
        :key="`msg_${message.from}_${message.to}_${message.msg}`"
        >{{ message.from.username }}: {{ message.msg }}<br
      /></span>
    </div>
    <div class="lower">
      <input v-model="text" type="text" class="text" @keyup.enter="sendMsg()" />
      <button class="sendbutton" @click="sendMsg()">Send</button>
    </div>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  background-color: #202020;
  align-items: center;
  min-width: 50%;
  flex-grow: inherit;
}
.chatname {
  color: #f8971d;
  margin-left: 9px;
  margin-right: 9px;
  margin-top: 9px;
  margin-bottom: 9px;
  background-color: black;
  display: flex;
  justify-content: center;
  font-size: 2em;
}
.messages {
  margin-left: 9px;
  margin-right: 9px;
  background-color: black;
  min-height: 500px;
}
.lower {
  margin-left: 9px;
  margin-right: 9px;
  margin-top: 9px;
  margin-bottom: 9px;
  background-color: black;
  display: flex;
}
.text {
  flex-grow: 1;
}
.sendbutton {
  text-decoration: none;
  color: white;
  background-color: grey;
}
</style>
