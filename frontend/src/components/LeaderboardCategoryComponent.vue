<script setup lang="ts">
import LeaderboardPlayerComponent from './LeaderboardPlayerComponent.vue';
defineProps<{
  categoryName: string;
}>();
</script>

<template>
  <h3>{{ categoryName }}</h3>
  <div class="categories">
    <LeaderboardPlayerComponent player-name="gucalvi" />
    <LeaderboardPlayerComponent player-name="gucalvi" />
    <LeaderboardPlayerComponent player-name="gucalvi" />
    <LeaderboardPlayerComponent player-name="gucalvi" />
    <LeaderboardPlayerComponent player-name="gucalvi" />
  </div>
</template>

<style scoped>
.categories {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
