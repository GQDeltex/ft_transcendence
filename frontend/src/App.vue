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

socket.on('newClient', async () => {
  console.log('New client connected, logging this one out');
  await userStore.logout();
  await router.push({ path: '/login' });
  errorStore.setError(
    "You've been logged out, because only one session can be active at a time",
  );
});

socket.on('onGameRequestAccepted', async (data: { gameId: number }) => {
  await router.push({ name: 'PongView', query: { gameId: data.gameId } });
});

//
interface SnowFlake {
  /** The current x position. */
  x: number;
  /** The current y position. */
  y: number;
  /** The radius in pixels. */
  radius: number;
  /** A pixel value to add to y movement to speed/slow itself. */
  drop: number;
  /** A pixel value to add to x movement to speed/slow itself. */
  sway: number;
}

/** Helper function returning a random decimal between min and max. */
function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/** Helper functions to generate a random int inclusive of min and max. */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create and attach our canvas.
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

// Update the canvas width/height data when the window resizes.
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Generate some snow flakes.
const flakes: SnowFlake[] = [];
const numOfFlakes = randomInt(100, 300);
for (let i = 0; i < numOfFlakes; i++) {
  flakes.push({
    x: randomInt(0, canvas.width),
    y: randomInt(0, canvas.height),
    radius: random(0.25, 2),
    sway: random(-0.3, 0.3),
    drop: random(-0.3, 0.3),
  });
}

const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
// Setup and draw our flakes.
function draw() {
  if (ctx === null) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.66)';
  ctx.beginPath();
  flakes.forEach((flake) => {
    // Draw our flake at its current x/y
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

    // Update our flake's next x/y.
    flake.y += 1 + flake.drop;
    flake.x += 1 + flake.sway;
    // If our snowflake goes off the left, right or bottom,
    // move it to the opposite side.
    if (flake.x > canvas.width) {
      flake.x = 0;
    } else if (flake.x < 0) {
      flake.x = canvas.width;
    } else if (flake.y > canvas.height) {
      flake.x = randomInt(0, canvas.width);
      flake.y = -2;
    }
  });
  ctx.fill();

  // Repeat!
  window.requestAnimationFrame(draw);
}

// Kick it off.
window.requestAnimationFrame(draw);
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
  <RouterView @hide="hide = true" @show="hide = false" />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mountains+of+Christmas&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Silkscreen&display=swap');
body {
  font-size: 2.3vw;
  font-family: 'Mountains of Christmas', cursive;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(#123, #111);
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
