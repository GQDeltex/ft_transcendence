<script setup lang="ts">
import { watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import { useUserStore } from './store/user';
import { useErrorStore } from './store/error';
import { socket } from './service/socket';
import ModalComponent from './components/globalUse/ModalComponent.vue';
import NavbarComponent from './components/globalUse/NavbarComponent.vue';
import { useMessagesStore } from './store/message';
import { useRouter } from 'vue-router';

const router = useRouter();
const messagesStore = useMessagesStore();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const errorStore = useErrorStore();
const { getErrors: errors } = storeToRefs(errorStore);

const hide = ref(false);

if (isLoggedIn.value && !socket.connected) socket.connect();

watch(isLoggedIn, (newLogState) => {
  if (newLogState) socket.connect();
  else socket.disconnect();
});

socket.on('prc', (data) => {
  // console.log('Msg from: ', data);
  messagesStore.saveMessage(data);
});

socket.on('status', (status) => {
  // console.log(status.msg);
  messagesStore.saveMessage(status);
});

socket.on('newclient', async () => {
  console.log('New client connected, loggin this one out');
  await userStore.logout();
  await router.push({ path: '/login' });
  errorStore.setError(
    "You've been logged out, because only one session can be active at a time",
  );
});

socket.on('onGameRequestAccepted', async (data: { gameId: number }) => {
  await router.push({ name: 'PongView', query: { gameId: data.gameId } });
});
</script>

<template>
  <header v-if="userStore.isLoggedIn && !hide">
    <NavbarComponent />
  </header>
  <ModalComponent
    v-for="error in errors"
    :key="error"
    heading="Error"
    :text="error"
    :callback="errorStore.delError"
  />
  <RouterView @hide="hide = true" @unhide="hide = false" />
</template>

<style>
:root {
  /* First ColorSet */
  --main-bg-color: black;
  --main-1-color: #f8971d;
  --main-2-color: white;
  --main-3-color: grey;
  --main-4-color: #202020;
  --main-title-font-size: 2vw;
  --main-text-font-size: 1vw;
  --main-small-font-size: 0.8vw;

  /* Second ColorSet */
  /* --main-bg-color: grey;
  --main-1-color: green;
  --main-2-color: yellow;
  --main-3-color: purple;
  --main-4-color: blue;
  --main-title-font-size: 3vw;
  --main-text-font-size: 2vw;
  --main-small-font-size: 1vw; */
}

body {
  font-family: Arial, Helvetica, sans-serif;
  color: var(--main-2-color);
  background-color: var(--main-bg-color);
}
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

button {
  text-decoration: none;
  border-radius: 5px;
  color: var(--main-bg-color);
  background-color: var(--main-1-color);
  border-color: transparent;
  cursor: pointer;
}
</style>

<style scoped>
header {
  display: grid;
  row-gap: 10px;
}
</style>
