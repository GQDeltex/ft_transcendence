<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  player1Name: string;
  player2Name: string;
  score1?: number;
  score2?: number;
}>();

const hasScores = computed(() => {
  if (typeof props.score1 === 'undefined') return false;
  if (typeof props.score2 === 'undefined') return false;
  return true;
});
</script>

<template>
  <router-link to="/placeholder">
    <div>
      <img class="thumbnail" src="@/assets/pong.png" />
      <span v-if="hasScores" class="playernames">
        {{ score1 }} : {{ score2 }}</span
      >
      <span class="playernames"> {{ player1Name }} vs {{ player2Name }}</span>
    </div>
  </router-link>
</template>

<style scoped>
div {
  display: grid;
  margin: auto;
}
.playernames {
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 2vw;
  margin-top: 1vw;
}
.thumbnail {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 22vw; */
  max-width: 60%;
  /* height: 15vh; */
  max-height: 100%;
}
</style>
