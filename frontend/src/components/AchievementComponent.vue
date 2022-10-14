<script setup lang="ts"></script>

<template>
  <div class="achievementsParent">
    <span class="text">Achievements (1)</span>
    <div class="achievements">
      <div class="achieve">
        <img alt="page logo" class="logo" src="@/assets/pongking_boi.svg" />
        <p class="infoBox">
          Smol PongKing: <span class="info">first login</span>
        </p>
      </div>
      <div class="achieve">
        <img alt="page logo" class="logo" src="@/assets/pongking_boi.svg" />
        <p class="infoBox">
          Smol PongKing: <span class="info">second login</span>
        </p>
      </div>
      <div class="achieve">
        <img alt="page logo" class="logo" src="@/assets/pongking_boi.svg" />
        <p class="infoBox">
          Smol PongKing: <span class="info">third login</span>
        </p>
      </div>
      <div class="achieve">
        <img alt="page logo" class="logo" src="@/assets/pongking_boi.svg" />
        <p class="infoBox">
          Smol PongKing: <span class="info">fourth login</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.achievementsParent {
  display: grid;
  padding: 1vw;
  border: 1px solid grey;
  max-height: 30vh;
}
.achievements {
  max-height: 28vh;
  overflow-y: scroll;
}
.text {
  font-size: 2vw;
  /* padding: 1%; */
  /* grid-column: 1 / 3; */
}
.achieve {
  display: flex;
  align-items: center;
  gap: 1vw;
  /* grid-column: 1 / 2; */
  padding: 1vw;
}

.infoBox {
  /* grid-column: 2 / 4; */
  font-size: 2vw;
  color: grey;
}

.info {
  color: white;
}

.logo {
  object-fit: cover;
  /* grid-column: 1 / 2; */
  object-position: 50% 0%;
  border-radius: 50%;
  border: 1px solid #f8971d;
  height: 5vw;
  width: 5vw;
}
</style>
