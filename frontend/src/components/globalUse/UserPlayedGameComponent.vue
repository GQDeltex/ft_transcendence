<script setup lang="ts">
import type { Game } from '@/service/GameService';
import ChildStreamComponent from '../stream/ChildStreamComponent.vue';
defineProps<{
  game: Game;
}>();
</script>

<template>
  <div>
    <span class="stream">
      <ChildStreamComponent :game="game" :is-replay="true" />
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
.username {
  color: #f8971d;
  font-size: 2vw;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
.time {
  padding: 2px;
  font-size: 1vw;
  color: grey;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
</style>
