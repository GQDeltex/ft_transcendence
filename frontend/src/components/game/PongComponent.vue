<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { socket } from '@/service/socket';
import { Ball, Priority } from './ball';
import { Paddle } from './paddle';
import GamePeopleComponent from './GamePeopleComponent.vue';
import type { Item, User } from '@/store/user';
import { useUserStore } from '@/store/user';
import { useI18n } from 'vue-i18n';

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
const videoChunks: Blob[] = [];
let videoRecorder: MediaRecorder | null = null;

let ball: Ball | null = null;
let leftPaddle: Paddle | null = null;
let rightPaddle: Paddle | null = null;

const initialCanvasWidth = 0.569 * window.innerWidth;
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

ballImage.crossOrigin = 'anonymous';
mapImage.crossOrigin = 'anonymous';
paddleImage.crossOrigin = 'anonymous';
ballImage.src =
  equipped.find((item) => item.type === 'ball')?.picture ??
  'https://i.imgur.com/88DcIk0.png';
mapImage.src =
  equipped.find((item) => item.type === 'map')?.picture ??
  'https://i.imgur.com/e89MmmD.png';
paddleImage.src =
  equipped.find((item) => item.type === 'paddle')?.picture ??
  'https://i.imgur.com/88DcIk0.png';

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
  if (props.hostPlayer.id === 42069 || props.otherPlayer.id == 42069) return;
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
  ctx.font = '4vw Silkscreen';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(
    otherScore.value + ' ' + yourScore.value,
    canvas.width / 2,
    canvas.height / 9,
  );
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
        leftPaddle?.setDir(gameData.paddleDir, false);
      if (gameData.from === props.hostPlayer.id)
        rightPaddle?.setDir(gameData.paddleDir, false);
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
      gameData.from === props.hostPlayer.id
    ) {
      if (ball === null) return;
      gameData.direction.x = -gameData.direction.x;
      gameData.position.x =
        1 - gameData.position.x - ball.getRelativeBallSize();
    }
    ball?.setDir(gameData.direction);
    ball?.setPos(gameData.position);
  }

  if (typeof gameData.score !== 'undefined') {
    if (props.priority === Priority.CLIENT) {
      otherScore.value = gameData.score[0];
      yourScore.value = gameData.score[1];
    } else {
      otherScore.value = gameData.score[1];
      yourScore.value = gameData.score[0];
    }
  }
});

socket.on('gameBlur', (cowardId: number) => {
  videoRecorder?.pause();
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
  videoRecorder?.resume();
});

socket.on('onStreamJoin', (bigGameData) => {
  if (isHost.value) {
    console.log('EMITTING');
    socket.emit('onStreamJoin', {
      requesterId: bigGameData.requesterId,
      gameId: props.gameId,
      leftPaddle: leftPaddle?.getAll(),
      rightPaddle: rightPaddle?.getAll(),
      ball: ball?.getAll(),
      scores: [yourScore.value, otherScore.value],
    });
  } else {
    leftPaddle?.setAll(bigGameData.leftPaddle);
    rightPaddle?.setAll(bigGameData.rightPaddle);
    ball?.setAll(bigGameData.ball);
    yourScore.value = bigGameData.scores[0];
    otherScore.value = bigGameData.scores[1];
    if (bigGameData.state === 'paused') ball?.setSpeed(0);
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
    canvas.width = 0.569 * window.innerWidth;
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

    const videoStream = canvas.captureStream();
    videoRecorder = new MediaRecorder(videoStream, {
      mimeType: 'video/webm',
    });

    videoRecorder.ondataavailable = (event) => {
      if (event.data) videoChunks.push(event.data);
    };

    videoRecorder.onstop = () => {
      const blob: Blob = new Blob(videoChunks, { type: 'video/webm' });
      const file: File = new File([blob], `game_${props.gameId}.webm`, {
        type: 'video/webm',
      });
      console.log('uploading game data...');
      socket.emit('uploadGame', {
        gameId: props.gameId,
        file,
      });
    };
  }

  videoRecorder?.start(100);
  window.requestAnimationFrame(update);
});

onBeforeUnmount(() => {
  videoRecorder?.stop();
  isGameLoaded.value = false;
  socket.off('gameData');
  socket.off('gameBlur');
  socket.off('gameFocus');
  socket.off('onStreamJoin');
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  window.removeEventListener('blur', handleBlur);
  window.removeEventListener('focus', handleFocus);
  window.onresize = null;
});
</script>

<template>
  <div>
    <div v-if="isHost || priority === Priority.VIEWER" class="players">
      <GamePeopleComponent :client="props.otherPlayer" class="player1" />
      <GamePeopleComponent :client="props.hostPlayer" class="player2" />
    </div>
    <div v-else class="players">
      <GamePeopleComponent :client="props.hostPlayer" class="player1" />
      <GamePeopleComponent :client="props.otherPlayer" class="player2" />
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
          {{ useI18n().t('claimvictory') }}
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

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 800; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
}

.modal-content {
  background-image: url('@/assets/frosty_bg_frame.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: left;
  background-position-y: top;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: inherit;
  background-color: #112;
  margin: 25% auto; /* 15% from the top and centered */
  /* padding-top: 5%; */
  padding-left: 15%;
  width: 50%;
  aspect-ratio: 4/3;
  color: #c00000;
  opacity: 80%;
  position: absolute;
  top: -15vw;
  left: 25vw;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 850px) {
  .modal-content {
    width: 100%;
    padding-left: 30%;
    top: 0;
    left: 0;
  }
}

.modal-content h1 {
  font-size: 1.5vw;
  margin: 0;
}

.ok {
  font-family: 'Mountains of Christmas', cursive;
  cursor: pointer;
  width: 60%;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  border-color: transparent;
  margin-bottom: 1%;
}

.ok:disabled {
  font-family: 'Mountains of Christmas', cursive;
  cursor: pointer;
  width: 60%;
  border-radius: 5px;
  color: #c00000;
  background-color: white;
  border-color: transparent;
  margin-bottom: 1%;
}

/* Add Animation */
.modal-content {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
