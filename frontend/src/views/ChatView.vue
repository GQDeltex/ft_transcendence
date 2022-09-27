<script setup lang="ts">
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

socket.on('connect', function () {
  console.log('Connected');
  socket.emit('events', { test: 'test' });
  socket.emit('identity', 0, (response) => console.log('Identity:', response));
});

socket.on('events', function (data) {
  console.log('event', data);
});

socket.on('exception', function (data) {
  console.log('event', data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});
</script>

<template>
  <h1>Chat View (PRC)</h1>
</template>

<style scoped></style>
