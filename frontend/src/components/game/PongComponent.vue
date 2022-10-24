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

defineProps<{
  game: string;
}>();

class Element {
  public _htmlElem: HTMLElement | null;
  private boundBox: DOMRect | null;

  constructor(fieldElem: HTMLElement | null) {
    this._htmlElem = fieldElem;
    this.boundBox = this.getRect();
  }
  getRect(): DOMRect | null {
    if (this._htmlElem !== null) return this._htmlElem.getBoundingClientRect();
    else console.log('3 failiure, no object assigned\n');
    return null;
  }
  getWidth(): number {
    if (this.boundBox === null) return 42;
    return Math.abs(this.boundBox.left - this.boundBox.right);
  }
  getHeight(): number {
    if (this.boundBox === null) return 42;
    return Math.abs(this.boundBox.bottom - this.boundBox.top);
  }
}

class Vector {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // keep the direction of a vector, but resize to length of 1
  unit_vec() {
    let temp: number = Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 0.5);
    this.x /= temp;
    this.y /= temp;
  }
}

class Ball extends Element {
  // width and height in % of window
  public _shape: Vector;
  // private _direction: Vector; get-set- soon™
  public _direction: Vector;
  private _speed: number;

  private invinc = 0;
  constructor(ballElem: HTMLElement | null, field: null | DOMRect) {
    super(ballElem);
    this._direction = new Vector(0, 0);
    this._speed = 10;
    this._shape = new Vector(
      field !== null
        ? (super.getWidth() / Math.abs(field.right - field.left)) * 100
        : 0,
      field !== null
        ? (super.getHeight() / Math.abs(field.bottom - field.top)) * 100
        : 0,
    );
    this.reset();
  }

  // later functions depend on pixel values in screen
  // when resizing the game window changes and is refreshed in this function
  resize(field: null | DOMRect) {
    this._shape.x =
      field !== null
        ? (super.getWidth() / Math.abs(field.right - field.left)) * 100
        : 0;
    this._shape.y =
      field !== null
        ? (super.getHeight() / Math.abs(field.bottom - field.top)) * 100
        : 0;
  }

  reset() {
    this.set_pos_x(50);
    this.set_pos_y(50);
    this._direction.x = Math.random() > 0.5 ? 1 : -1;
    this._direction.y = Math.random() * 4 - 2;
    this.invinc = 200;
  }

  get_dir_x(): number {
    return this._direction.x;
  }
  get_dir_y(): number {
    return this._direction.y;
  }
  set_dir_x(n: number) {
    this._direction.x = n;
  }
  set_dir_y(n: number) {
    this._direction.y = n;
  }
  get_pos_x(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--x'),
      );
    else console.log('4 failiure, no object assigned\n');
    return 2147483647;
  }
  set_pos_x(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--x', String(value));
    else console.log('5 failiure, no object assigned\n');
  }
  get_pos_y(): number {
    if (this._htmlElem != null)
      return parseFloat(
        getComputedStyle(this._htmlElem).getPropertyValue('--y'),
      );
    else console.log('6 failiure, no object assigned\n');
    return 2147483647;
  }
  set_pos_y(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--y', String(value));
    else console.log('7 failiure, no object assigned\n');
  }

  step(paddleRects: Array<null | DOMRect>) {
    //move step
    this.set_pos_x(
      parseFloat(String(this.get_pos_x())) +
        parseFloat(String(this._speed * this._direction.x * 0.001)),
    );
    this.set_pos_y(
      parseFloat(String(this.get_pos_y())) +
        parseFloat(String(this._speed * this._direction.y * 0.001)),
    );
    // vertical reflection
    if (
      this.get_pos_y() >= 100 - this._shape.y / 2 ||
      this.get_pos_y() <= 0 + this._shape.y / 2
    ) {
      this._direction.y *= -1;
      this.set_pos_y(
        parseFloat(String(this.get_pos_y())) +
          parseFloat(String(this._speed * this._direction.y * 0.002)),
      );
    }
    // paddle collision
    const rect: DOMRect | null = super.getRect();
    if (rect === null) return;
    if (
      this.invinc <= 0 &&
      paddleRects.some((r) => this.isCollision(r, rect))
    ) {
      this.invinc = 200;
      this._direction.x *= -1;
      this.set_pos_x(
        parseFloat(String(this.get_pos_x())) +
          parseFloat(String(this._speed * this._direction.x * 0.002)),
      );
    }
    this.invinc--;
  }

  isCollision(padBox: null | DOMRect, ballBox: null | DOMRect): boolean {
    if (padBox === null || ballBox === null) return false;
    if (
      padBox.left <= ballBox.right &&
      padBox.right >= ballBox.left &&
      padBox.top <= ballBox.bottom &&
      padBox.bottom >= ballBox.top
    ) {
      this._direction.y =
        2 *
        (((ballBox.top + (ballBox.bottom - ballBox.top) / 2 - padBox.top) /
          (padBox.bottom - padBox.top)) *
          2 -
          1);
      return true;
    }
    return false;
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
  private _time = 0;

  constructor(padElement: HTMLElement | null, field: null | DOMRect) {
    super(padElement);
    this._direction = new Vector(0, 0);
    this._speed = 10;
    this._shape = new Vector(
      field !== null
        ? (super.getWidth() / Math.abs(field.right - field.left)) * 100
        : 0,
      field !== null
        ? (super.getHeight() / Math.abs(field.bottom - field.top)) * 100
        : 0,
    );
  }

  // later functions depend on pixel values in screen
  // when resizing the game window changes and is refreshed in this function
  resize(rfield: null | DOMRect) {
    this._shape.x =
      rfield !== null
        ? (super.getWidth() / Math.abs(rfield.right - rfield.left)) * 100
        : 0;
    this._shape.y =
      rfield !== null
        ? (super.getHeight() / Math.abs(rfield.bottom - rfield.top)) * 100
        : 0;
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

  changeDir(pad: number, dir: number) {
    if (this._direction.y === dir) return;
    this._direction.y = dir;
    console.log('paddle ' + pad + ' time ' + this._time + ' dir ' + dir);
  }

  step() {
    let g: number =
      parseFloat(String(this.gety())) +
      parseFloat(String(this._speed * this._direction.y * 0.001));
    if (g < 0 + this._shape.y / 2) g = this._shape.y / 2;
    if (g > 100 - this._shape.y / 2) g = 100 - this._shape.y / 2;
    this.sety(g);
  }

  // function to calc the next frame, babysteps for better movement
  update(delta: number, time: number) {
    this._time = time;
    let i = 0;
    while (i < delta) {
      this.step();
      i++;
    }
  }
}

onMounted(() => {
  const field = new Element(document.getElementById('feld'));
  const ball = new Ball(document.getElementById('ball'), field.getRect());
  const playerPad = new Paddle(
    document.getElementById('playerPad'),
    field.getRect(),
  );
  const remotePad = new Paddle(
    document.getElementById('remotePad'),
    field.getRect(),
  );
  const playerScore = document.getElementById('player');
  const remoteScore = document.getElementById('remote');

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

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.key == 'w') {
      playerPad.changeDir(1, -10);
    } else if (e.key == 's') {
      playerPad.changeDir(1, 10);
    }
    if (e.code == 'ArrowUp') {
      remotePad.changeDir(2, -10);
    } else if (e.code == 'ArrowDown') {
      remotePad.changeDir(2, 10);
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.repeat) return;
    if (e.key == 'w' || e.key == 's') {
      playerPad.changeDir(1, 0);
    }
    if (e.code == 'ArrowUp' || e.code == 'ArrowDown') {
      remotePad.changeDir(2, 0);
    }
  });
  window.onresize = function () {
    console.log('lal');
    ball.resize(field.getRect());
    playerPad.resize(field.getRect());
    remotePad.resize(field.getRect());
  };

  function loseCase() {
    if (
      ball.get_pos_x() >= 100 - ball._shape.x / 2 &&
      playerScore !== null &&
      playerScore.textContent !== null
    ) {
      playerScore.textContent = String(parseInt(playerScore.textContent) + 1);
      ball.reset();
      playerPad.sety(50);
      remotePad.sety(50);
    }
    if (
      ball.get_pos_x() <= 0 + ball._shape.x / 2 &&
      remoteScore !== null &&
      remoteScore.textContent !== null
    ) {
      remoteScore.textContent = String(parseInt(remoteScore.textContent) + 1);
      ball.reset();
      playerPad.sety(50);
      remotePad.sety(50);
    }
  }
  window.requestAnimationFrame(pupdate);
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
