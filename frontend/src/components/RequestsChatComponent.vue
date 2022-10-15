<script setup lang="ts"></script>

<template>
  <div class="requestsParent">
    <span class="text">Requests</span>
    <div class="list"></div>
  </div>
</template>

<style scoped>
.requestsParent {
  display: grid;
  padding: 1vw;
  border: 1px solid #202020;
  /* height: calc(1 / 3) * calc(100); */
  /* width: inherit / 4; */
  /* max-height: 25%;
  min-height: 20vh; */
}
.text {
  font-size: 1vw;
  color: #f8971d;
}
.list {
  max-height: 25vh;
  overflow-y: scroll;
}
</style>
