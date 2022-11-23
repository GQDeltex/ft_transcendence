<script setup lang="ts">
import { onBeforeMount, provide, ref, type Ref } from 'vue';
import type { User } from '@/store/user';
import { useUserStore } from '@/store/user';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import ParentHistoryComponent from '../components/profile/history/ParentHistoryComponent.vue';
import ProfileComponent from '../components/profile/profile/ProfileComponent.vue';
import AboutMeComponent from '../components/profile/aboutMe/AboutMeComponent.vue';
import ParentAchievementsComponent from '../components/profile/achievement/ParentAchievementsComponent.vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import type { Game } from '@/service/GameService';
import GameService from '@/service/GameService';

const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const errorStore = useErrorStore();

const user = ref<User | null>(null);
const isMe = ref(false);
const games: Ref<Game[]> = ref([]);

const fetchUserData = async (id: number) => {
  try {
    if (id === userStore.id) {
      await userStore.fetchSelfData(true);
      user.value = userStore.$state;
      isMe.value = true;
    } else {
      user.value = await UserService.findOneById(id, true);
    }
    games.value = await GameService.findAll('ended', user.value?.id);
  } catch (error) {
    errorStore.setError((error as Error).message);
    await router.push({ path: '/' });
  }
};

onBeforeMount(async () => {
  await fetchUserData(+route.params.id);
});

onBeforeRouteUpdate(async (to) => {
  await fetchUserData(+to.params.id);
});

provide('user', { user, isMe, games });
</script>

<template>
  <div class="profileViewGrandparent">
    <div v-if="user" class="profileViewParent">
      <ProfileComponent class="profile" />
      <div class="lowerPart">
        <ParentHistoryComponent class="history" />
        <div class="aboutParent">
          <AboutMeComponent class="aboutMe" />
          <ParentAchievementsComponent class="achievement" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profileViewParent {
  display: grid;
  grid-gap: 0.5%;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1vw;
  width: 90%;
  height: 70vh;
}
.profileViewGrandparent {
  overflow-y: scroll;
}
.lowerPart {
  display: grid;
  max-height: 50vh;
  grid-auto-flow: column;
}

.aboutParent {
  display: grid;
  grid-column: 2 / 3;
}

.achievement {
  grid-row: 2 / 3;
  max-height: 30vh;
}

.aboutMe {
  grid-row: 1 / 2;
  height: 20vh;
}
</style>
