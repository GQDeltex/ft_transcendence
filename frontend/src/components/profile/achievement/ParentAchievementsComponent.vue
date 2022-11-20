<script setup lang="ts">
import ChildAchievementComponent from './ChildAchievementComponent.vue';
import type { Game } from '@/service/GameService';
import type { User } from '@/store/user';
import { ref, inject, type Ref, watch } from 'vue';

const { user, games } = inject<{ user: Ref<User | null>; games: Ref<Game[]> }>(
  'user',
  {
    user: ref(null),
    games: ref([]),
  },
);

const wonCount = ref(0);
const lostCount = ref(0);

watch(games, () => {
  games.value.forEach((game) => {
    if (
      (game.player1.id === user.value?.id && game.score1 > game.score2) ||
      (game.player2.id === user.value?.id && game.score2 > game.score1)
    )
      wonCount.value++;
    else if (
      (game.player1.id === user.value?.id && game.score1 < game.score2) ||
      (game.player2.id === user.value?.id && game.score2 < game.score1)
    )
      lostCount.value++;
  });
});
</script>

<template>
  <div v-if="user" class="achievementsParent">
    <span class="text">Achievements</span>
    <div class="achievements">
      <ChildAchievementComponent
        header="Smol PongKing"
        text="First Login"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'hlehmann' && user.id !== 835543"
        header="Fake News"
        text="You are not the President"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 835543"
        header="President"
        text="Welcome Mr. President"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'shazam'"
        header="Baggette"
        text="Hon hon hon I am ze french. Baggette baggette fromage"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'mamuller'"
        header="Design"
        text="Buisness, Buisness, Buisness. Design, Design, Design"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'rkaufman'"
        header="Not my department"
        text="I need a cubical, this is not my department"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'cthien-h'"
        header="No need to test"
        text="If I throw a rock at the computer, it'll also break the shop"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'kmeixner'"
        header="25 Hours"
        text="I can fix my IRC in one day"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'pstengl'"
        header="Techlead"
        text="I dont know why Java does that"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'cdahlhof'"
        header="Hamster"
        text="He said that he would be here 3 hours ago. Probably is sleeping"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'vheymans'"
        header="TBA"
        text="TBA"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'dzivanov'"
        header="You look good"
        text="Man, your hair looks so good right now. You look so well rested."
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'ehosu'"
        header="Complicated"
        text="Why go the easy way when thats the boring way."
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'backlog'"
        header="TBA"
        text="THATS BACKLOG, WE'LL DO IT LATER"
        picture=""
      />
      <ChildAchievementComponent
        v-if="
          user.username === 'hlehmann' ||
          user.username === 'mamuller' ||
          user.username === 'rkaufman' ||
          user.username === 'cthien-h' ||
          user.username === 'kmeixner' ||
          user.username === 'pstengl' ||
          user.username === 'cdahlhof' ||
          user.username === 'vheymans' ||
          user.username === 'dzivanov' ||
          user.username === 'ehosu'
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
        v-if="wonCount > 0"
        header="Alpha"
        text="Won a Game"
        picture=""
      />
      <ChildAchievementComponent
        v-if="wonCount > 4"
        header="Sigma"
        text="Won Five Games"
        picture=""
      />
      <ChildAchievementComponent
        v-if="lostCount > 0"
        header="Noob"
        text="Lost a Game"
        picture=""
      />
      <ChildAchievementComponent
        v-if="lostCount > 4"
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
  color: #c00000;
}
</style>
