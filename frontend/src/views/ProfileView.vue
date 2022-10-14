<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import UserHistoryComponent from '../components/UserHistoryComponent.vue';
import ProfileComponent from '../components/ProfileComponent.vue';
import AboutMeComponent from '../components/AboutMeComponent.vue';
import AchievementComponent from '../components/AchievementComponent.vue';

const router = useRouter();
const userStore = useUserStore();

function logOut() {
  userStore.logOut();
  router.push({ path: '/login' });
}
</script>

<template>
  <button class="button" @click="logOut">Log out</button>

  <div class="profileView">
    <ProfileComponent class="profile" />
    <UserHistoryComponent class="history" />
    <div class="about">
      <AboutMeComponent />
      <AchievementComponent class="achievement" />
    </div>
  </div>
</template>

<style scoped>
.profileView {
  display: grid;
  margin-left: 10vh;
  margin-right: 10vh;
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

.about {
  grid-column: 4 / 6;
  /* grid-row: 2 / 4; */
  margin: 1px;
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
