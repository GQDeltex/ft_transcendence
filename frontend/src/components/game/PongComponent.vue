<template>
  <!-- <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <div id="feld" class="field">
    <div class="score">
      <div id="player">0</div>
      <div id="remote">0</div>
    </div>
    <div id="ball" class="ball" src="@/assets/sexy-guy-001-modified.png">
      <!-- <img class="ball" src="@/assets/sexy-guy-001-modified.png" /> -->
    </div>
    <div id="playerPad" class="paddle paddle-left"></div>
    <div id="remotePad" class="paddle paddle-right"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { socket } from '../../service/socket';
import { Element } from './element';
import { Ball } from './ball';
import { Paddle } from './paddle';

defineProps<{
  game: string;
}>();

onMounted(() => {
  const field = new Element(document.getElementById('feld'));
  const ball = new Ball(document.getElementById('ball'), field.getRect());
  const playerScore = document.getElementById('player');
  const remoteScore = document.getElementById('remote');
  const playerPad = new Paddle(
    document.getElementById('playerPad'),
    field.getRect(),
  );
  let remotePad = new Paddle(
    document.getElementById('remotePad'),
    field.getRect(),
  );

  let lastTime: number | null = null;
  var delta: number;
  function pupdate(time: number) {
    if (lastTime != null) {
      delta = time - lastTime;
      ball.update(delta, [playerPad.getRect(), remotePad.getRect()]);
      remotePad.update(delta, time);
      playerPad.update(delta, time);
      loseCase();
    }
    lastTime = time;
    window.requestAnimationFrame(pupdate);
  }

  function loseCase() {
    if (
      ball.get_pos_x() >= 100 + ball._shape.x / 2 &&
      playerScore !== null &&
      playerScore.textContent !== null
    ) {
      playerScore.textContent = String(parseInt(playerScore.textContent) + 1);
      ball.reset();
      playerPad.sety(50);
      remotePad.sety(50);
    }
    if (
      ball.get_pos_x() <= 0 - ball._shape.x / 2 &&
      remoteScore !== null &&
      remoteScore.textContent !== null
    ) {
      remoteScore.textContent = String(parseInt(remoteScore.textContent) + 1);
      ball.reset();
      playerPad.sety(50);
      remotePad.sety(50);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.key == 'w') {
      playerPad.changeDir('p', -10);
    } else if (e.key == 's') {
      playerPad.changeDir('p', 10);
    }
    if (e.code == 'ArrowUp') {
      remotePad.changeDir('r', -10);
    } else if (e.code == 'ArrowDown') {
      remotePad.changeDir('r', 10);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.repeat) return;
    if (e.key == 'w' || e.key == 's') {
      playerPad.changeDir('p', 0);
    }
    if (e.code == 'ArrowUp' || e.code == 'ArrowDown') {
      remotePad.changeDir('r', 0);
    }
  });

  socket.on('message', (e) => {
    playerPad.changeDir('p', e.changeDir);
  });

  window.onresize = function () {
    const pField = new Element(document.getElementById('feld'));
    const pBall = new Ball(document.getElementById('ball'), field.getRect());
    const pPlay = new Paddle(
      document.getElementById('player'),
      field.getRect(),
    );
    const pRemo = new Paddle(
      document.getElementById('remote'),
      field.getRect(),
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
  margin-top: 7vh;
  height: 70vh;
  width: 70vw;
  overflow: hidden;
}
.paddle {
  --y: 50;
  position: absolute;
  margin: auto;
  background-color: #fff;
  top: calc(var(--y) * 1%);
  transform: translate(0%, -50%);
  width: 1%;
  height: 30%;
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
</style>
