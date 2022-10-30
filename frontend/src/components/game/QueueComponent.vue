<script setup lang="ts">
import { ref } from 'vue';
import { socket } from '../../service/socket';
import PongComponent from './PongComponent.vue';
import EndScreenComponent from './EndScreenComponent.vue';
import Queue from './queue';


// const displayState = ref(true);
const displayState = ref('queue');
const gameIdRef = ref(0);
const playerPriorityRef = ref(false);

function leave_queue() {
  socket.emit('queue', { event: 'LEAVE' });
}

// playerIDs to check validity of messages for streaming implementation later™
socket.on('Game', ({ gameId, player1Id, player2Id, priority }) => {
  if (gameId < 0) {
    // displayState.value = true;
    displayState.value = 'end';
    return;
  }
//   displayState.value = false;
  displayState.value = 'start';
  console.log('ich will ein spiel mit dir spielen');
  gameIdRef.value = gameId;
  playerPriorityRef.value = priority;
});

</script>

<template>
  <!-- <div v-if="displayState"> -->
  <div v-if="displayState === 'queue'">
    <button @click="Queue.join_queue()">JOIN Queue</button>
    <button @click="leave_queue">leave Queue</button>
  </div>
  <!-- <EndScreenComponent v-else-if :game-id="gameIdRef" :priority="playerPriorityRef" /> -->
  <!-- <PongComponent v-else :game-id="gameIdRef" :priority="playerPriorityRef" /> -->
  <EndScreenComponent v-else-if="displayState === 'end'" :game-id="gameIdRef" :priority="playerPriorityRef" />
  <PongComponent v-else :game-id="gameIdRef" :priority="playerPriorityRef" />
</template>
