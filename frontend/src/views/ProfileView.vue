<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

function logOut() {
  userStore.logOut();
  router.push({ path: '/login' });
}
</script>

<template>
  <button class="button" @click="logOut">Log out</button>
</template>

<style scoped>
button {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: white;
  padding: 10px;
}
</style>
