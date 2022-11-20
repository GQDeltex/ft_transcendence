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
  <span class="playernames">
    {{ game.player1.username }} vs {{ game.player2.username }}
  </span>
  <router-link
    class="routerlink"
    :to="`/${isReplay ? 'replay' : 'stream'}/${game.id}`"
  >
    <div>
      <img class="thumbnail" src="@/assets/pong.png" />
      <span class="playernames"> {{ game.score1 }} : {{ game.score2 }}</span>
    </div>
  </router-link>
</template>

<style scoped>
.routerlink {
  text-decoration: none;
}

div {
  display: grid;
  margin: auto;
}
.playernames {
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
