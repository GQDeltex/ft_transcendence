<script setup lang="ts">
import { useUserStore } from '../store/user';
import { ref } from 'vue';
const userStore = useUserStore();
const checked = ref(true);
</script>

<template>
  <div class="profile">
    <img
      class="picture"
      alt="user picture"
      :src="userStore.picture"
    />
    <div class="infoBox">
      <span class="username">{{ userStore.username }} (Rank 1) (C)</span>
      <br />
      <span class="campus">Wolfsburg, Germany</span>
      <br />
      <span class="friends">1000 Friends, 149 Videos Watched</span>
    </div>

    <img class="banner" src="@/assets/PongKingBanner3D.png" />

    <span class="twoFA"
      >2 Factor Authentication
      <label class="switch">
        <input v-model="checked" type="checkbox" />
        <span class="slider round">
          <p v-if="checked" class="onSwitch">on</p>
          <p v-else class="offSwitch">off</p>
        </span>
      </label>
    </span>
  </div>
</template>

<style scoped>
.onSwitch {
  color: white;
  margin-top: 6%;
  margin-left: 6%;
  margin-right: 0;
}

.offSwitch {
  color: white;
  margin-top: 6%;
  margin-left: 55%;
  margin-right: 0;
}

.banner {
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  max-width: 90%;
  margin-left: 5%;
  margin-top: 5%;
}

.profile {
  display: grid;
  grid-gap: 10px;
  align-items: center;
  padding: 10px;
  padding-bottom: 20px;
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to bottom, white, #f8971d, #f8971d, #202020) 1;
}

.infoBox {
  grid-column: 2 / 3;
}
.picture {
  object-fit: cover;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid white;
  grid-column: 1 / 2;
}

.username {
  color: #f8971d;
}

.campus {
  color: white;
  font-size: 0.7em;
}
.friends {
  color: grey;
  font-size: 0.7em;
}

.twoFA {
  grid-column: 2 / 3;
  margin: 0;
  justify-content: left;
  color: grey;
  font-size: 0.7em;
  display: flex;
}

.switch {
  position: relative;
  margin-top: -2%;
  margin-left: 5%;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: grey;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:checked + .slider {
  background-color: #f8971d;
}

input:checked + .slider:before {
  -webkit-transform: translateX(18px);
  -ms-transform: translateX(18px);
  transform: translateX(18px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 40px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
