<script setup lang="ts">
import UserPlayedGameComponent from '../../globalUse/UserPlayedGameComponent.vue';
import type { Game } from '@/service/GameService';
import { ref, inject, type Ref } from 'vue';

const { games } = inject<{ games: Ref<Game[]> }>('user', {
  games: ref([]),
});

const sortGames = (games: Game[]) => {
  return [...games].sort((a, b) => b.id - a.id);
};
</script>

<template>
  <div class="frame">
    <div class="title">History</div>
    <div class="scroll">
      <UserPlayedGameComponent
        v-for="game in sortGames(games)"
        :key="game.id"
        :game="game"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 2vw;
  color: #c00000;
}

.scroll {
  overflow-y: scroll;
  max-height: 96%;
}
.frame {
  border: 1px solid gray;
  padding: 1vw;
  max-height: inherit;
}
</style>
