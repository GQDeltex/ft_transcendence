<script setup lang="ts">
import type { Game } from '@/service/GameService';
import ChildStreamComponent from '../stream/ChildStreamComponent.vue';
defineProps<{
  game: Game;
  size: string;
}>();
</script>

<template>
  <div>
    <span class="stream">
      <ChildStreamComponent :game="game" :is-replay="true" :size="size" />
    </span>
  </div>
</template>

<style scoped>
div {
  display: grid;
}

.stream {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}
</style>
