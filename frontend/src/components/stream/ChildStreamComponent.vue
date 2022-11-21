<script setup lang="ts">
import type { Game } from '@/service/GameService';
withDefaults(
  defineProps<{
    game: Game;
    isReplay?: boolean;
  }>(),
  { isReplay: false },
);
</script>

<template>
  <span class="playerNames">
    {{ game.player1.username }} vs {{ game.player2.username }}
  </span>
  <router-link :to="`/${isReplay ? 'replay' : 'stream'}/${game.id}`">
    <div>
      <img class="thumbnail" alt="thumbnail" src="@/assets/pong.png" />
      <span class="playerNames"> {{ game.score1 }} : {{ game.score2 }}</span>
    </div>
  </router-link>
</template>

<style scoped>
router-link {
  text-decoration: none;
}

div {
  display: grid;
  margin: auto;
}

.playerNames {
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 3vw;
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
