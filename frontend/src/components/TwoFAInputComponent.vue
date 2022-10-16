<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const code = ref('');

const submit = async () => {
  await userStore.verify2FA(code.value);
  if (userStore.isLoggedIn) {
    location.href = '/';
  }
};
</script>

<template>
  <div>
    <span>Please enter your 2FA code</span><br />
    <input v-model="code" type="text" @keyup.enter="submit" />
    <button @click="submit">Submit</button>
  </div>
</template>

<style scoped></style>
