<script setup lang="ts">
import GamePeopleComponent from '@/components/game/GamePeopleComponent.vue';
import EndScreenComponent from '@/components/game/EndScreenComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import { ref, onBeforeMount, onMounted, nextTick } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useErrorStore } from '@/store/error';

const game = ref<Game | null>(null);
const route = useRoute();
const isEnded = ref(false);

const videoWidth = String(0.69 * window.innerWidth) + 'px';

const fetchGameData = async (id: number) => {
  try {
    game.value = await GameService.findOne(id);
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

const onEnded = () => {
  isEnded.value = true;
};

onMounted(async () => {
  await nextTick();
  window.onresize = () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.style.width = String(0.69 * window.innerWidth) + 'px';
  };
});
</script>

<template>
  <div v-if="game">
    <div v-if="game.isReplayHost && !isEnded" class="players">
      <GamePeopleComponent :client="game.player2" class="player1" />
      <GamePeopleComponent :client="game.player1" class="player2" />
    </div>
    <div v-else-if="!isEnded" class="players">
      <GamePeopleComponent :client="game.player1" class="player1" />
      <GamePeopleComponent :client="game.player2" class="player2" />
    </div>
    <video
      v-if="!isEnded"
      id="video"
      autoplay
      :src="game.replayUrl"
      @ended="onEnded"
    />
    <EndScreenComponent v-else :game-id="game.id" />
  </div>
</template>

<style scoped>
video {
  object-fit: cover;
  width: v-bind(videoWidth);
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.player1 {
  grid-column: 1/2;
  justify-content: center;
  text-align: center;
}

.player2 {
  grid-column: 2/3;
  justify-content: center;
  text-align: center;
}

.players {
  display: grid;
}
</style>
