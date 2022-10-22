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
  public _shape: Vector;
  private _field: Vector;
  // private _direction: Vector;
  public _direction: Vector;
  private _speed: number;

  constructor(ballElem: HTMLElement | null, field: Element) {
    super(ballElem);
    this._field = new Vector(field.getWidth(), field.getHeight());
    this._direction = new Vector(0, 0);
    this._speed = 30;
    this._shape = new Vector(
      (super.getWidth() * 50) / this._field.x,
      (super.getHeight() * 50) / this._field.y,
    );
    this.reset();
  }

  reset() {
    this.setx(50);
    this.sety(50);
    // this.setx(92.90000000000163);
    // this.sety(32.45957996930784);
    this._direction.x = Math.random() > 0.5 ? 1 : -1;
    this._direction.y = Math.random() * 4 - 2;
    // this._direction.x = 1;
    // this._direction.y = 1.9489355589656974;
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
    //move step
    this.setx(
      parseFloat(String(this.getx())) +
        parseFloat(String(this._speed * this._direction.x * 0.001)),
    );
    this.sety(
      parseFloat(String(this.gety())) +
        parseFloat(String(this._speed * this._direction.y * 0.001)),
    );
    // vertical reflection
    if (this.gety() >= 100 - this._shape.y || this.gety() <= 0 + this._shape.y) {
      this._direction.y *= -1;
      this.sety(
        parseFloat(String(this.gety())) +
          parseFloat(String(this._speed * this._direction.y * 0.002)),
      );
    }
    // paddle collision
    const rect : DOMRect | null = super.getRect();
    if (rect === null) return;
    if (paddleRects.some((r) => this.isCollision(r, rect))) {
      this._direction.x *= -1;
      this.setx(
        parseFloat(String(this.getx())) +
          parseFloat(String(this._speed * this._direction.x * 0.002)),
      );
    }
  }

  isCollision(padBox: null | DOMRect, ballBox: null | DOMRect): boolean {
    if (padBox === null || ballBox === null) return false;
    return (
      (padBox.left <= ballBox.right &&
      padBox.right >= ballBox.left) &&
      (padBox.top <= ballBox.bottom &&
      padBox.bottom >= ballBox.top)
    );
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

  constructor(padElement: HTMLElement | null, field: Element) {
    super(padElement);
    this._direction = new Vector(0, 0);
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

  changeDir(pad: number, dir: number) {
    if (this._direction.y === dir) return;
    this._direction.y = dir;
    console.log('paddle ' + pad + ' time ' + this._time + ' dir ' + dir);
  }

  step() {
    let g: number =
      parseFloat(String(this.gety())) +
      parseFloat(String(this._speed * this._direction.y * 0.001));
    if (g < 0 + this._shape.y) g = this._shape.y;
    if (g > 100 - this._shape.y) g = 100 - this._shape.y;
    this.sety(g);
  }
  update(delta: number, speed: number | null, time: number) {
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
  const ball = new Ball(document.getElementById('ball'), field);
  const playerPad = new Paddle(document.getElementById('playerPad'), field);
  const remotePad = new Paddle(document.getElementById('remotePad'), field);
  const playerScore = document.getElementById('player');
  const remoteScore = document.getElementById('henne');

  let lastTime: number | null = null;
  var delta: number;
  function pupdate(time: number) {
    if (lastTime != null) {
      delta = time - lastTime;
      loseCase();
      ball.update(delta, [playerPad.getRect(), remotePad.getRect()]);
      remotePad.update(delta, null, time);
      playerPad.update(delta, null, time);
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

    // DEBUG
    document.addEventListener('keyup', (e) => {
      if (e.repeat) return;
      if (e.key == 'd') {
        console.log(ball._direction.x, + " , " + ball._direction.y + " pos " + ball.getx() + "   " + ball.gety());
      // ball.update(10, [playerPad.getRect(), remotePad.getRect()]);
     }
      if (e.key == 'r') {
        ball.reset();
        playerPad.sety(50);
        remotePad.sety(50);
      }
    // 1 1.9489355589656974 pos 92.90000000000163   32.45957996930784
    })

  });

  function loseCase() {
    if (
      ball.getx() >= 100 - (2 * ball._shape.x) &&
      playerScore !== null &&
      playerScore.textContent !== null
    ) {
      playerScore.textContent = String(parseInt(playerScore.textContent) + 1);
      ball.reset();
      playerPad.sety(50);
      remotePad.sety(50);
    }
    if (
      ball.getx() <= 0 + (2 * ball._shape.x) &&
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
