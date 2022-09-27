<script setup lang="ts">
/* eslint-disable */
// @ts-ignore
import VLazyImage from 'v-lazy-image';
defineProps<{
  category: string;
}>();
</script>

<template>
  <h3>{{ category }}</h3>
  <div>
    <router-link to="/test">
      <v-lazy-image
        src="https://raw.githubusercontent.com/GQDeltex/ft_transcendence/main/frontend/src/assets/pong.png"
        width="200"
        height="100"
      />
    </router-link>
    <router-link to="/test">
      <v-lazy-image
        src="https://raw.githubusercontent.com/GQDeltex/ft_transcendence/main/frontend/src/assets/pong.png"
        width="200"
        height="100"
      />
    </router-link>
    <router-link to="/test">
      <v-lazy-image
        src="https://raw.githubusercontent.com/GQDeltex/ft_transcendence/main/frontend/src/assets/pong.png"
        width="200"
        height="100"
      />
    </router-link>
    <router-link to="/test">
      <v-lazy-image
        src="https://raw.githubusercontent.com/GQDeltex/ft_transcendence/main/frontend/src/assets/pong.png"
        width="200"
        height="100"
      />
    </router-link>
    <router-link to="/test">
      <v-lazy-image
        src="https://raw.githubusercontent.com/GQDeltex/ft_transcendence/main/frontend/src/assets/pong.png"
        width="200"
        height="100"
      />
    </router-link>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
