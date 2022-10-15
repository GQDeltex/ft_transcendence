<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  clientId: number;
  username: string;
  picture: string;
  status: string;
}>();

const statusStyle = computed(() => {
  switch (props.status) {
    case 'online':
      return { color: 'green' };
    default:
      return { color: 'grey' };
  }
});

const statusBorder = computed(() => {
  switch (props.status) {
    case 'online':
      return { 'border-color': 'green' };
    default:
      return { 'border-color': 'grey' };
  }
});
</script>

<template>
  <div class="client">
    <img
      :style="statusBorder"
      class="picture"
      alt="user picture"
      :src="picture"
    />
    <div class="infoBox">
      <span class="username">{{ username }}</span>
      <span :style="statusStyle" class="status">{{ status }}</span>
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
  height: 1.5vw;
  width: 1.5vw;
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
