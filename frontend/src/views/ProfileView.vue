<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import ParentHistoryComponent from '../components/profile/history/ParentHistoryComponent.vue';
import ProfileComponent from '../components/profile/profile/ProfileComponent.vue';
import AboutMeComponent from '../components/profile/aboutMe/AboutMeComponent.vue';
import ParentAchievementsComponent from '../components/profile/achievement/ParentAchievementsComponent.vue';

const router = useRouter();
const userStore = useUserStore();

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
  <form
    action="http://localhost:8080/users/upload"
    method="POST"
    enctype="multipart/form-data"
  >
    <input name="picture" type="file" />
    <input type="submit" />
  </form>
</template>

<style scoped>
.profileView {
  display: grid;
  margin-left: 5vw;
  margin-right: 5vw;
}

.profile {
  grid-column: 1 / 6;
  margin: 1px;
}
.history {
  grid-column: 1 / 4;
  margin: 2px;
}

.aboutParent {
  grid-column: 4 / 6;
  grid-row: 2 / 4;
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
