<script setup lang="ts">
import ChildAchievementComponent from './ChildAchievementComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import type { User } from '@/store/user';
import { ref, inject, computed, onMounted } from 'vue';
import { useErrorStore } from '@/store/error';
import { useI18n } from 'vue-i18n';

const { user } = inject<{ user: User | null }>('user', {
  user: null,
});
const games = ref<Game[]>([]);

const errorStore = useErrorStore();

const wonCount = computed(() => {
  let counter = 0;
  for (let game of games.value) {
    if (
      (game.player1.id === user?.id && game.score1 > game.score2) ||
      (game.player2.id === user?.id && game.score2 > game.score1)
    )
      counter++;
  }
  return counter;
});

const lostCount = computed(() => {
  let count = 0;
  for (let game of games.value) {
    if (
      (game.player1.id === user?.id && game.score1 < game.score2) ||
      (game.player2.id === user?.id && game.score2 < game.score1)
    )
      count++;
  }
  return count;
});

onMounted(async () => {
  try {
    games.value = await GameService.findAll('ended', user?.id);
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
});
</script>

<template>
  <div v-if="user" class="achievementsParent">
    <span class="text">{{ useI18n().t('achievements') }}</span>
    <div class="achievements">
      <ChildAchievementComponent
        :header="useI18n().t('gamename')"
        :text="useI18n().t('firstlogin')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'hlehmann' && user.id !== 835543"
        :header="useI18n().t('fakenews')"
        :text="useI18n().t('yourarenotpresident')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 835543"
        :header="useI18n().t('president')"
        :text="useI18n().t('welcomemrpresident')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 108770"
        :header="useI18n().t('baguette')"
        :text="useI18n().t('notbaguette')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 83547"
        :header="useI18n().t('desgin')"
        :text="useI18n().t('business')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 98546"
        :header="useI18n().t('notmydepartment')"
        :text="useI18n().t('ineedcubical')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'cthien-h'"
        :header="useI18n().t('noneedtotest')"
        :text="useI18n().t('throwarock')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 85561"
        :header="useI18n().t('hours25')"
        :text="useI18n().t('fixirconeday')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 87222"
        :header="useI18n().t('techlead')"
        :text="useI18n().t('idontknow')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 83666"
        :header="useI18n().t('hamster')"
        :text="useI18n().t('propablysleeping')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'vheymans'"
        :header="useI18n().t('java')"
        :text="useI18n().t('javaisland')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.id === 83581"
        header="Mr. Cuisine"
        text="I can make the most delicious ras(p)berry pi(e)."
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'dzivanov'"
        :header="useI18n().t('youlookgood')"
        :text="useI18n().t('hairlooksgood')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'ehosu'"
        :header="useI18n().t('complicated')"
        :text="useI18n().t('whyeasytheway')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="user.username === 'backlog'"
        :header="useI18n().t('backlog')"
        :text="useI18n().t('thatsbacklog')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="
          user.id === 83543 ||
          user.id === 83547 ||
          user.id === 98546 ||
          user.username === 'cthien-h' ||
          user.id === 85561 ||
          user.id === 87222 ||
          user.id === 83666 ||
          user.id === 83581 ||
          user.username === 'dzivanov' ||
          user.username === 'ehosu'
        "
        :header="useI18n().t('bondingtime')"
        :text="useI18n().t('timetofamily')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="games.length > 0"
        :header="useI18n().t('gamer')"
        :text="useI18n().t('playedfirstgame')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="games.length > 4"
        :header="useI18n().t('warmingup')"
        :text="useI18n().t('fimegames')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="wonCount > 0"
        :header="useI18n().t('alpha')"
        :text="useI18n().t('wonagame')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="wonCount > 4"
        :header="useI18n().t('sigma')"
        :text="useI18n().t('wonfivegames')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="lostCount > 0"
        :header="useI18n().t('noob')"
        :text="useI18n().t('lostagame')"
        picture=""
      />
      <ChildAchievementComponent
        v-if="lostCount > 4"
        :header="useI18n().t('lplusr')"
        :text="useI18n().t('lostfivegames')"
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
