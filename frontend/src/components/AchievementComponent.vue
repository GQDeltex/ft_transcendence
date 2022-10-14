<script setup lang="ts"></script>

<template>
  <div class="achievements">
    <span class="text">Achievements (1)</span>
    <div class="achieve">
      <img
        alt="page logo"
        class="logo"
        src="@/assets/pongking_boi.svg"
        height="40"
        width="50"
      />
      <p class="infoBox">
        Smol PongKing: <span class="info">first login</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.achievements {
  display: grid;
  padding: 10px;
  border: 1px solid grey;
  overflow-y: scroll;
}
.text {
  font-size: 0.7em;
  grid-column: 1 / 6;
}
.achieve {
  display: flex;
  align-items: center;
  gap: 10px;
  grid-column: 1 / 2;
  padding: 10px;
}

.infoBox {
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
