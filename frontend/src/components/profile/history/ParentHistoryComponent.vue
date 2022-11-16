<script setup lang="ts">
import UserPlayedGameComponent from '../../globalUse/UserPlayedGameComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import type { User } from '@/store/user';
import type { Ref } from 'vue';
import { ref, inject, watchEffect } from 'vue';
import { cloneDeep } from 'lodash';

const user = inject<{ user: Ref<User>; isMe: Ref<boolean> }>('user');
const games = ref<Game[]>([]);
const sortedGames = ref<Game[]>([]);

if (typeof user !== 'undefined' && typeof user.user !== 'undefined') {
  watchEffect(async () => {
    GameService.findAll('ended', user.user.value.id).then(
      (gamesreturn: Game[]) => (games.value = gamesreturn),
    );
    sortedGames.value = cloneDeep(games.value);
    sortedGames.value.sort((a, b) => b.id - a.id);
    // console.log(sortedGames.value);
  });
}
</script>

<template>
  <div class="frame">
    <div class="title">History</div>
    <div class="scroll">
      <UserPlayedGameComponent
        v-for="game in sortedGames"
        :key="game.id"
        :player1="game.player1.username"
        :player2="game.player2.username"
        :score1="game.score1"
        :score2="game.score2"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 2vw;
  color: #c00000;
}

.scroll {
  overflow-y: scroll;
  max-height: 96%;
}
.frame {
  border: 1px solid gray;
  padding: 1vw;
  max-height: inherit;
}
</style>
