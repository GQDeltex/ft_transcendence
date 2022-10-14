<script setup lang="ts">
import { useUserStore } from '../store/user';

const userStore = useUserStore();
</script>

<template>
  <div class="about">
    <p style="font-size: 0.7em">
      About<span style="float: right">(O) Online</span>
    </p>
    <p class="moreAbout">+ Tell us about yourself</p>
    <div class="infoBox">
      User name: <span class="info">{{ userStore.username }}</span>
      <br />
      First name: <span class="info">{{ userStore.username }}</span>
      <br />
      Last name: <span class="info">{{ userStore.username }}</span>
      <br />
      Intra login: <span class="info">intralogin</span>
      <br />
      Coalition: <span class="info">Castra</span>
      <br />
      Last Login: <span class="info">14.10.2022</span>
      <br />
      Campus: <span class="info">Wolfsburg, Germany</span>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 10px;
  display: grid;
  border: 1px solid grey;
}

.moreAbout {
  font-size: 0.7em;
  color: #f8971d;
}
.infoBox {
  font-size: 0.7em;
  color: grey;
}

.info {
  color: white;
}
</style>
