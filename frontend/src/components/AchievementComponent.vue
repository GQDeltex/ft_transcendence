<script setup lang="ts"></script>

<template>
  <div class="achievements">
    <span class="text">Achievements (1)</span>
    <br />
    <div class="achieve">
      <img
        alt="page logo"
        class="logo"
        src="@/assets/pongking_boi.svg"
        height="40"
        width="50"
      />
    </div>
    <div class="infoBox">
      Smol PongKing: <span class="info">first login</span>
    </div>
  </div>
</template>

<style scoped>
.achievements {
  display: grid;
  padding: 10px;
  border: 1px solid grey;
  overflow-y: scroll;
  height: 23vh;
}
.text {
  font-size: 0.7em;
  grid-column: 1 / 6;
}
.achieve {
  grid-column: 1 / 2;
  margin: auto;
}

.infoBox {
  margin-top: 10%;
  grid-column: 2 / 6;
  font-size: 0.5em;
  color: grey;
}

.info {
  color: white;
}

.logo {
  border-radius: 50%;
  border: 1px solid #f8971d;
}
</style>
