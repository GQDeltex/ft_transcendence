<script setup lang="ts">
import { onBeforeMount, provide, ref } from 'vue';
import type { User } from '@/store/user';
import { useUserStore } from '@/store/user';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import ParentHistoryComponent from '../components/profile/history/ParentHistoryComponent.vue';
import ProfileComponent from '../components/profile/profile/ProfileComponent.vue';
import AboutMeComponent from '../components/profile/aboutMe/AboutMeComponent.vue';
import ParentAchievementsComponent from '../components/profile/achievement/ParentAchievementsComponent.vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const errorStore = useErrorStore();

const user = ref<User | null>(null);
const isMe = ref(false);

const fetchUserData = async (id: number) => {
  try {
    if (id === userStore.id) {
      await userStore.fetchSelfData(true);
      user.value = userStore.$state;
      isMe.value = true;
    } else {
      user.value = await UserService.findOneById(id, true);
    }
  } catch (error) {
    errorStore.setError((error as Error).message);
    await router.push({ path: '/' });
  }
};

onBeforeMount(async () => {
  await fetchUserData(+route.params.id);
});

onBeforeRouteUpdate((to) => {
  fetchUserData(+to.params.id);
});

provide('user', { user, isMe });

const logout = async () => {
  await userStore.logout();
  await router.push({ path: '/login' });
};
</script>

<template>
  <button v-if="isMe" class="button" @click="logout">{{useI18n().t('logoutbutton')}}</button>
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

.button {
  text-decoration: none;
  border-radius: 25px;
  color: white;
  background-color: #c00000;
  cursor: pointer;
  float: right;
  font-size: 1vw;
}
.aboutMe {
  grid-row: 1 / 2;
  height: 20vh;
}
</style>
