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
import { useI18n } from 'vue-i18n';

const games = ref<Game[]>([]);
const player1User = ref<User>();
const player2User = ref<User>();
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
        console.log(data.player1Id, data.player2Id);
      },
    );
  },
);

GameService.findAll('running').then(
  (gamesreturn: Game[]) => (games.value = gamesreturn),
);

GameService.findAll('paused').then(
  (gamesreturn: Game[]) => (games.value = gamesreturn),
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
      <h1 class="title">{{ useI18n().t('streamoverview') }}</h1>
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
      <h1>pathed stream</h1>
      <PongComponent
        v-if="
          loadedData &&
          typeof player1User !== 'undefined' &&
          typeof player2User !== 'undefined'
        "
        :game-id="gameId"
        :player1-i-d="player1User"
        :player2-i-d="player2User"
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
