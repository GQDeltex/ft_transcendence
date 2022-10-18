<script setup lang="ts">
defineProps<{
  player1Name: string;
  player2Name: string;
}>();
</script>

<template>
  <router-link to="/placeholder">
    <div>
      <img class="thumbnail" src="@/assets/pong.png" />
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
