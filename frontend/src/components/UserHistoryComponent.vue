<script setup lang="ts">
import UserPlayedGameComponent from './UserPlayedGameComponent.vue';
</script>

<template>
  <div class="frame">
    <UserPlayedGameComponent />
    <UserPlayedGameComponent />
  </div>
</template>

<style scoped>
.frame {
  border: 1px solid #202020;
  padding: 10px;
}
</style>
