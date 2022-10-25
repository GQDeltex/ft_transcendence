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

const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const errorStore = useErrorStore();

const user = ref<User | null>(null);
const isMe = ref(false);

const fetchUserData = async (id: number) => {
  if (id === userStore.id) {
    user.value = userStore.$state;
    isMe.value = true;
  } else {
    try {
      user.value = await UserService.findOneById(id);
    } catch (error) {
      errorStore.setError((error as Error).message);
      await router.push({ path: '/' });
    }
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
  <button v-if="isMe" class="button" @click="logout">Log out</button>
  <div v-if="user" class="profileViewParent">
    <ProfileComponent class="profile" />
    <div class="lowerPart">
      <ParentHistoryComponent />
      <div class="aboutParent">
        <AboutMeComponent />
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
.profile {
  /* grid-column: 1 / 6; */
  /* margin: 1px; */
}

.history {
  /* display: grid; */
  /* grid-column: 1 / 4;
  grid-row: 2 / 3; */
  /* margin: 1px;
  height: inherit; */
  /* grid-auto-rows: 1fr; */
}

.aboutParent {
  display: grid;
  /* grid-column: 4 / 6; */
  /* grid-row: 2 / 3; */
  /* margin: 1px; */
  /* grid-auto-rows: 1fr; */
  height: inherit;
}

.achievement {
  /* margin-top: 1px; */
}

.button {
  text-decoration: none;
  border-radius: 25px;
  color: white;
  background-color: #f8971d;
  /* padding: 1%; */
  cursor: pointer;
  float: right;
  font-size: 1vw;
}
</style>
