<script setup lang="ts">
import type { Component } from 'vue';
defineProps<{
  searchTerm: string;
  componentType: Component;
}>();
</script>

<template>
  <h3>Search results for "{{ searchTerm }}"</h3>
  <div class="categories">
    <component
      :is="componentType"
      player1-name="hlehmann"
      player2-name="gucalvi"
    ></component>
    <component
      :is="componentType"
      player1-name="hlehmann"
      player2-name="gucalvi"
    ></component>
    <component
      :is="componentType"
      player1-name="hlehmann"
      player2-name="gucalvi"
    ></component>
    <component
      :is="componentType"
      player1-name="hlehmann"
      player2-name="gucalvi"
    ></component>
    <component
      :is="componentType"
      player1-name="hlehmann"
      player2-name="gucalvi"
    ></component>
    <component
      :is="componentType"
      player1-name="hlehmann"
      player2-name="gucalvi"
    ></component>
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
