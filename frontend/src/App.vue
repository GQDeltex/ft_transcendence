<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import { useUserStore } from './store/user';
import { useErrorStore } from './store/error';
import ModalComponent from './components/ModalComponent.vue';
import NavbarComponent from './components/NavbarComponent.vue';

const userStore = useUserStore();
const errorStore = useErrorStore();
const { getErrors: errors } = storeToRefs(errorStore);
</script>

<template>
  <header v-if="userStore.isLoggedIn">
    <NavbarComponent />
  </header>
  <ModalComponent
    v-for="error in errors"
    :key="error"
    heading="Error"
    :text="error"
    :callback="errorStore.delError"
  />
  <RouterView />
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: #000000;
}
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>

<style scoped>
header {
  display: grid;
  row-gap: 10px;
}
</style>
