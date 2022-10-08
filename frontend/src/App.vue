<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useUserStore } from './store/user';
import NavbarComponent from './components/NavbarComponent.vue';

const userStore = useUserStore();
</script>

<template>
  <header v-if="userStore.isLoggedIn">
    <NavbarComponent />
  </header>
  <RouterView />
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: black;
}
</style>

<style scoped>
header {
  display: grid;
  row-gap: 10px;
}
</style>
