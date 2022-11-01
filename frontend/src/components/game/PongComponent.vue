<template>
  <!-- <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <div v-if="props.priority" class="players">
    <GamePeopleComponent
      :key="props.player2ID.id"
      :client="props.player2ID"
      class="player1"
    />
    <GamePeopleComponent
      :key="props.player1ID.id"
      :client="props.player1ID"
      class="player2"
    />
  </div>
  <div v-else class="players">
    <GamePeopleComponent
      :key="props.player1ID.id"
      :client="props.player1ID"
      class="player1"
    />
    <GamePeopleComponent
      :key="props.player2ID.id"
      :client="props.player2ID"
      class="player2"
    />
  </div>
  <div id="feld" class="field">
    <div class="score">
      <div id="player">{{ playerScore }}</div>
      <div id="remote">{{ remoteScore }}</div>
    </div>
    <img class="back" src="@/assets/OGPong.png" />
    <div id="ball" class="ball">
      <img class="ball" src="@/assets/sexy-guy-001-modified.png" />
    </div>
    <div id="playerPad" class="paddle paddle-left"></div>
    <div id="remotePad" class="paddle paddle-right"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '../../service/socket';
import { Element } from './element';
import { Ball } from './ball';
import { Paddle } from './paddle';
import GamePeopleComponent from './GamePeopleComponent.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const remoteScore = ref(0);
const playerScore = ref(0);
const gameLoader = ref(true);

const props = defineProps<{
  gameId: number;
  priority: boolean;
  player1ID: {
    id: number;
    username: string;
    title: string[];
    picture: string;
    status?: string | undefined;
  };
  player2ID: {
    id: number;
    username: string;
    title: string[];
    picture: string;
    status?: string | undefined;
  };
}>();

onUnmounted(() => {
  gameLoader.value = false;
});

onMounted(() => {
  console.log(props.player1ID);
  console.log(props.player2ID);
  // player1.value = await UserService.findOneById(props.player1ID);
  // player2.value = await UserService.findOneById(props.player2ID);
  // console.log('player1 = ' + player1.value.username + ' player2 ' + player2.value.username)
  console.log(props.gameId);
  const field = new Element(document.getElementById('feld'), props.gameId);
  const ball = new Ball(
    document.getElementById('ball'),
    field.getRect(),
    props.gameId,
    props.priority,
  );
  const playerPad = new Paddle(
    document.getElementById('playerPad'),
    field.getRect(),
    props.gameId,
  );
  let remotePad = new Paddle(
    document.getElementById('remotePad'),
    field.getRect(),
    props.gameId,
  );

  let lastTime: number | null = null;
  var delta: number;
  async function pupdate(time: number) {
    if (lastTime != null) {
      delta = time - lastTime;
      ball.update(delta, remotePad.getRect());
      remotePad.update(delta, time);
      playerPad.update(delta, time);
      if (props.priority) loseCase();
    }
    lastTime = time;
    if (gameLoader.value) window.requestAnimationFrame(pupdate);
  }

  function loseCase() {
    if (ball.get_pos_x() >= 100 + ball._shape.x / 2) {
      playerScore.value++;
      ball.reset([playerScore.value, remoteScore.value]);
      playerPad.sety(50);
      remotePad.sety(50);
    }
    if (ball.get_pos_x() <= 0 - ball._shape.x / 2) {
      remoteScore.value++;
      ball.reset([playerScore.value, remoteScore.value]);
      playerPad.sety(50);
      remotePad.sety(50);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    if (e.repeat) return;
    if (e.code == 'ArrowUp') {
      remotePad.changeDir(-10);
    } else if (e.code == 'ArrowDown') {
      remotePad.changeDir(10);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    if (e.repeat) return;
    if (e.code == 'ArrowUp' || e.code == 'ArrowDown') {
      remotePad.changeDir(0);
    }
  });

  socket.on('gameData', (e) => {
    console.log(e);
    if (e.name === 'opponent') playerPad.changeDir(e.changeDir, true);
    if (e.name === 'ball') ball.changeDir(e.changeDir);
    if (typeof e.score != 'undefined') {
      remoteScore.value = e.score[0];
      playerScore.value = e.score[1];
      playerPad.sety(50);
      remotePad.sety(50);
    }
  });

  window.onresize = function () {
    const pField = new Element(document.getElementById('feld'), props.gameId);
    const pBall = new Ball(
      document.getElementById('ball'),
      field.getRect(),
      props.gameId,
      props.priority,
    );
    const pPlay = new Paddle(
      document.getElementById('player'),
      field.getRect(),
      props.gameId,
    );
    const pRemo = new Paddle(
      document.getElementById('remote'),
      field.getRect(),
      props.gameId,
    );

    ball.reeesize(pField.getRect(), pBall.getRect());
    playerPad.reeesize(pField.getRect(), pPlay.getRect());
    remotePad.reeesize(pField.getRect(), pRemo.getRect());
  };
  window.requestAnimationFrame(pupdate);
});
</script>

<style scoped>
.field {
  background-color: #212121;
  position: relative;
  margin-left: 15vw;
  margin-top: 1vh;
  height: 70vh;
  width: 70vw;
  overflow: hidden;
  z-index: -1;
}
.back {
  height: 100%;
  width: 106%;
  transform: translate(-3%, -6%);
  z-index: -1;
}
.paddle {
  --y: 50;
  position: absolute;
  margin: auto;
  background-color: #fff;
  top: calc(var(--y) * 1%);
  transform: translate(0%, -50%);
  width: 1%;
  height: 13%;
  z-index: 0;
}

.paddle-left {
  right: 98%;
}
.paddle-right {
  right: 1%;
}
.ball {
  --x: 50;
  --y: 50;

  position: absolute;
  background-color: #fff;
  left: calc(var(--x) * 1%);
  top: calc(var(--y) * 1%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  width: 4vh;
  height: 4vh;
  z-index: 0;
}
.score {
  position: relative;
  top: 1em;
  right: calc(100% / -2);
  color: grey;
  font-size: 2vh;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 4vh;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: white;
  z-index: 1;
}
.score > * {
  flex-grow: 1;
  flex-basis: 0;
  padding: 0% 1%;
  margin: 0% 0%;
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
</style>
