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
  padding: 0.5vw;
  border: 1px solid #202020;
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
