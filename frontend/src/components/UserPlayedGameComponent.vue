<script setup lang="ts">
import StreamGameComponent from './StreamGameComponent.vue';
</script>

<template>
  <div>
    <span class="username">gucalvi</span>
    <span class="time">6h ago</span>
    <span class="stream">
      <StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
    </span>
  </div>
</template>

<style scoped>
div {
  display: grid;
}
.stream {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}
.username {
  color: #f8971d;
  grid-column: 1 / 6;
  grid-row: 1 / 2;
}
.time {
  padding: 2px;
  font-size: 0.5em;
  color: grey;
  grid-column: 1 / 6;
  grid-row: 2 / 3;
}
</style>
