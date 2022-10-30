<script setup lang="ts">
import UserPlayedGameComponent from '../../globalUse/UserPlayedGameComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import type { User } from '@/store/user';
import type { Ref } from 'vue';
import { ref, inject, watchEffect } from 'vue';

const user = inject<{ user: Ref<User>; isMe: Ref<boolean> }>('user');
const games = ref<Game[]>([]);

if (typeof user !== 'undefined' && typeof user.user !== 'undefined') {
  watchEffect(async () => {
    GameService.findAll('ended', user.user.value.id).then(
      (gamesreturn: Game[]) => (games.value = gamesreturn),
    );
  });
}
</script>

<template>
  <div class="frame">
    <UserPlayedGameComponent
      v-for="game in games"
      :key="game.id"
      :player1="game.player1.username"
      :player2="game.player2.username"
      :score1="game.score1"
      :score2="game.score2"
    />
  </div>
</template>

<style scoped>
.frame {
  border: 1px solid #202020;
  padding: 1vw;
  max-height: inherit;
  overflow-y: scroll;
}
</style>
