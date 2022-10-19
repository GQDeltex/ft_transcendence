<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useRouter, useRoute } from 'vue-router';
import ParentHistoryComponent from '../components/profile/history/ParentHistoryComponent.vue';
import ProfileComponent from '../components/profile/profile/ProfileComponent.vue';
import AboutMeComponent from '../components/profile/aboutMe/AboutMeComponent.vue';
import ParentAchievementsComponent from '../components/profile/achievement/ParentAchievementsComponent.vue';

const router = useRouter();
const userStore = useUserStore();
const route = useRoute();

const { username } = route.params;

const logout = async () => {
  await userStore.logout();
  await router.push({ path: '/login' });
};
</script>

<template>
  <button class="button" @click="logout">Log out</button>

  <div class="profileView">
    <ProfileComponent class="profile" />
    <ParentHistoryComponent class="history" />
    <div class="aboutParent">
      <AboutMeComponent />
      <ParentAchievementsComponent class="achievement" />
    </div>
  </div>
</template>

<style scoped>
.profileView {
  display: grid;
  margin-left: 5vw;
  margin-right: 5vw;
  /* max-height: 30vh; */
}

.profile {
  grid-column: 1 / 6;
  margin: 1px;
}
.history {
  grid-column: 1 / 4;
  /* grid-row: 2 / 4; */
  margin: 2px;
}

.aboutParent {
  grid-column: 4 / 6;
  grid-row: 2 / 4;
  margin: 1px;
  /* max-height: 60%; */
}

.achievement {
  margin: 1px;
  margin-top: 4px;
}

button {
  text-decoration: none;
  border-radius: 20px;
  color: white;
  background-color: #f8971d;
  padding: 10px;
  cursor: pointer;
}
</style>
