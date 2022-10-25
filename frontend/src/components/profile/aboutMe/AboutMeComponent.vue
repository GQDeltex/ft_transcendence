<script setup lang="ts">
import { inject } from 'vue';
import type { User } from '@/store/user';

const { user } = inject<{ user: User | null }>('user', {
  user: null,
});

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div v-if="user" class="about">
    <span style="font-size: 2vw">
      About
      <span style="float: right">{{ capitalize(user.status ?? '') }}</span>
    </span>
    <p class="moreAbout">+ Tell us about yourself</p>
    <div class="infoBox">
      User name: <span class="info">{{ user.username }}</span>
      <br />
      First name: <span class="info">{{ user.firstname }}</span>
      <br />
      Last name: <span class="info">{{ user.lastname }}</span>
      <br />
      Intra login: <span class="info">{{ user.intra }}</span>
      <br />
      Coalition: <span class="info">{{ user.coalition }}</span>
      <br />
      Last Login:
      <span class="info">
        {{
          new Date(user.lastLoggedIn ?? 0).toLocaleTimeString() +
          ' ' +
          new Date(user.lastLoggedIn ?? 0).toLocaleDateString()
        }}
      </span>
      <br />
      Campus: <span class="info">{{ user.campus }}, {{ user.country }}</span>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 1vw;
  border: 1px solid grey;
}

.moreAbout {
  font-size: 2vw;
  color: #f8971d;
}

.infoBox {
  font-size: 2vw;
  color: grey;
}

.info {
  color: white;
}
</style>
