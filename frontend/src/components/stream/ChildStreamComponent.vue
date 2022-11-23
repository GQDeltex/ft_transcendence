<script setup lang="ts">
import type { Game } from '@/service/GameService';
withDefaults(
  defineProps<{
    game: Game;
    isReplay?: boolean;
    size: string;
  }>(),
  { isReplay: false },
);
</script>

<template>
  <div class="stream">
    <span class="playerNames">
      {{ game.player1.username }} vs {{ game.player2.username }}
    </span>
    <router-link :to="`/${isReplay ? 'replay' : 'stream'}/${game.id}`">
      <div class="gameElement">
        <img class="thumbnail" alt="thumbnail" src="@/assets/pong.png" />
      </div>
    </router-link>
    <span class="playerNames"> {{ game.score1 }} : {{ game.score2 }}</span>
  </div>
</template>

<style scoped>
router-link {
  text-decoration: none;
}

.gameElement {
  display: grid;
  margin: auto;
}

.playerNames {
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: v-bind(size) - 0.5vw;
}

.thumbnail {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 60%;
  max-height: 100%;
}

.stream {
  width: v-bind(size);
}
</style>
