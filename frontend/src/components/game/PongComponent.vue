<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '@/service/socket';
import { Element } from './element';
import { Ball } from './ball';
import { Paddle } from './paddle';
import GamePeopleComponent from './GamePeopleComponent.vue';
import { useUserStore } from '@/store/user';
import type { Item } from '@/store/user';

const userStore = useUserStore();
const remoteScore = ref(0);
const playerScore = ref(0);
const gameLoader = ref(true);
const ballImg = ref(
  'https://cdn.discordapp.com/attachments/841569913466650625/1036830183673565194/BG_white.png',
);
const mapImg = ref(
  'https://cdn.discordapp.com/attachments/841569913466650625/1036127796323430540/OGPong.png',
);

const claimVictory = ref(false);
let timeoutId = -1;
const paddleImg = ref(
  'https://cdn.discordapp.com/attachments/841569913466650625/1036830183673565194/BG_white.png',
);

const props = defineProps<{
  gameId: number;
  priority: number;
  player1ID: {
    id: number;
    username: string;
    title: string[];
    picture: string;
    status?: string | undefined;
    equipped?: Item[];
  };
  player2ID: {
    id: number;
    username: string;
    title: string[];
    picture: string;
    status?: string | undefined;
    equipped?: Item[] | undefined;
  };
}>();

function onClaimVictory() {
  claimVictory.value = false;
  socket.emit('claimVictory', { gameId: props.gameId });
}

// console.log(props);
function graph() {
  let cur: Item;
  if (
    typeof props.player1ID.equipped !== 'undefined' &&
    typeof props.player2ID.equipped !== 'undefined'
  ) {
    for (
      let i = 0;
      (cur =
        props.priority === 0
          ? props.player1ID.equipped[i]
          : props.player2ID.equipped[i]);
      i++
    ) {
      console.log(cur);
      if (cur.type == 'ball') {
        ballImg.value = cur.picture;
      } else if (cur.type == 'map') {
        mapImg.value = cur.picture;
      } else if (cur.type == 'paddle') {
        paddleImg.value = cur.picture;
      }
    }
  }
}

onUnmounted(() => {
  gameLoader.value = false;
});

onMounted(async () => {
  graph();
  // console.log(props.player1ID);
  // console.log(props.player2ID);
  // player1.value = await UserService.findOneById(p   rops.player1ID);
  // player2.value = await UserService.findOneById(props.player2ID);
  // console.log('player1 = ' + player1.value.username + ' player2 ' + player2.value.username)
  console.log(props.gameId);
  let me: boolean =
    userStore.id === props.player1ID.id || userStore.id === props.player2ID.id;
  const field = new Element(document.getElementById('feld'), props.gameId);
  const ball = new Ball(
    document.getElementById('ball'),
    field.getRect(),
    props.gameId,
    props.priority,
    me,
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
  let delta: number;

  async function pupdate(time: number) {
    if (lastTime != null) {
      delta = time - lastTime;
      ball.update(delta, remotePad.getRect(), me);
      remotePad.update(delta, time);
      playerPad.update(delta, time);
      if (props.priority === 0) loseCase();
    }
    lastTime = time;
    if (gameLoader.value) window.requestAnimationFrame(pupdate);
  }

  function loseCase() {
    if (ball.get_pos_x() >= 100 + ball._shape.x / 2) {
      playerScore.value++;
      ball.reset([playerScore.value, remoteScore.value], me);
      playerPad.sety(50);
      remotePad.sety(50);
    }
    if (ball.get_pos_x() <= 0 - ball._shape.x / 2) {
      remoteScore.value++;
      ball.reset([playerScore.value, remoteScore.value], me);
      playerPad.sety(50);
      remotePad.sety(50);
    }
  }

  function handleUp(e: KeyboardEvent): void {
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    if (e.repeat) return;
    if (e.code == 'ArrowUp' || e.code == 'ArrowDown') {
      remotePad.changeDir(0, false, true);
    }
  }

  function handleDown(e: KeyboardEvent): void {
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    if (e.repeat) return;
    if (e.code == 'ArrowUp') {
      remotePad.changeDir(-10, false, true);
    } else if (e.code == 'ArrowDown') {
      remotePad.changeDir(10, false, true);
    }
  }
  function handleBlur(): void {
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    if (props.player1ID.id === 42069 || props.player2ID.id == 42069) return;
    socket.emit('blur', {
      gameId: props.gameId,
      cowardId: props.priority == 0 ? props.player1ID.id : props.player2ID.id,
    });
  }
  function handleFocus(): void {
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    if (props.player1ID.id === 42069 || props.player2ID.id == 42069) return;
    socket.emit('focus', {
      gameId: props.gameId,
      cowardId: props.priority == 0 ? props.player1ID.id : props.player2ID.id,
    });
  }

  window.addEventListener('keydown', handleDown);
  window.addEventListener('keyup', handleUp);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);

  socket.on('gameData', (e) => {
    console.log(e);
    let me: boolean =
      userStore.id === props.player1ID.id ||
      userStore.id === props.player2ID.id;
    if (e.name === 'opponent') {
      if (props.priority === 2) {
        if (e.from === props.player1ID.id)
          playerPad.changeDir(e.changeDir, false, me);
        if (e.from === props.player2ID.id)
          remotePad.changeDir(e.changeDir, false, me);
      } else {
        console.log(e.from, props.priority);
        if (e.from === props.player2ID.id && props.priority === 0)
          playerPad.changeDir(e.changeDir, true, me);
        if (e.from === props.player1ID.id && props.priority === 1)
          playerPad.changeDir(e.changeDir, true, me);
      }
    }

    if (e.name === 'ball') {
      if (props.priority === 2 && e.from === props.player2ID.id) {
        e.changeDir[2] = 100 - e.changeDir[2];
        e.changeDir[0] = e.changeDir[0] * -1;
      }
      ball.changeDir(e.changeDir);
    }
    if (typeof e.score != 'undefined') {
      remoteScore.value = e.score[0];
      playerScore.value = e.score[1];
      playerPad.sety(50);
      remotePad.sety(50);
    }
  });

  socket.on('blur', (cowardId: number) => {
    ball.set_speed(0);
    playerPad.changeDir(0, false, false);
    remotePad.changeDir(0, false, false);
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    window.removeEventListener('keydown', handleDown);
    window.removeEventListener('keyup', handleUp);
    if (
      (props.priority == 0 && cowardId != props.player1ID.id) ||
      (props.priority != 0 && cowardId != props.player2ID.id)
    ) {
      claimVictory.value = true;
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

  socket.on('focus', () => {
    ball.set_speed();
    if (
      userStore.id !== props.player1ID.id &&
      userStore.id !== props.player2ID.id
    )
      return;
    claimVictory.value = false;
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
  });

  window.onresize = function () {
    const pField = new Element(document.getElementById('feld'), props.gameId);
    const pBall = new Ball(
      document.getElementById('ball'),
      field.getRect(),
      props.gameId,
      props.priority,
      me,
    );
    const pPlay = new Paddle(
      document.getElementById('playerPad'),
      field.getRect(),
      props.gameId,
    );
    const pRemo = new Paddle(
      document.getElementById('remotePad'),
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

<template>
  <div>
    <div v-if="props.priority == 0" class="players">
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
      <img class="back" :src="mapImg" />
      <div id="ball" class="ball">
        <img class="ball" :src="ballImg" />
      </div>
      <div id="playerPad" class="paddle paddle-left">
        <img class="pad" :src="paddleImg" />
      </div>
      <div id="remotePad" class="paddle paddle-right">
        <img class="pad" :src="paddleImg" />
      </div>
    </div>
    <div v-if="claimVictory" class="modal">
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
  background-color: #212121;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1vh;
  height: width * 0.75;
  min-width: 400px;
  width: 60vw;
  overflow: hidden;
  z-index: -1;
}
.back {
  height: 100%;
  width: 106%;
  transform: translate(-3%, -6%);
  z-index: -1;
}
.pad {
  height: 100%;
  width: 100%;
  z-index: 0;
}
.paddle {
  --y: 50;
  position: absolute;
  margin: auto;
  background-color: #fff;
  top: calc(var(--y) * 1%);
  transform: translate(0%, -50%);
  width: 1%;
  height: 10%;
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
  --col: #fff;
  position: absolute;
  background-color: var(--col);
  left: calc(var(--x) * 1%);
  top: calc(var(--y) * 1%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  width: 2vw;
  height: 2vw;
  z-index: 0;
}
.score {
  font-family: 'Silkscreen', cursive;
  position: relative;
  top: 1em;
  right: calc(100% / -2);
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 4vw;

  color: white;
  z-index: 1;
}
.score > * {
  font-family: 'Silkscreen', cursive;
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
  position: fixed; /* Stay in place */
  z-index: 696; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 2vw;
  border: 1px solid #888;
  width: 25%; /* Could be more or less, depending on screen size */
  color: black;
}

.ok {
  font-family: 'Mountains of Christmas', cursive;
  cursor: pointer;
}
</style>
