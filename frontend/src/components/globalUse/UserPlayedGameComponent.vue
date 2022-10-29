<script setup lang="ts">
import ChildStreamComponent from '../stream/ChildStreamComponent.vue';
defineProps<{
  player1: string;
  player2: string;
}>();
</script>

<template>
  <div>
    <!--
    <span class="username">gucalvi</span>
    <span class="time">6h ago</span>
    -->
    <span class="stream">
      <ChildStreamComponent :player1-name="player1" :player2-name="player2" />
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
  font-size: 2vw;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
.time {
  padding: 2px;
  font-size: 1vw;
  color: grey;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
</style>
