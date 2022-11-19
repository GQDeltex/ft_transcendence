<script setup lang="ts">
import PongComponent from '../components/game/PongComponent.vue';
import EndScreenComponent from '../components/game/EndScreenComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import { ref, onBeforeMount } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useErrorStore } from '@/store/error';

const game = ref<Game | null>(null);

const route = useRoute();
const isLoaded = ref(false);
const gameId = ref(0);

const fetchGameData = async (id: number) => {
  gameId.value = id;
  try {
    game.value = await GameService.findOne(id);
    isLoaded.value = true;
  } catch (error) {
    useErrorStore().setError((error as Error).message);
  }
};

onBeforeMount(async () => {
  await fetchGameData(+route.params.id);
});

onBeforeRouteUpdate(async (to) => {
  await fetchGameData(+to.params.id);
});

const onFinish = () => {
  isLoaded.value = false;
};
</script>

<template>
  <div>
    <PongComponent
      v-if="isLoaded && game !== null"
      :game-id="gameId"
      :host-player="game.player1"
      :other-player="game.player2"
      :priority="3"
      :game-datas="game.logData"
      @finish="onFinish"
    />
    <EndScreenComponent v-else :game-id="gameId" />
  </div>
</template>
