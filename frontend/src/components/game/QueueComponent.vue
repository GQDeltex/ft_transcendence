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
import type { User } from '@/store/user';
import type { _RouteLocationBase } from 'vue-router';
import { useErrorStore } from '@/store/error';
import { Priority } from '@/components/game/ball';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const errorStore = useErrorStore();

const emits = defineEmits(['hide', 'show']);

enum DisplayState {
  QUEUE = 0,
  START = 1,
  END = 2,
}

const displayState = ref(DisplayState.QUEUE);
const gameId = ref(0);
const playerPriority = ref(Priority.HOST);

const hostPlayer = ref<User>({
  id: 0,
  campus: '',
  coalition: '',
  country: '',
  firstname: '',
  intra: '',
  lastname: '',
  points: 0,
  username: '',
  title: [''],
  picture: '',
  status: '',
  equipped: [],
});
const otherPlayer = ref<User>({
  campus: '',
  coalition: '',
  country: '',
  firstname: '',
  intra: '',
  lastname: '',
  points: 0,
  id: 0,
  username: '',
  title: [''],
  picture: '',
  status: '',
  equipped: [],
});

async function getPlayerUsers(player1Id: number, player2Id: number) {
  try {
    hostPlayer.value = await UserService.findOneById(player1Id);
    otherPlayer.value = await UserService.findOneById(player2Id);
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
}

socket.on(
  'Game',
  async (gamePayload: {
    gameId: number;
    player1Id: number;
    player2Id: number;
    priority: Priority;
  }) => {
    if (gamePayload.gameId < 0) {
      displayState.value = DisplayState.END;
      return;
    }

    await getPlayerUsers(gamePayload.player1Id, gamePayload.player2Id);
    await nextTick();
    gameId.value = gamePayload.gameId;
    playerPriority.value = gamePayload.priority;
    displayState.value = DisplayState.START;
    emits('hide');
  },
);

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
    socket.emit('queue', { event: 'JOIN' });
  }
};

onMounted(async () => {
  await checkGame(route);
});

onUnmounted(() => {
  socket.emit('queue', { event: 'LEAVE' });
  emits('show');
});
</script>

<template>
  <div v-if="displayState === DisplayState.QUEUE" class="parent">
    <p class="saving">In Queue<span>.</span><span>.</span><span>.</span></p>
    <div class="loader"></div>
  </div>
  <EndScreenComponent
    v-else-if="displayState === DisplayState.END"
    :game-id="gameId"
  />
  <PongComponent
    v-else
    :game-id="gameId"
    :priority="playerPriority"
    :host-player="hostPlayer"
    :other-player="otherPlayer"
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
  border: 16px solid #c00000;
  border-top: 16px solid white;
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
  color: white;
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
