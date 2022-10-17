<template>
  <!-- <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <div id="feld" class="field">
    <div class="score">
      <div id="player">123</div>
      <div id="henne">987</div>
    </div>
    <div id="ball" class="ball" src="@/assets/sexy-guy-001-modified.png">
      <img class="ball" src="@/assets/sexy-guy-001-modified.png" />
    </div>
    <div id="playerPad" class="paddle paddle-left"></div>
    <div id="remotePad" class="paddle paddle-right"></div>
  </div>
  <div class="container">
    <input type="text" class="keyboard" />
  </div>
</template>

<script setup lang="ts">
import { /*  ref,  */ onMounted } from 'vue';

defineProps<{
  game: string;
}>();

class Element {
  private _htmlElem: HTMLElement | null;
  constructor(fieldElem: HTMLElement | null) {
    this._htmlElem = fieldElem;
  }
  getWidth(): number {
    if (this._htmlElem != null)
      return Number(
        getComputedStyle(this._htmlElem)
          .getPropertyValue('width')
          .substring(
            0,
            getComputedStyle(this._htmlElem).getPropertyValue('width').length -
              2,
          ),
      );
    else console.log('failiure, no object assigned\n');
    return 0;
  }
  getHeight(): number {
    if (this._htmlElem != null)
      return Number(
        getComputedStyle(this._htmlElem)
          .getPropertyValue('height')
          .substring(
            0,
            getComputedStyle(this._htmlElem).getPropertyValue('height').length -
              2,
          ),
      );
    else console.log('failiure, no object assigned\n');
    return 0;
  }
}

class Vector {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Ball {
  private _htmlElem: HTMLElement | null;
  private _shape: Vector;
  private _field: Vector;
  private _direction: Vector;
  private _speed: number;

  constructor(ballElem: HTMLElement | null, field: Element) {
    this._htmlElem = ballElem;
    this._field = new Vector(field.getWidth(), field.getHeight());
    this._direction = new Vector(0, 0);
    this._speed = 30;
    let temp: Element = new Element(ballElem);
    this._shape = new Vector(
      temp.getWidth() / this._field.x,
      temp.getHeight() / this._field.y,
    );
  }

  init() {
    this.setx(50);
    this.sety(50);
    this._direction.x = 20;
    this._direction.y = 32;
    this.speedLimit();
  }

  getx(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--x'),
      );
    else console.log('failiure, no object assigned\n');
    return 2147483647;
  }
  setx(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--x', String(value));
    else console.log('failiure, no object assigned\n');
  }
  gety(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--y'),
      );
    else console.log('failiure, no object assigned\n');
    return 2147483647;
  }
  sety(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--y', String(value));
    else console.log('failiure, no object assigned\n');
  }

  speedLimit() {
    let temp: number = Math.pow(
      Math.pow(this._direction.x, 2) + Math.pow(this._direction.y, 2),
      0.5,
    );
    this._direction.x = this._direction.x / temp;
    this._direction.y = this._direction.y / temp;
  }

  step() {
    this.collision();
    this.setx(
      parseFloat(String(this.getx())) +
        parseFloat(String(this._speed * this._direction.x * 0.001)),
    );
    this.sety(
      parseFloat(String(this.gety())) +
        parseFloat(String(this._speed * this._direction.y * 0.001)),
    );
  }

  collision() {
    if (this.getx() >= 100 - this._shape.x || this.getx() <= 0 + this._shape.x)
      this._direction.x *= -1;
    if (this.gety() >= 100 - this._shape.y || this.gety() <= 0 + this._shape.y)
      this._direction.y *= -1;
  }

  public update(delta: number) {
    let i = 0;
    while (i < delta) {
      this.step();
      i++;
    }
  }
}

onMounted(() => {
  const field = new Element(document.getElementById('feld'));
  const ball = new Ball(
    document.getElementById('ball'),
    field,
  );
  const playerPad = new Element(document.getElementById('playerPad'));
  const remotePad = new Element(document.getElementById('remotePad'));
  const playerScore = document.getElementById('player');
  const remoteScore = document.getElementById('henne');
  const keyBoard = document.querySelector('.keyboard');

  ball.init();

  let lastTime: number | null = null;
  function pupdate(time: number) {
    if (lastTime != null) {
      const delta: number = time - lastTime;
      ball.update(delta);
      playerScore.textContent = parseInt(ball.getx());
      remoteScore.textContent = parseInt(ball.gety());
    }
    lastTime = time;
    // window.requestAnimationFrame(pupdate);
  }
  window.requestAnimationFrame(pupdate);
  function heelp() {
    keyBoard.addEventListener('keydown', (e) => {
    window.requestAnimationFrame(pupdate);
    })
  }
  let i:number = 1;
  while(i > 0)
  {
    setInterval(heelp, 10);
    
    i++;
  };
});
</script>

<style scoped>
.field {
  background-color: #212121;
  position: relative;
  margin-left: 15vw;
  margin-top:calc((100vh - 142px) / 100 * 15);
  width: 70vw;
  height: calc((100vh - 142px) / 10 * 7);
  overflow: hidden;
}
.score {
  position: relative;
  top: 1em;
  right: calc(100% / -2);
  color: grey;
  font-size: 42%;
}
.paddle {
  --position: 50;
  position: absolute;
  margin: auto;
  background-color: #fff;
  top: calc(var(--position) * 1%);
  transform: translate(-50%);
  width: 1%;
  height: 10%;
}

.paddle-left {
  right: 97%;
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
  border-radius: 80%;
  transform: translate(-50%, -50%);
  width: 4vh;
  height: 4vh;
}
.score {
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 4ex;
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
