<script setup lang="ts">
defineProps<{
  clientId: number;
  channelName: string;
  picture: string;
}>();
</script>

<template>
  <div class="channel">
    <img
      class="picture"
      alt="channel picture"
      src="@/assets/pongking_boi.svg"
    />
    <div class="infoBox">
      <span class="channelName">{{ channelName }}</span>
    </div>
  </div>
</template>

<style scoped>
.channel {
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
  height: 1.5vw;
  width: 1.5vw;
  border-radius: 50%;
  border: 1px solid white;
  font-size: 1vw;
}
.channelName {
  color: white;
  font-size: 0.8vw;
  font-stretch: expanded;
}
</style>
