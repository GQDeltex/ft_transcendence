<script setup lang="ts"></script>

<template>
  <div class="optionsParent">
    <span class="text">Chat Options</span>
    <div class="list"></div>
  </div>
</template>

<style scoped>
.optionsParent {
  display: grid;
  padding: 0.5vw;
  border: 1px solid #202020;
  height: inherit;
  width: 15vw;
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
