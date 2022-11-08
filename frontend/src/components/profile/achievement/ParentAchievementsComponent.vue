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

const haslost = computed(() => {
  let count = 0;
  for (let game of games.value) {
    if (game.player1.id === user?.user.value.id && game.score1 < game.score2) {
      count++;
    }
    if (game.player2.id === user?.user.value.id && game.score2 < game.score1) {
      count++;
    }
  }
  return count;
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
    <span class="title">Achievements</span>
    <div class="achievements">
      <ChildAchievementComponent
        header="Smol PongKing"
        text="First Login"
        picture=""
      />
      <ChildAchievementComponent
        v-if="
          user?.user.value.username == 'hlehmann' &&
          user.user.value.id != 835543
        "
        header="Fake News"
        text="You are not the President"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'hlehmann'"
        header="President"
        text="Welcome Mr. President!"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'shazam'"
        header="Baggette"
        text="Hon hon hon I am ze french. Baggette baggette fromage"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'mamuller'"
        header="Design"
        text="Buisness, Buisness, Buisness. Design, Design, Design"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'rkaufman'"
        header="Not my department"
        text="I need a cubical, this is not my department"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'cthien-h'"
        header="No need to test"
        text="If I throw a rock at the computer, it'll also break the shop"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'kmeixner'"
        header="25 Hours"
        text="I can fix my IRC in one day"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'pstengl'"
        header="Techlead"
        text="I dont know why Java does that"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'cdahlhof'"
        header="Hamster"
        text="He said that he would be here 3 hours ago. Probably is sleeping"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'vheymans'"
        header="Java"
        text="Java is an island too! But Javascript something complete different!"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'dzivanov'"
        header="You look good"
        text="Man, your hair looks so good right now. You look so well rested."
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'ehosu'"
        header="Complicated"
        text="Why go the easy way when thats the boring way."
        picture=""
      />
      <ChildAchievementComponent
        v-if="user?.user.value.username == 'backlog'"
        header="TBA"
        text="THATS BACKLOG, WE'LL DO IT LATER"
        picture=""
      />
      <ChildAchievementComponent
        v-if="
          user?.user.value.username == 'hlehmann' ||
          user?.user.value.username == 'mamuller' ||
          user?.user.value.username == 'rkaufman' ||
          user?.user.value.username == 'cthien-h' ||
          user?.user.value.username == 'kmeixner' ||
          user?.user.value.username == 'pstengl' ||
          user?.user.value.username == 'cdahlhof' ||
          user?.user.value.username == 'vheymans' ||
          user?.user.value.username == 'dzivanov' ||
          user?.user.value.username == 'ehosu'
        "
        header="Bonding time"
        text="Time to do some family bonding. ;)"
        picture=""
      />
      <ChildAchievementComponent
        v-if="games.length > 0"
        header="Gamer"
        text="Played First Game"
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
        header="Alpha"
        text="Won a Game"
        picture=""
      />
      <ChildAchievementComponent
        v-if="haswon > 4"
        header="Sigma"
        text="Won Five Games"
        picture=""
      />
      <ChildAchievementComponent
        v-if="haslost > 0"
        header="Noob"
        text="Lost a Game"
        picture=""
      />
      <ChildAchievementComponent
        v-if="haslost > 4"
        header="L+R"
        text="Lost Five Games"
        picture=""
      />
    </div>
  </div>
</template>

<style scoped>
.achievementsParent {
  display: grid;
  padding: 1vw;
  border: 1px solid var(--main-3-color);
  max-height: 30vh;
}

.title {
  font-size: var(--main-title-font-size);
  color: var(--main-2-color);
  margin-bottom: 1vw;
}
.achievements {
  max-height: inherit;
  overflow-y: scroll;
}
</style>
