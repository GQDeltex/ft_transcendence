<script setup lang="ts">
import ChildStreamComponent from '../components/stream/ChildStreamComponent.vue';
import PongComponent from '../components/game/PongComponent.vue';
import EndScreenComponent from '../components/game/EndScreenComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import { ref, onBeforeMount, type Ref, onBeforeUnmount } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { socket } from '@/service/socket';
import { useErrorStore } from '@/store/error';
import { useI18n } from 'vue-i18n';

enum DisplayState {
  OVERVIEW,
  WATCHING,
  ENDED,
}

const route = useRoute();

const games = ref<Game[]>([]);
const game: Ref<Game | null> = ref(null);
const displayState = ref(DisplayState.OVERVIEW);

socket.on('Game', async ({ gameId }) => {
  if (gameId < 0 && game.value) {
    displayState.value = DisplayState.ENDED;
    socket.emit('stream', { gameId: game.value.id, event: 'LEAVE' });
  }
});

const joinGame = async (_gameId: number) => {
  game.value = games.value.find((g) => g.id === _gameId) ?? null;
  if (game.value) {
    socket.emit('stream', { gameId: game.value.id, event: 'JOIN' });
    displayState.value = DisplayState.WATCHING;
  }
};

const fetchGames = async () => {
  try {
    games.value = [
      ...(await GameService.findAll('running')),
      ...(await GameService.findAll('paused')),
    ];
    displayState.value = DisplayState.OVERVIEW;
  } catch (error) {
    useErrorStore().setError((error as Error).message);
  }
};

onBeforeMount(async () => {
  if (typeof route.params.id === 'undefined') await fetchGames();
  else await joinGame(+route.params.id);
});

onBeforeRouteUpdate(async (to) => {
  if (game.value)
    socket.emit('stream', { gameId: game.value.id, event: 'LEAVE' });
  if (typeof to.params.id === 'undefined') await fetchGames();
  else await joinGame(+to.params.id);
});

onBeforeUnmount(() => {
  if (game.value)
    socket.emit('stream', { gameId: game.value.id, event: 'LEAVE' });
});
</script>

<template>
  <div>
    <div v-if="displayState === DisplayState.OVERVIEW">
      <h1 class="title">{{ useI18n().t('streamoverview') }}</h1>
      <ChildStreamComponent
        v-for="_game in games"
        :key="_game.id"
        :game="_game"
      />
    </div>
    <div v-if="game">
      <div v-if="displayState === DisplayState.WATCHING">
        <PongComponent
          :game-id="game.id"
          :host-player="game.player1"
          :other-player="game.player2"
          :priority="2"
        />
      </div>
      <EndScreenComponent v-else :game-id="game.id" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  margin-left: 1ch;
}
</style>
