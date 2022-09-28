<script setup lang="ts">
import LeaderboardPlayerComponent from './LeaderboardPlayerComponent.vue';
import LeaderboardMedalComponent from './LeaderboardMedalComponent.vue';
defineProps<{
  categoryName: string;
}>();
</script>

<template>
  <h3>{{ categoryName }}</h3>
  <div class="categories">
    <LeaderboardMedalComponent
      medal-name="gucalvi"
      medal-kind="/src/assets/pongking_boi_gold.png"
    />
    <LeaderboardMedalComponent
      medal-name="gucalvis evil twin"
      medal-kind="/src/assets/pongking_boi_silver.png"
    />
    <LeaderboardMedalComponent
      medal-name="gucalvis angelic twin"
      medal-kind="/src/assets/pongking_boi_bronze.png"
    />
    <LeaderboardPlayerComponent player-name="gucalvi" />
    <LeaderboardPlayerComponent player-name="gucalvi" />
    <LeaderboardPlayerComponent player-name="gucalvi" />
  </div>
</template>

<style scoped>
h3 {
  padding: 5px;
  color: orange;
}
.categories {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap-reverse;
  gap: initial;
}
</style>
