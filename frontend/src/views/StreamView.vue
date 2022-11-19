<script setup lang="ts">
import ChildStreamComponent from '../components/stream/ChildStreamComponent.vue';
import PongComponent from '../components/game/PongComponent.vue';
import EndScreenComponent from '../components/game/EndScreenComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import { ref, computed, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { socket } from '@/service/socket';
import type { User } from '@/store/user';
import UserService from '@/service/UserService';

const games = ref<Game[]>([]);
const player1User = ref<User>({
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
const player2User = ref<User>({
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
const route = useRoute();
const routExist = computed(() => typeof route.params.id === 'undefined');
const displayEnd = ref(false);

const gameId = ref(0);
const loadedData = ref(false);

onUnmounted(() => {
  socket.emit('stream', { gameId: gameId.value, event: 'LEAVE' });
});

watch(
  () => route.params,
  () => {
    if (typeof route.params.id === 'undefined') return;
    gameId.value = +route.params.id;
    socket.emit(
      'stream',
      { gameId: gameId.value, event: 'JOIN' },
      async (data: { player1Id: number; player2Id: number }) => {
        player1User.value = await UserService.findOneById(data.player1Id);
        player2User.value = await UserService.findOneById(data.player2Id);
        loadedData.value = true;
      },
    );
  },
);

GameService.findAll('running').then(
  (fetchGames: Game[]) => (games.value = fetchGames),
);

GameService.findAll('paused').then(
  (fetchGames: Game[]) => (games.value = fetchGames),
);

socket.on('Game', async ({ gameId }) => {
  if (gameId < 0) {
    displayEnd.value = true;
    socket.emit('stream', { gameId: gameId.value, event: 'LEAVE' });
  }
});
</script>

<template>
  <div>
    <div v-if="routExist && !displayEnd">
      <h1 class="title">Stream Overview</h1>
      <ChildStreamComponent
        v-for="game in games"
        :key="game.id"
        :player1-name="game.player1.username"
        :player2-name="game.player2.username"
        :score1="game.score1"
        :score2="game.score2"
        :game-id="game.id"
      />
    </div>
    <div v-if="!routExist && !displayEnd">
      <PongComponent
        v-if="
          loadedData &&
          typeof player1User !== 'undefined' &&
          typeof player2User !== 'undefined'
        "
        :game-id="gameId"
        :host-player="player1User"
        :other-player="player2User"
        :priority="2"
      />
    </div>
    <EndScreenComponent v-if="displayEnd === true" :game-id="gameId" />
  </div>
</template>

<style scoped>
h1 {
  color: white;
  margin-left: 1ch;
}
</style>
