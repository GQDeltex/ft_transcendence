<script setup lang="ts">
import StreamGameComponent from './StreamGameComponent.vue';
defineProps<{
  categoryName: string;
}>();
</script>

<template>
  <h3>{{ categoryName }}</h3>
  <div class="categories">
    <StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
    <StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
    <StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
    <StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
    <StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
    <StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
  </div>
</template>

<style scoped>
h3 {
  padding: 5px;
  color: orange;
}
.categories {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap-reverse;
  gap: initial;
}
</style>
