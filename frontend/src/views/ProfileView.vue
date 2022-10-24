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

const file = ref<HTMLInputElement | null>(null);

const uploadPicture = async () => {
  if (file.value?.files) {
    await userStore.uploadPicture(file.value.files[0]);
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

  <div v-if="user" class="profileView">
    <ProfileComponent class="profile" />
    <ParentHistoryComponent class="history" />
    <div class="aboutParent">
      <AboutMeComponent />
      <ParentAchievementsComponent class="achievement" />
    </div>
  </div>
  <input ref="file" name="picture" type="file" accept="image/*" />
  <button class="button" @click="uploadPicture" />
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
  margin: 4px 1px 1px;
}

.button {
  text-decoration: none;
  border-radius: 20px;
  color: white;
  background-color: #f8971d;
  padding: 10px;
  cursor: pointer;
}
</style>
