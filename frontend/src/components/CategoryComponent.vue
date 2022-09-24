<script setup lang="ts">
defineProps<{
  category: string;
}>();
</script>

<template>
  <h3>{{ category }}</h3>
  <div>
    <img src="@/assets/pong.png" width="200" height="100" />
    <img src="@/assets/pong.png" width="200" height="100" />
    <img src="@/assets/pong.png" width="200" height="100" />
    <img src="@/assets/pong.png" width="200" height="100" />
    <img src="@/assets/pong.png" width="200" height="100" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 100px;
}
</style>
