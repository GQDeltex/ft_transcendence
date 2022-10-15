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
  padding: 1vw;
  border: 1px solid #202020;
  /* height: 33%; */
  /* width: inherit / 4; */
  /* max-height: 25%;
  min-height: 20vh; */
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
