<script setup lang="ts">
import { ref } from 'vue';
import { socket } from '../../service/socket';
import PongComponent from './PongComponent.vue';
import UserService from '@/service/UserService';

const displayState = ref(true);
const gameIdRef = ref(0);
const playerPriorityRef = ref(false);

const player1User = ref<{
  id: number;
  username: string;
  title: string[];
  picture: string;
  status?: string | undefined;
}>({ id: 0, username: '', title: [''], picture: '', status: '' });
const player2User = ref<{
  id: number;
  username: string;
  title: string[];
  picture: string;
  status?: string | undefined;
}>({ id: 0, username: '', title: [''], picture: '', status: '' });

function join_queue() {
  socket.emit('queue', { event: 'JOIN' });
}
function leave_queue() {
  socket.emit('queue', { event: 'LEAVE' });
}

async function gettem(player1Id: number, player2Id: number) {
  player1User.value = await UserService.findOneById(player1Id);
  player1User.value.status = "in game";
  console.log(player1User);
  player2User.value = await UserService.findOneById(player2Id);
  player2User.value.status = "in game";
  console.log(player2User);
}

// playerIDs to check validity of messages for streaming implementation later™
socket.on('Game', ({ gameId, player1Id, player2Id, priority }) => {
  if (gameId < 0) {
    displayState.value = true;
    return;
  }
  displayState.value = false;
  console.log('ich will ein spiel mit dir spielen');
  // player1IdRef.value = player1Id;
  // player2IdRef.value = player2Id;
  // getPlayers(player1Id, player2Id);
  gettem(player1Id, player2Id);
  gameIdRef.value = gameId;
  playerPriorityRef.value = priority;
});
</script>

<template>
  <div v-if="displayState">
    <button @click="join_queue">JOIN Queue</button>
    <button @click="leave_queue">leave Queue</button>
  </div>
  <PongComponent
    v-else
    :game-id="gameIdRef"
    :priority="playerPriorityRef"
    :player1-i-d="player1User"
    :player2-i-d="player2User"
  />
</template>
