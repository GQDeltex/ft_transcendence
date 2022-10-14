<script setup lang="ts">
const uri = `http://${import.meta.env.VITE_DOMAIN}:8080/login`;
</script>

<template>
  <a :href="uri"> Login </a>
</template>

<style scoped>
a {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: white;
  padding: 10px;
}
</style>
