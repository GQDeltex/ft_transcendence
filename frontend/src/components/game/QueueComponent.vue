<script setup lang="ts">
import { onUnmounted, ref, nextTick, onMounted } from 'vue';
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
import type { Item } from '@/store/user';
import type { _RouteLocationBase } from 'vue-router';
import { useErrorStore } from '@/store/error';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const errorStore = useErrorStore();

const emits = defineEmits(['hide', 'unhide']);

const displayState = ref('queue');
const gameIdRef = ref(0);
const playerPriorityRef = ref(1);

const player1User = ref<{
  id: number;
  username: string;
  title: string[];
  picture: string;
  status?: string | undefined;
  equipped?: Item[];
}>({ id: 0, username: '', title: [''], picture: '', status: '', equipped: [] });
const player2User = ref<{
  id: number;
  username: string;
  title: string[];
  picture: string;
  status?: string | undefined;
  equipped?: Item[];
}>({ id: 0, username: '', title: [''], picture: '', status: '', equipped: [] });

function join_queue() {
  socket.emit('queue', { event: 'JOIN' });
}

function leave_queue() {
  socket.emit('queue', { event: 'LEAVE' });
}

async function getPlayerUsers(player1Id: number, player2Id: number) {
  try {
    player1User.value = await UserService.findOneById(player1Id);
    player2User.value = await UserService.findOneById(player2Id);
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
}

// playerIDs to check validity of messages for streaming implementation later™
socket.on('Game', async ({ gameId, player1Id, player2Id, priority }) => {
  if (gameId < 0) {
    displayState.value = 'end';
    return;
  }
  // console.log('ich will ein spiel mit dir spiel');
  await getPlayerUsers(player1Id, player2Id);
  await nextTick();
  gameIdRef.value = gameId;
  playerPriorityRef.value = priority;
  displayState.value = 'start';
  emits('hide');
});

const checkGame = async (url: _RouteLocationBase) => {
  if (typeof url.query.inviterId === 'string') {
    await nextTick();
    if (
      userStore.getGameRequestStatus(+url.query.inviterId) !==
        GameStatusEnum.RECEIVED ||
      !(await userStore.updateGameRequest(
        AllowedUpdateGameRequestMethod.ACCEPT,
        +url.query.inviterId,
      ))
    )
      await router.push({ name: 'ChatView' });
  } else if (typeof url.query.gameId === 'string') {
    await nextTick();
    socket.emit('inviteReady', { gameId: +url.query.gameId });
  } else {
    join_queue();
  }
};

onMounted(async () => {
  await checkGame(route);
});

onUnmounted(() => {
  leave_queue();
  emits('unhide');
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
  border: 16px solid var(--main-1-color);
  border-top: 16px solid var(--main-3-color);
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
