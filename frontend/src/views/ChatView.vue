<script setup lang="ts">
import ChatChatComponent from '../components/ChatChatComponent.vue';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080', { withCredentials: true });

socket.on('connect', function () {
  console.log('Connected');
});

socket.on('prc', function (data) {
  console.log('prc', data);
});

socket.on('exception', function (data) {
  console.log('exception: ', data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});
</script>

<template>
  <div class="parent">
    <ChatChatComponent chat-name="gucalvi" class="chatchatcomp" />
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 2em;
}
.chatchatcomp {
  max-width: 80%;
}
</style>
