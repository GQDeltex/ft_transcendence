<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { ref, watch, nextTick } from 'vue';
import Enable2FAComponent from './Enable2FAComponent.vue';

const userStore = useUserStore();
const checked = ref(userStore.twoFAEnable);
const show = ref(false);

watch(checked, async (newValue, oldValue) => {
  if (newValue === oldValue) return;

  if (!newValue && oldValue && userStore.twoFAEnable) {
    if (!(await userStore.disable2FA())) {
      await nextTick();
      checked.value = true;
    }
  }

  if (newValue && !oldValue && !userStore.twoFAEnable) {
    show.value = true;
  }
});

const onClose = () => {
  show.value = false;
  if (!userStore.twoFAEnable) {
    checked.value = false;
  }
};
</script>

<template>
  <div class="profile">
    <img class="picture" alt="user picture" :src="userStore.picture" />
    <div class="infoBox">
      <span class="title">{{ userStore.title }}</span>
      <br />
      <span class="username">{{ userStore.username }} (Rank 1) (C)</span>
      <br />
      <span class="campus">Wolfsburg, Germany</span>
      <br />
      <span class="friends">1000 Friends, 149 Videos Watched</span>
    </div>

    <img class="banner" alt="banner" src="@/assets/PongKingBanner3D.png" />

    <span class="twoFA"
      >2 Factor Authentication
      <label class="switch">
        <input v-model="checked" type="checkbox" />
        <span class="slider round">
          <p v-if="checked" class="onSwitch">on</p>
          <p v-else class="offSwitch">off</p>
        </span>
      </label>
      <Enable2FAComponent v-if="show" @close="onClose" />
    </span>
  </div>
</template>

<style scoped>
.title {
  font-size: 2vw;
}

.onSwitch {
  color: white;
  margin-top: 10%;
  margin-left: 6%;
  margin-right: 0;
}

.offSwitch {
  color: white;
  margin-top: 10%;
  margin-left: 60%;
  /* margin-right: 0%; */
}

.banner {
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  max-width: 90%;
  max-height: 20vw;
  /* margin-left: 2%;
  margin-top: 2%; */
}

.profile {
  display: grid;
  grid-gap: 1%;
  align-items: center;
  padding: 10px;
  padding-bottom: 1%;
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to bottom, white, #f8971d, #f8971d, #202020) 1;
}

.infoBox {
  grid-column: 2 / 3;
}

.picture {
  object-fit: cover;
  object-position: 50% 0%;
  height: 10vw;
  width: 10vw;
  border-radius: 50%;
  border: 1px solid white;
  grid-column: 1 / 2;
}

.username {
  color: #f8971d;
  font-size: 2vw;
  font-stretch: expanded;
}

.campus {
  color: white;
  font-size: 1vw;
}

.friends {
  color: grey;
  font-size: 1vw;
}

.twoFA {
  grid-column: 2 / 3;
  margin: 0;
  justify-content: left;
  color: grey;
  font-size: 1vw;
  display: flex;
}

.switch {
  position: relative;
  margin-top: -2%;
  margin-left: 5%;
  width: 4vw;
  height: 2vw;
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
  /* -webkit-transition: 0.4s;
  transition: 0.4s; */
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.6vw;
  width: 1.6vw;
  left: 0.3vw;
  bottom: 0.2vw;
  background-color: white;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:checked + .slider {
  background-color: #f8971d;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.8vw);
  -ms-transform: translateX(1.8vw);
  transform: translateX(1.8vw);
}

/* Rounded sliders */
.slider.round {
  border-radius: 25vw;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
