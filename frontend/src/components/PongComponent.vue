<template>
  <!-- <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <div id="feld" class="field">
    <div class="score">
      <div id="player">123</div>
      <div id="henne">987</div>
    </div>
    <div id="ball" class="ball"></div>
    <div id="pp" class="paddle paddle-left"></div>
    <div id="rp" class="paddle paddle-right"></div>
  </div>
</template>

<script setup lang="ts">
import { /*  ref,  */ onMounted } from 'vue';

defineProps<{
  game: string;
}>();

class Field {
  private _htmlElem: HTMLElement | null;
  constructor(fieldElem: HTMLElement | null) {
    this._htmlElem = fieldElem;
  }
  getWidth(): number {
    if (this._htmlElem != null)
      return Number(getComputedStyle(this._htmlElem).getPropertyValue('width')
          .substring(0,getComputedStyle(this._htmlElem).getPropertyValue('width').length - 2));
    else console.log('failiure, no object assigned\n');
    return 0;
  }
  getHeight(): number {
    if (this._htmlElem != null)
      return Number(getComputedStyle(this._htmlElem).getPropertyValue('height')
          .substring(0,getComputedStyle(this._htmlElem).getPropertyValue('height').length - 2));
    else console.log('failiure, no object assigned\n');
    return 0;
  }
}

class Vector {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Ball {
  private _htmlElem: HTMLElement | null;
  private _field: Vector;
  private _direction: Vector;

  constructor(ballElem: HTMLElement | null, field: Field) {
    this._htmlElem = ballElem;
    this._field = new Vector(field.getWidth(), field.getHeight());
    this._direction = new Vector(0, 0);
  }

  getx() {
    if (this._htmlElem != null)
      return (
        getComputedStyle(this._htmlElem).getPropertyValue('--x') / this._field.x
      );
    else console.log('failiure, no object assigned\n');
  }
  setx(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--x', String(value)/*  * this._field.x */);
    else console.log('failiure, no object assigned\n');
  }
  gety() {
    if (this._htmlElem != null)
      return (
        getComputedStyle(this._htmlElem).getPropertyValue('--y') / this._field.y
      );
    else console.log('failiure, no object assigned\n');
  }
  sety(value: number) {
    if (this._htmlElem != null)
      this._htmlElem.style.setProperty('--y', String(value)/*  * this._field.y */);
    else console.log('failiure, no object assigned\n');
  }

  init() {
    this.setx(0.5);
    this.sety(0.5);
    this._direction.x = 0.05;
    this._direction.x = 0;
  }

  public update(delta: number) {
    console.log(delta);
  }
}

onMounted(() => {
  const ball = new Ball(
    document.getElementById('ball'),
    new Field(document.getElementById('feld')),
  );

  ball.setx(200);
  ball.sety(200);

  // ball.init();
  // let lastTime: number | null = null;
  // function pupdate(time: number) {
  //   if (lastTime != null) {
  //     const delta: number = time - lastTime;
  //     ball.update(delta);
  //   }
  //   lastTime = time;
  //   // window.requestAnimationFrame(pupdate);
  // }
  // window.requestAnimationFrame(pupdate);
  // window.requestAnimationFrame(pupdate);
  // window.requestAnimationFrame(pupdate);
  // window.requestAnimationFrame(pupdate);
  // window.requestAnimationFrame(pupdate);
  // window.requestAnimationFrame(pupdate);
});
</script>

<style scoped>
.field {
  --hght: 75;
  background-color: #214269;
  position: relative;
  margin-left: 12vw;
  margin-top: 12vh;
  width: 60vw;
  height: 60vh;
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
  background-color: brown;
  top: calc(var(--position) * 1%);
  transform: translate(-50%);
  width: 1%;
  height: 10%;
}

.paddle-left {
  left: 1%;
}
.paddle-right {
  right: 1%;
}
.ball {
  --x: 50;
  --y: 50;

  position: absolute;
  background-color: #01a645;
  left: calc(var(--x) * 1%);
  top: calc(var(--y) * 1%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
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
