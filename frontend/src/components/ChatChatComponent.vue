<script setup lang="ts">
import { io } from 'socket.io-client';
import { ref } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
  chatName: string;
}>();
const socket = io('http://localhost:8080', { withCredentials: true });
let message: Ref<string> = ref('');

function sendMsg() {
  console.log(props.chatName, message.value);
  socket.emit('prc', { to: props.chatName, msg: message.value });
}
</script>

<template>
  <div class="parent">
    <span class="chatname">{{ chatName }}</span>
    <span class="messages">{{ message }}</span>
    <div class="lower">
      <input v-model="message" type="text" class="text" />
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
  display: flex;
  justify-content: end;
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
