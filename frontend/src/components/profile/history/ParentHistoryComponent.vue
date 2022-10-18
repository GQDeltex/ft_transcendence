<script setup lang="ts">
import UserPlayedGameComponent from '../../globalUse/UserPlayedGameComponent.vue';
</script>

<template>
  <div class="frame">
    <UserPlayedGameComponent />
    <UserPlayedGameComponent />
    <UserPlayedGameComponent />
    <UserPlayedGameComponent />
  </div>
</template>

<style scoped>
.frame {
  border: 1px solid #202020;
  padding: 1vw;
  /* height: 85vh; */
  max-height: 50%;
  overflow-y: scroll;
}
</style>
