<script setup lang="ts"></script>

<template>
  <div class="channelsParent">
    <span class="text">Channels</span>
    <div class="list"></div>
  </div>
</template>

<style scoped>
.channelsParent {
  display: grid;
  padding: 0.5vw;
  border: 1px solid #202020;
}
.text {
  font-size: 1vw;
  color: #f8971d;
}
.list {
  max-height: 28vh;
  overflow-y: scroll;
}
</style>
