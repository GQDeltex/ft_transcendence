<script setup lang="ts">
defineProps<{
  category: string;
}>();
</script>

<template>
  <h3>{{ category }}</h3>
  <div>
    <router-link to="/test">
      <img src="@/assets/pong.png" width="200" height="100" />
    </router-link>
    <router-link to="/test">
      <img src="@/assets/pong.png" width="200" height="100" />
    </router-link>
    <router-link to="/test">
      <img src="@/assets/pong.png" width="200" height="100" />
    </router-link>
    <router-link to="/test">
      <img src="@/assets/pong.png" width="200" height="100" />
    </router-link>
    <router-link to="/test">
      <img src="@/assets/pong.png" width="200" height="100" />
    </router-link>
  </div>
</template>

<style scoped>
h3 {
  color: white;
}

div {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
