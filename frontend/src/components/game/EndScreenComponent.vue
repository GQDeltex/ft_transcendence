<script setup lang="ts">
import Queue from './queue';

// defineProps <{
// 	playerScore: number;
// 	remoteScore: 
// }

function homepage() {
	window.location.href = '/';
}

</script>

<template>
  <div class="parent">
    <p class="saving">Some player wins!</p>
	<button class="home-page" @click="homepage()">Home page</button>
	<button class="re-queue" @click="Queue.join_queue()">Re-Queue</button>
	<p class="saving">Player Score: {{ Queue.playerScore }}</p>
	<p class="saving">Player Remote: {{ Queue.remoteScore }}</p>
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.parent {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
