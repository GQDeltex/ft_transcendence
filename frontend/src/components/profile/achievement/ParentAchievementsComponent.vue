<script setup lang="ts">
import ChildAchievementComponent from './ChildAchievementComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import type { User } from '@/store/user';
import type { Ref } from 'vue';
import { ref, inject, watchEffect, computed } from 'vue';

const user = inject<{ user: Ref<User>; isMe: Ref<boolean> }>('user');
const games = ref<Game[]>([]);

const haswon = computed(() => {
  let counter = 0;
  for (let game of games.value) {
    if (game.player1.id === user?.user.value.id && game.score1 > game.score2) {
      counter++;
    }
    if (game.player2.id === user?.user.value.id && game.score2 > game.score1) {
      counter++;
    }
  }
  return counter;
});

if (typeof user !== 'undefined' && typeof user.user !== 'undefined') {
  watchEffect(async () => {
    GameService.findAll('ended', user.user.value.id).then(
      (gamesreturn: Game[]) => (games.value = gamesreturn),
    );
  });
}
</script>

<template>
  <div class="achievementsParent">
    <span class="text">Achievements</span>
    <div class="achievements">
      <ChildAchievementComponent
        header="Smol PongKing"
        text="First Login"
        picture=""
      />
      <ChildAchievementComponent
        v-if="games.length > 0"
        header="First Steps"
        text="First Game"
        picture=""
      />
      <ChildAchievementComponent
        v-if="games.length > 4"
        header="Warming Up"
        text="Five Games"
        picture=""
      />
      <ChildAchievementComponent
        v-if="haswon > 0"
        header="Smol PongKing"
        text="Won a Game"
        picture=""
      />
      <ChildAchievementComponent
        v-if="haswon > 4"
        header="Smol PongKing"
        text="Won Five Games"
        picture=""
      />
    </div>
  </div>
</template>

<style scoped>
.achievementsParent {
  display: grid;
  padding: 1vw;
  border: 1px solid grey;
  max-height: 30vh;
}
.achievements {
  max-height: inherit;
  overflow-y: scroll;
}
.text {
  font-size: 2vw;
  margin-bottom: 1vw;
}
</style>
