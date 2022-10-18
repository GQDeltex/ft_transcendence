<script setup lang="ts">
import { computed } from 'vue';

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

let awesome = false;

function work() {
  awesome = !awesome;
  console.log(awesome);
}
</script>

<template>
  <button @click="work">Toggle</button>
  <h1 v-show="awesome">Vue can suck my dick</h1>
  <!-- <h1 v-else>Oh no 😢</h1> -->

  <input id="check01" type="checkbox" name="menu" />
  <label class="client" for="check01">
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
  </label>

  <div class="popup">
    <button class="butt">Add Friend</button>
    <button class="butt">Block</button>
    <button class="butt">Invite to Game</button>
    <button class="butt">Show Profile</button>
  </div>
</template>

<style scoped>
input,
div.popup {
  display: none;
}

label {
  position: relative;
  display: block;
  cursor: pointer;
}

input:checked ~ div.popup {
  display: block;
}
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
