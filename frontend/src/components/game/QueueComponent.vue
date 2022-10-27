<script setup lang="ts">
import { ref } from 'vue';
import { socket } from '../../service/socket';
import PongComponent from './PongComponent.vue';

const displayState = ref(true);
const gameIdRef = ref(0);

function join_queue() {
  socket.emit('queue', { event: 'JOIN' });
}
function leave_queue() {
  socket.emit('queue', { event: 'LEAVE' });
}

socket.on('Game', ({ gameId, player1Id, player2Id }) => {
  console.log('ich will ein spiel mit dir spielen');
  gameIdRef.value = gameId;
  displayState.value = false;
});
</script>

<template>
  <div v-if="displayState">
    <button @click="join_queue">JOIN Queue</button>
    <button @click="leave_queue">leave Queue</button>
  </div>
  <PongComponent v-else :game-id="gameIdRef" />
</template>
