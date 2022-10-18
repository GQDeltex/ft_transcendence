<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  clientId: number;
  username: string;
  title: string;
  picture: string;
  status: string;
}>();

const statusStyle = computed(() => {
  switch (props.status) {
    case 'online':
      return { color: 'lime' };
    default:
      return { color: 'grey' };
  }
});

const statusBorder = computed(() => {
  switch (props.status) {
    case 'online':
      return { 'border-color': 'lime' };
    default:
      return { 'border-color': 'grey' };
  }
});

var awesome = ref(false);

function work() {
  awesome.value = !awesome.value;
}
</script>

<template>
  <div class="client" @click="work">
    <img
      :style="statusBorder"
      class="picture"
      alt="user picture"
      :src="picture"
    />
    <div class="infoBox">
      <span class="username">{{ title }} {{ username }}</span>
      <span :style="statusStyle" class="status">{{ status }}</span>
    </div>
  </div>
  <div v-show="awesome" class="popup">
    <button class="butt">Add Friend</button>
    <button class="butt">Block</button>
    <button class="butt">Invite to Game</button>
    <button class="butt">Show Profile</button>
  </div>
</template>

<style scoped>
.client {
  display: flex;
  align-items: center;
  padding-top: 1%;
  cursor: pointer;
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
  font-size: 0.8vw;
  font-stretch: expanded;
}

.status {
  font-size: 0.6vw;
  color: lime;
}

.popup {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
}

.butt {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.5vw;
  border-color: transparent;
  margin-top: 3px;
}
</style>
