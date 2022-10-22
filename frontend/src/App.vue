<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import { useUserStore } from './store/user';
import { useErrorStore } from './store/error';
import { socket } from './plugin/socket';
import ModalComponent from './components/globalUse/ModalComponent.vue';
import NavbarComponent from './components/globalUse/NavbarComponent.vue';
import { useMessagesStore } from './store/message';

const messagesStore = useMessagesStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const errorStore = useErrorStore();
const { getErrors: errors } = storeToRefs(errorStore);

if (isLoggedIn.value && !socket.connected) socket.connect();

watch(isLoggedIn, (newLogState) => {
  if (newLogState) socket.connect();
  else socket.disconnect();
});

socket.on('prc', (data) => {
  console.log('Msg from: ', data);
  messagesStore.saveMessage(data);
});

socket.on('status', (status) => {
  console.log(status.msg);
  messagesStore.saveMessage(status);
});
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
