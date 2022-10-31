<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '@/service/socket';
import PongComponent from './PongComponent.vue';
import EndScreenComponent from './EndScreenComponent.vue';
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

const displayState = ref('queue');
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
  player2User.value = await UserService.findOneById(player2Id);
}

// playerIDs to check validity of messages for streaming implementation later™
socket.on('Game', async ({ gameId, player1Id, player2Id, priority }) => {
  if (gameId < 0) {
    displayState.value = 'end';
    return;
  }
  console.log('ich will ein spiel mit dir spiel');
  await getPlayerUsers(player1Id, player2Id);
  gameIdRef.value = gameId;
  playerPriorityRef.value = priority;
  displayState.value = 'start';
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
  } else if (typeof route.query.gameId === 'string') {
    socket.emit('inviteReady', { gameId: +route.query.gameId });
  } else {
    join_queue();
  }
});

onUnmounted(() => {
  leave_queue();
  socket.off('Game');
});
</script>

<template>
  <div v-if="displayState === 'queue'" class="parent">
    <p class="saving">In Queue<span>.</span><span>.</span><span>.</span></p>
    <div class="loader"></div>
  </div>
  <EndScreenComponent v-else-if="displayState === 'end'" :game-id="gameIdRef" />
  <PongComponent
    v-else
    :game-id="gameIdRef"
    :priority="playerPriorityRef"
    :player1-i-d="player1User"
    :player2-i-d="player2User"
  />
</template>

<style scoped>
.parent {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loader {
  border: 16px solid #f8971d;
  border-top: 16px solid gray;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.saving {
  font-size: 5em;
  margin-bottom: 0.3em;
}

.saving span {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.saving span:nth-child(2) {
  animation-delay: 0.2s;
}

.saving span:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
