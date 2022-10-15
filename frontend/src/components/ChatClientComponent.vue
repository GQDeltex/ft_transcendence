<script setup lang="ts">

const props = defineProps<{
  clientId: number;
  username: string;
  picture: string;
  status: string;
}>();
</script>

<template>
  <div class="client">
    <img class="picture" alt="user picture" :src="picture" />
    <div class="infoBox">
      <span class="username">{{username}}</span>
      <span class="status">{{ status }}</span>
    </div>

  </div>
</template>

<style scoped>

.client {
  display: flex;
  align-items: center;
  padding-top: 1%;
}
.infoBox {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
}
.picture {
  object-fit: cover;
  object-position: 50% 0%;
  height: 1vw;
  width: 1vw;
  border-radius: 50%;
  border: 1px solid white;
}

.username {
  color: white;
  font-size: 0.5vw;
  font-stretch: expanded;
}

.status {
  font-size: 0.5vw;
  color: green;
}

</style>
