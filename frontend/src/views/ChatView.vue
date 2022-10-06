<script setup lang="ts">
import ChatChatComponent from '../components/ChatChatComponent.vue';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

socket.on('connect', function () {
  console.log('Connected');
  socket.emit(
    'privmsg',
    { recipient: 'test', message: 'hello there' },
    (data: any) => {
      console.log(data);
    },
  );
  socket.emit('privmsg', { recipient: 'test', message: '' }, (data: any) => {
    console.log(data);
  });
});

socket.on('events', function (data) {
  console.log('event', data);
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
