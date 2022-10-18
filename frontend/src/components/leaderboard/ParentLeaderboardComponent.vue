<script setup lang="ts">
import ChildPlayerComponent from './ChildPlayerComponent.vue';
import ChildMedalComponent from './ChildMedalComponent.vue';
defineProps<{
  categoryName: string;
}>();
</script>

<template>
  <h3>{{ categoryName }}</h3>
  <div class="categories">
    <ChildMedalComponent
      medal-name="gucalvi"
      medal-kind="/src/assets/pongking_boi_gold.png"
    />
    <ChildMedalComponent
      medal-name="gucalvis evil twin"
      medal-kind="/src/assets/pongking_boi_silver.png"
    />
    <ChildMedalComponent
      medal-name="gucalvis angelic twin"
      medal-kind="/src/assets/pongking_boi_bronze.png"
    />
    <ChildPlayerComponent player-name="gucalvi" />
    <ChildPlayerComponent player-name="gucalvi" />
    <ChildPlayerComponent player-name="gucalvi" />
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
