<script setup lang="ts"></script>

<template>
  <div class="friendsPeopleParent">
    <span class="text">People</span>
    <div class="list"></div>
  </div>
</template>

<style scoped>
.friendsPeopleParent {
  display: flex;
  padding: 1vw;
  border: 1px solid #202020;
  /* flex-direction: column;
  height: 33%; */
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
