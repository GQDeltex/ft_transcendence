<script setup lang="ts">
import { socket } from '../../service/socket';
function join_queue() {
  socket.emit('queue', { event: 'JOIN' });
}
function leave_queue() {
  socket.emit('queue', { event: 'LEAVE' });
}

socket.on('Game', () => {
  console.log('ich will ein spiel mit dir spielen');
});
</script>

<template>
  <button @click="join_queue">JOIN Queue</button>
  <button @click="leave_queue">leave Queue</button>
</template>
