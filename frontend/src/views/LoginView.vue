<script setup lang="ts">
import TwoFAInputComponent from '@/components/globalUse/TwoFAInputComponent.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const uri = `http://${import.meta.env.VITE_DOMAIN}:8080/42intra/login`;

const login = () => {
  location.href = uri;
};
</script>

<template>
  <div class="loginParent">
    <div class="buttons">
      <img alt="page logo" class="logo" src="@/assets/pongking_boi.svg" />
    </div>
    <span class="text"
      >please log in
      <p>to experience the full fun of</p>
      <p>PongKing</p>
    </span>
    <div
      v-if="!userStore.isLoggedIn && !userStore.require2FAVerify"
      class="buttons"
    >
      <button class="button" @click="login">Login</button>
    </div>
    <TwoFAInputComponent
      v-else-if="!userStore.isLoggedIn && userStore.require2FAVerify"
    />
  </div>
</template>

<style scoped>
.loginParent {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.logo {
  width: 30%;
}

.text {
  text-align: center;
  flex-wrap: wrap;
  color: white;
  font-size: 2vw;
}

.buttons {
  display: flex;
  justify-content: center;
}

.button {
  text-decoration: none;
  border-radius: 20px;
  color: white;
  background-color: #f8971d;
  padding: 10px;
  align-content: center;
  cursor: pointer;
  width: min-content;
  align-items: center;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  background: #f8971d;
}

button {
  border-radius: 50%;
  border: 2px outset grey;
  position: relative;
  /* display: inline-block; */
  /* padding: 15px 30px; */
  color: white;
  /* text-transform: uppercase; */
  /* letter-spacing: 4px; */
  overflow: hidden;

  box-shadow: 0 0 10px rgb(0, 0, 0, 1);

  font-size: 2vw;
  font-weight: bolder;
  text-decoration: none;
  background: linear-gradient(160deg, white, grey, grey, black);
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
}

button:hover {
  border: 2px outset #ddd;
  color: white;
  background: linear-gradient(160deg, white, #f8971d, #f8971d, black);
  text-shadow: 0px 0px 4px #202020;
  box-shadow: 0 0 10px #fff, 0 0 40px #fff, 0 0 80px #fff;
  transition-delay: 0.2s;
}
</style>
