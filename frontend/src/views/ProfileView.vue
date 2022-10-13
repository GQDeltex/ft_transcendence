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
    <div class="profile"><ProfileComponent /></div>
    <div class="history"><UserHistoryComponent /></div>
    <div class="about"><AboutMeComponent /><AchievementComponent /></div>
    
  </div>
</template>

<style scoped>

.profileView {
  display: grid;
  margin-left: 10%;
  margin-right: 10%;
}

.profile {
  grid-column: 1 / 6;
}
.history {
  grid-column: 1 / 4;
}

.about {
  grid-column: 4 / 6;
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
