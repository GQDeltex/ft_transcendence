<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const router = useRouter();
const userStore = useUserStore();
const code = ref('');

const submit = async () => {
  await userStore.verify2FA(code.value);
  if (userStore.isLoggedIn) {
    await router.push({ path: '/' });
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
