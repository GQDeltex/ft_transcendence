<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useI18n } from 'vue-i18n';

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
  <div class="input">
    <span>{{ useI18n().t('enter2fa') }}</span><br />
    <input v-model="code" type="text" @keyup.enter="submit" />
    <button @click="submit">{{ useI18n().t('submit') }}</button>
  </div>
</template>

<style scoped>
.input {
  color: #c00000;
}
</style>
