<template>
  <!-- <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <div id="feld" class="field">
    <div class="score">
      <div id="player">0</div>
      <div id="henne">0</div>
    </div>
    <div id="ball" class="ball" src="@/assets/sexy-guy-001-modified.png">
      <img class="ball" src="@/assets/sexy-guy-001-modified.png" />
    </div>
    <div id="playerPad" class="paddle paddle-left"></div>
    <div id="remotePad" class="paddle paddle-right"></div>
  </div>
  <!-- <div class="container">
    <input type="text" class="keyboard" />
  </div> -->
</template>

<script setup lang="ts">
import { directiveHooks } from '@vueuse/shared';
import { onMounted } from 'vue';

defineProps<{
  game: string;
}>();

class Element {
  public _htmlElem: HTMLElement | null;
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
    else console.log('1 failiure, no object assigned\n');
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
    else console.log('2 failiure, no object assigned\n');
    return 0;
  }
  getRect(): DOMRect | null {
    if (this._htmlElem !== null) return this._htmlElem.getBoundingClientRect();
    else console.log('3 failiure, no object assigned\n');
    return null;
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

class Ball extends Element {
  private _shape: Vector;
  private _field: Vector;
  private _direction: Vector;
  private _speed: number;

  constructor(ballElem: HTMLElement | null, field: Element) {
    super(ballElem);
    this._field = new Vector(field.getWidth(), field.getHeight());
    this._direction = new Vector(0, 0);
    this._speed = 100;
    this._shape = new Vector(
      (super.getWidth() * 50) / this._field.x,
      (super.getHeight() * 50) / this._field.y,
    );
    this.reset();
  }

  reset() {
    this.setx(50);
    this.sety(50);
    this._direction.x = Math.random() * 100 - 50;
    this._direction.y = Math.random() * 100 - 50;
    this.speedLimit();
  }

  getx(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--x'),
      );
    else console.log('4 failiure, no object assigned\n');
    return 2147483647;
  }
  setx(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--x', String(value));
    else console.log('5 failiure, no object assigned\n');
  }
  gety(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--y'),
      );
    else console.log('6 failiure, no object assigned\n');
    return 2147483647;
  }
  sety(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--y', String(value));
    else console.log('7 failiure, no object assigned\n');
  }

  speedLimit() {
    let temp: number = Math.pow(
      Math.pow(this._direction.x, 2) + Math.pow(this._direction.y, 2),
      0.5,
    );
    this._direction.x /= temp;
    this._direction.y /= temp;
  }

  step(paddleRects: Array<null | DOMRect>) {
    this.collision(paddleRects);
    this.setx(
      parseFloat(String(this.getx())) +
        parseFloat(String(this._speed * this._direction.x * 0.001)),
    );
    this.sety(
      parseFloat(String(this.gety())) +
        parseFloat(String(this._speed * this._direction.y * 0.001)),
    );
  }

  isCollision(rect1: null | DOMRect, rect2: null | DOMRect): boolean {
    if (rect1 === null || rect2 === null) return false;
    return (
      rect1.left <= rect2.right &&
      rect1.right >= rect2.left &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    );
  }

  collision(paddleRects: Array<null | DOMRect>) {
    const rect = super.getRect();
    if (rect === null) return;
    if (this.gety() >= 100 - this._shape.y || this.gety() <= 0 + this._shape.y)
      this._direction.y *= -1;
    if (paddleRects.some((r) => this.isCollision(r, rect)))
      this._direction.x *= -1;
  }

  public update(delta: number, paddleRects: Array<null | DOMRect>) {
    let i = 0;
    while (i < delta) {
      this.step(paddleRects);
      i++;
    }
  }
}

class Paddle extends Element {
  private _direction: Vector;
  private _speed: number;
  private _shape: Vector;

  constructor(padElement: HTMLElement | null, field: Element) {
    super(padElement);
    this._direction = new Vector(0, 10);
    this._speed = 10;
    this._shape = new Vector(
      (super.getWidth() * 50) / field.getWidth(),
      (super.getHeight() * 50) / field.getHeight(),
    );
  }

  gety(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--y'),
      );
    else console.log('8 failiure, no object assigned\n');
    return 2147483647;
  }
  sety(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--y', String(value));
    else console.log('9 failiure, no object assigned\n');
  }

  step() {
    let g: number =
      parseFloat(String(this.gety())) +
      parseFloat(String(this._speed * this._direction.y * 0.001));
    if (g < 0 + this._shape.y) g = this._shape.y;
    if (g > 100 - this._shape.y) g = 100 - this._shape.y;
    this.sety(g);
  }
  update(delta: number, speed: number) {
    this._speed = speed;
    let i = 0;
    while (i < delta) {
      this.step();
      i++;
    }
  }
}

onMounted(() => {
  const field = new Element(document.getElementById('feld'));
  const ball = new Ball(document.getElementById('ball'), field);
  const playerPad = new Paddle(document.getElementById('playerPad'), field);
  const remotePad = new Paddle(document.getElementById('remotePad'), field);
  const playerScore = document.getElementById('player');
  const remoteScore = document.getElementById('henne');
  // const keyBoard = document.querySelector('.keyboard');

  let lastTime: number | null = null;
  var delta: number;
  function pupdate(time: number) {
    if (lastTime != null) {
      delta = time - lastTime;
      ball.update(delta, [playerPad.getRect(), remotePad.getRect()]);
      remotePad.update(delta, ball.gety() - remotePad.gety() > 0 ? 10 : -10);

      loseCase();
    }
    lastTime = time;
    window.requestAnimationFrame(pupdate);
  }

  // document.addEventListener('mousemove', e => {
  //   console.log(e.y + "   " + window.outerHeight)
  //     playerPad.update(delta, (e.y - playerPad.gety() * (window.innerHeight / 100)) > 0 ? 10 : -10);
  // })

  document.addEventListener('keydown', (e) => {
    console.log(e);
  });

  function loseCase() {
    if (
      ball.getx() >= 100 &&
      playerScore !== null &&
      playerScore.textContent !== null
    ) {
      playerScore.textContent = String(parseInt(playerScore.textContent) + 1);
      ball.reset();
    }
    if (
      ball.getx() <= 0 &&
      remoteScore !== null &&
      remoteScore.textContent !== null
    ) {
      remoteScore.textContent = String(parseInt(remoteScore.textContent) + 1);
      ball.reset();
    }
  }
  window.requestAnimationFrame(pupdate);
  // keyBoard.addEventListener('keydown', (e) => {
  //   ball.update(100);
  //   playerScore.textContent = parseInt(ball.getx());
  //   remoteScore.textContent = parseInt(ball.gety());
  // });
});
</script>

<style scoped>
.field {
  background-color: #212121;
  position: relative;
  margin-left: 15vw;
  margin-top: calc((100vh - 142px) / 100 * 15);
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
  --y: 50;
  position: absolute;
  margin: auto;
  background-color: #fff;
  top: calc(var(--y) * 1%);
  transform: translate(0%, -50%);
  width: 1%;
  height: 10%;
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
