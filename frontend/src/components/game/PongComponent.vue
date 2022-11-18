<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { socket } from '@/service/socket';
import { Ball, Priority } from './ball';
import { Paddle } from './paddle';
import GamePeopleComponent from './GamePeopleComponent.vue';
import type { Item, User } from '@/store/user';
import { useUserStore } from '@/store/user';

const props = defineProps<{
  gameId: number;
  priority: Priority;
  hostPlayer: User;
  otherPlayer: User;
}>();

const userStore = useUserStore();

const yourScore = ref(0);
const otherScore = ref(0);
const isGameLoaded = ref(true);
const showClaimVictory = ref(false);
let timeoutId = -1;

let ball: Ball | null = null;
let leftPaddle: Paddle | null = null;
let rightPaddle: Paddle | null = null;

const initialCanvasWidth = 0.69 * window.innerWidth;
const initialCanvasHeight = (initialCanvasWidth * 9) / 16;

const isHost = computed(() => {
  return props.priority === Priority.HOST;
});

const onClaimVictory = () => {
  showClaimVictory.value = false;
  socket.emit('claimVictory', { gameId: props.gameId });
};

const ballImage = new Image();
const mapImage = new Image();
const paddleImage = new Image();

let equipped: Item[];
if (props.priority === Priority.HOST)
  equipped = props.hostPlayer.equipped ?? [];
else if (props.priority === Priority.CLIENT)
  equipped = props.otherPlayer.equipped ?? [];
else equipped = userStore.equipped ?? [];

ballImage.src =
  equipped.find((item) => item.type === 'ball')?.picture ??
  'https://cdn.discordapp.com/attachments/841569913466650625/1036830183673565194/BG_white.png';
mapImage.src =
  equipped.find((item) => item.type === 'map')?.picture ??
  'https://cdn.discordapp.com/attachments/841569913466650625/1036127796323430540/OGPong.png';
paddleImage.src =
  equipped.find((item) => item.type === 'paddle')?.picture ??
  'https://cdn.discordapp.com/attachments/841569913466650625/1036830183673565194/BG_white.png';

const handleKeyUp = (e: KeyboardEvent): void => {
  if (e.repeat) return;
  if (e.code === 'ArrowUp' || e.code === 'ArrowDown') rightPaddle?.setDir(0);
};

const handleKeyDown = (e: KeyboardEvent): void => {
  if (e.repeat) return;
  if (e.code === 'ArrowUp') rightPaddle?.setDir(-1);
  if (e.code === 'ArrowDown') rightPaddle?.setDir(1);
};

const handleBlur = (): void => {
  if (props.hostPlayer.id === 42069 || props.otherPlayer.id == 42069) return;
  socket.emit('gameBlur', {
    gameId: props.gameId,
    cowardId: isHost.value ? props.hostPlayer.id : props.otherPlayer.id,
  });
};

const handleFocus = (): void => {
  socket.emit('gameFocus', {
    gameId: props.gameId,
    cowardId: isHost.value ? props.hostPlayer.id : props.otherPlayer.id,
  });
};

let lastTime = 0;
let elapsedTime = 0;
const update = (currentTime: number) => {
  if (lastTime !== 0) elapsedTime = currentTime - lastTime;
  if (leftPaddle === null || rightPaddle === null) return;
  const canvas = document.getElementById('game') as HTMLCanvasElement | null;
  if (canvas === null) return window.requestAnimationFrame(update);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
  ball?.draw(elapsedTime, rightPaddle, yourScore, otherScore);
  leftPaddle?.draw(elapsedTime);
  rightPaddle?.draw(elapsedTime);
  lastTime = currentTime;
  if (isGameLoaded.value) window.requestAnimationFrame(update);
};

socket.on('gameData', (gameData) => {
  if (gameData.name === 'opponent') {
    if (props.priority === Priority.VIEWER) {
      if (gameData.from === props.otherPlayer.id)
        rightPaddle?.setDir(gameData.paddleDir, false);
      if (gameData.from === props.hostPlayer.id)
        leftPaddle?.setDir(gameData.paddleDir, false);
    } else {
      if (
        (isHost.value && gameData.from === props.otherPlayer.id) ||
        (!isHost.value && gameData.from === props.hostPlayer.id)
      )
        leftPaddle?.setDir(gameData.paddleDir, false);
    }
  }

  if (gameData.name === 'ball' && gameData.from !== userStore.id) {
    if (
      props.priority === Priority.VIEWER &&
      gameData.from === props.otherPlayer.id
    ) {
      if (ball === null) return;
      gameData.direction.x = -gameData.direction.x;
      gameData.position.x =
        1 - gameData.position.x - ball.getRelativeBallSize();
      console.log(gameData.position);
    }
    ball?.setDir(gameData.direction);
    ball?.setPos(gameData.position);
  }

  if (typeof gameData.score !== 'undefined') {
    if (props.priority === Priority.HOST) {
      otherScore.value = gameData.score[1];
      yourScore.value = gameData.score[0];
    } else {
      otherScore.value = gameData.score[0];
      yourScore.value = gameData.score[1];
    }
  }
});

socket.on('gameBlur', (cowardId: number) => {
  ball?.setSpeed(0);
  leftPaddle?.setDir(0, false);
  rightPaddle?.setDir(0, false);
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  if (
    props.priority !== Priority.VIEWER &&
    ((isHost.value && cowardId != props.hostPlayer.id) ||
      (!isHost.value && cowardId != props.otherPlayer.id))
  ) {
    showClaimVictory.value = true;
    const claimButton = document.getElementById(
      'claimButton',
    ) as HTMLButtonElement | null;
    if (claimButton !== null) claimButton.disabled = true;
    if (timeoutId > -1) {
      clearTimeout(timeoutId);
      timeoutId = -1;
    }
    timeoutId = setTimeout(() => {
      const claimButton = document.getElementById(
        'claimButton',
      ) as HTMLButtonElement | null;
      if (claimButton !== null) claimButton.disabled = false;
    }, 10000);
  }
});

socket.on('gameFocus', () => {
  showClaimVictory.value = false;
  ball?.setSpeed();
  if (props.priority !== Priority.VIEWER) {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  }
});

socket.on('onStreamJoin', (bigGameData) => {
  if (isHost.value) {
    socket.emit('onStreamJoin', {
      requesterId: bigGameData.requesterId,
      gameId: props.gameId,
      leftPaddle: leftPaddle?.getAll(),
      rightPaddle: rightPaddle?.getAll(),
      ball: ball?.getAll(),
      scores:
        props.priority === Priority.HOST
          ? [yourScore, otherScore]
          : [otherScore, yourScore],
    });
  } else if (props.priority === Priority.VIEWER) {
    leftPaddle?.setAll(bigGameData.leftPaddle);
    rightPaddle?.setAll(bigGameData.rightPaddle);
    ball?.setAll(bigGameData.ball);
    yourScore.value = bigGameData.scores[0];
    otherScore.value = bigGameData.scores[1];
  }
});

onMounted(async () => {
  await nextTick();
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  ball = new Ball(props.gameId, canvas, ballImage, props.priority);
  leftPaddle = new Paddle(props.gameId, canvas, paddleImage, true);
  rightPaddle = new Paddle(props.gameId, canvas, paddleImage, false);

  if (props.priority === Priority.VIEWER) {
    socket.emit('onStreamJoin', {
      gameId: props.gameId,
    });
  }

  window.onresize = () => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const oldCanvasWidth: number = canvas.width;
    const oldCanvasHeight: number = canvas.height;
    canvas.width = 0.69 * window.innerWidth;
    canvas.height = (canvas.width * 9) / 16;
    ball?.resize(oldCanvasWidth, oldCanvasHeight);
    leftPaddle?.resize(oldCanvasWidth, oldCanvasHeight);
    rightPaddle?.resize(oldCanvasWidth, oldCanvasHeight);
  };

  if (props.priority !== Priority.VIEWER) {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
  }

  window.requestAnimationFrame(update);
});

onUnmounted(() => {
  isGameLoaded.value = false;
  socket.off('gameData');
  socket.off('gameBlur');
  socket.off('gameFocus');
  socket.off('onStreamJoin');
});
</script>

<template>
  <div>
    <div v-if="isHost" class="players">
      <GamePeopleComponent
        :key="props.otherPlayer.id"
        :client="props.otherPlayer"
        class="player1"
      />
      <GamePeopleComponent
        :key="props.hostPlayer.id"
        :client="props.hostPlayer"
        class="player2"
      />
    </div>
    <div v-else class="players">
      <GamePeopleComponent
        :key="props.hostPlayer.id"
        :client="props.hostPlayer"
        class="player1"
      />
      <GamePeopleComponent
        :key="props.otherPlayer.id"
        :client="props.otherPlayer"
        class="player2"
      />
    </div>
    <div class="score">
      <div id="player">{{ otherScore }}</div>
      <div id="remote">{{ yourScore }}</div>
    </div>
    <canvas
      id="game"
      class="field"
      :width="initialCanvasWidth"
      :height="initialCanvasHeight"
    />
    <div v-if="showClaimVictory" class="modal">
      <div class="modal-content">
        <button id="claimButton" class="ok" disabled @click="onClaimVictory">
          Claim victory
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field {
  margin-left: auto;
  margin-right: auto;
  display: block;
  z-index: 69;
}

.score {
  position: relative;
  top: 1em;
  right: calc(100% / -2);
  transform: translate(-50%, 30%);
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 4vw;
  font-family: 'Silkscreen', cursive;
  color: white;
  z-index: 1;
}

.score > * {
  flex-grow: 1;
  flex-basis: 0;
  padding: 0 1%;
  margin: 0 0;
}

.score > :first-child {
  text-align: right;
}

.score > :last-child {
  text-align: left;
}

.player1 {
  grid-column: 1/2;
  justify-content: center;
  text-align: center;
}

.player2 {
  grid-column: 2/3;
  justify-content: center;
  text-align: center;
}

.players {
  display: grid;
}

.modal {
  position: fixed;
  z-index: 696;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 2vw;
  border: 1px solid #888;
  width: 25%;
  color: black;
}

.ok {
  cursor: pointer;
}
</style>
