<script setup lang="ts">
import { inject } from 'vue';
import type { User } from '@/store/user';
import { useI18n } from 'vue-i18n';

const { user } = inject<{ user: User | null }>('user', {
  user: null,
});

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div v-if="user" class="about">
    <span style="font-size: 2vw" class="headtext">
      {{ useI18n().t('about') }}
      <span style="float: right">{{ capitalize(user.status ?? '') }}</span>
    </span>
    <div class="infoBox">
      {{ useI18n().t('username') }}: <span class="info">{{ user.username }}</span>
      <br />
      {{ useI18n().t('firstname') }}: <span class="info">{{ user.firstname }}</span>
      <br />
      {{ useI18n().t('lastname') }}: <span class="info">{{ user.lastname }}</span>
      <br />
      {{ useI18n().t('intralogin') }}: <span class="info">{{ user.intra }}</span>
      <br />
      {{ useI18n().t('coalition') }}: <span class="info">{{ user.coalition }}</span>
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
      {{ useI18n().t('campus') }}: <span class="info">{{ user.campus }}, {{ user.country }}</span>
    </div>
  </div>
</template>

<style scoped>
.headtext {
  color: #c00000;
}
.about {
  padding: 1vw;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  /* max-height: inherit; */
  /* max-height: 20vh; */
  /* height: 1fr; */
  /* min-height: 20vh; */
}

.infoBox {
  font-size: 1.5vw;
  color: grey;
  /* max-height: inherit; */
  /* max-height: 1fr; */
  overflow-y: scroll;
}

.info {
  color: white;
}
</style>
