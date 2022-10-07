<script setup lang="ts">
defineProps<{
  player1Name: string;
  player2Name: string;
}>();
</script>

<template>
  <div>
    <img class="thumbnail" src="@/assets/pong.png" width="113" height="70" />
    <span class="playernames"> {{ player1Name }} vs {{ player2Name }}</span>
  </div>
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
}
.thumbnail {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
