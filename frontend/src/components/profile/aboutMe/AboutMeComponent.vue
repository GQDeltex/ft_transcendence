<script setup lang="ts">
import { inject, ref, type Ref, computed } from 'vue';
import type { User } from '@/store/user';
import { useI18n } from 'vue-i18n';

const { user } = inject<{ user: Ref<User | null> }>('user', {
  user: ref(null),
});

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const statusText = computed(() => {
  switch (user.value?.status) {
    case 'online':
      return useI18n().t('online');
    case 'in game':
      return useI18n().t('ingame');
    default:
      return useI18n().t('offline');
  }
});
</script>

<template>
  <div v-if="user" class="about">
    <span style="font-size: 2vw" class="headerText">
      {{ useI18n().t('about') }}
      <span style="float: right">{{ capitalize(statusText ?? '') }}</span>
    </span>
    <div class="infoBox">
      {{ useI18n().t('username') }}:
      <span class="info">{{ user.username }}</span>
      <br />
      {{ useI18n().t('firstname') }}:
      <span class="info">{{ user.firstname }}</span>
      <br />
      {{ useI18n().t('lastname') }}:
      <span class="info">{{ user.lastname }}</span>
      <br />
      {{ useI18n().t('intralogin') }}:
      <span class="info">{{ user.intra }}</span>
      <br />
      {{ useI18n().t('coalition') }}:
      <span class="info">{{ user.coalition }}</span>
      <br />
      {{ useI18n().t('lastlogin') }}:
      <span class="info">
        {{
          new Date(user.lastLoggedIn ?? 0).toLocaleTimeString() +
          ' ' +
          new Date(user.lastLoggedIn ?? 0).toLocaleDateString()
        }}
      </span>
      <br />
      {{ useI18n().t('campus') }}:
      <span class="info">{{ user.campus }}, {{ user.country }}</span>
    </div>
  </div>
</template>

<style scoped>
.headerText {
  color: #c00000;
}

.about {
  padding: 1vw;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
}

.infoBox {
  font-size: 1.5vw;
  color: grey;
  overflow-y: scroll;
}

.info {
  color: white;
}
</style>
