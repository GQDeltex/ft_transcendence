<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '@/service/socket';
import PongComponent from './PongComponent.vue';
import UserService from '@/service/UserService';
import {
  AllowedUpdateGameRequestMethod,
  GameStatusEnum,
  useUserStore,
} from '@/store/user';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
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

async function getPlayerUsers(player1Id: number, player2Id: number) {
  player1User.value = await UserService.findOneById(player1Id);
  // player1User.value.status = 'in game';
  // console.log("player 1", player1User);
  player2User.value = await UserService.findOneById(player2Id);
  // player2User.value.status = 'in game';
  // console.log("player 2", player2User);
}

// playerIDs to check validity of messages for streaming implementation later™
socket.on('Game', async ({ gameId, player1Id, player2Id, priority }) => {
  if (gameId < 0) {
    displayState.value = true;
    return;
  }
  console.log('ich will ein spiel mit dir spiel');
  // player1IdRef.value = player1Id;
  // player2IdRef.value = player2Id;
  // getPlayers(player1Id, player2Id);
  await getPlayerUsers(player1Id, player2Id);
  gameIdRef.value = gameId;
  playerPriorityRef.value = priority;
  displayState.value = false;
});

onMounted(async () => {
  if (typeof route.query.inviterId === 'string') {
    if (
      userStore.getGameRequestStatus(+route.query.inviterId) !==
      GameStatusEnum.RECEIVED
    )
      await router.push({ name: 'ChatView' });
    await userStore.updateGameRequest(
      AllowedUpdateGameRequestMethod.ACCEPT,
      +route.query.inviterId,
    );
  }

  if (typeof route.query.gameId === 'string') {
    socket.emit('inviteReady', { gameId: +route.query.gameId });
  }
});

onUnmounted(() => {
  socket.off('Game');
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
