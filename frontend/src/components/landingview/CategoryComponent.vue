<script setup lang="ts">
import UserPlayedGameComponent from '../../components/globalUse/UserPlayedGameComponent.vue';
import type { Game } from '@/service/GameService';
import { onBeforeMount, type Ref, ref } from 'vue';
import { useErrorStore } from '@/store/error';
import GameService from '@/service/GameService';

defineProps<{
  category: string;
}>();

const games: Ref<Game[]> = ref([]);

const sortGames = (games: Game[]) => {
  return [...games].sort((a, b) => b.id - a.id);
};

onBeforeMount(async () => {
  try {
    games.value = await GameService.findAll('ended');
  } catch (error) {
    useErrorStore().setError((error as Error).message);
  }
});
</script>

<template>
  <h3>{{ category }}</h3>
  <div class="components">
    <UserPlayedGameComponent
      v-for="game in sortGames(games).slice(0, 5)"
      :key="game.id"
      :game="game"
      size="16.9vw"
    />
  </div>
</template>

<style scoped>
h3 {
  color: white;
}

.components {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
}
</style>
