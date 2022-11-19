<script setup lang="ts">
import CategoryComponent from '../components/landingview/CategoryComponent.vue';

const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');

function jump() {
  if (dino.classList.value != 'jump') {
    dino.classList.add('jump');

    setTimeout(function () {
      dino.classList.remove('jump');
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));

  // get current cactus X position
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue('left'),
  );

  // detect collision
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    // collision
    alert('Game Over!');
  }
}, 10);

document.addEventListener('keydown', function (event) {
  jump();
});
</script>

<template>
  <CategoryComponent category="Category I" />
  <CategoryComponent category="Category II" />
  <div class="game">
    <div id="dino"></div>
    <div id="cactus"></div>
  </div>
</template>

<style scoped>
.game {
  width: 600px;
  height: 200px;
  border: 1px solid white;
  margin: auto;
}

#dino {
  width: 50px;
  height: 50px;
  background-color: purple;
  background-size: 50px 50px;
  position: relative;
  top: 150px;
}

.jump {
  animation: jump 0.3s linear;
}

@keyframes jump {
  0% {
    top: 150px;
  }

  30% {
    top: 130px;
  }

  50% {
    top: 80px;
  }

  80% {
    top: 130px;
  }

  100% {
    top: 150px;
  }
}

#cactus {
  width: 20px;
  height: 40px;
  position: relative;
  top: 110px;
  left: 580px;

  background-color: blue;
  background-size: 20px 40px;

  animation: block 1s infinite linear;
}

@keyframes block {
  0% {
    left: 580px;
  }

  100% {
    left: -20px;
  }
}
</style>
