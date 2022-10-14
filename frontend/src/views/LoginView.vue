<script setup lang="ts">
const uri = `http://${import.meta.env.VITE_DOMAIN}:8080/login`;

function logIn() {
  location.href = uri;
}
</script>

<template>
  <div class="loginParent">
    <div class="buttons">
      <img alt="page logo" class="logo" src="@/assets/pongking_boi.svg" />
    </div>
    <span class="text"
      >please log in to experience the full fun of PongKing</span
    >
    <div class="buttons">
      <button class="button" @click="logIn()">Login</button>
      <!-- <a :href="uri">Login</a> -->
    </div>
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
  width: 300px;
}
.text {
  text-align: center;
  flex-wrap: wrap;
  color: white;
  padding: 10px;
}
.buttons {
  display: flex;
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

/* a {
  text-decoration: none;
  border-radius: 20px;
  color: white;
  background-color: #f8971d;
  padding: 10px;
  align-content: center;
  width: min-content;
} */
/* * {
  box-sizing: border-box;
} */

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
  border-radius: 50px;
  border: 2px outset grey;
  position: relative;
  /* display: inline-block; */
  /* padding: 15px 30px; */
  color: white;
  /* text-transform: uppercase; */
  /* letter-spacing: 4px; */
  overflow: hidden;

  box-shadow: 0 0 10px rgb(0, 0, 0, 1);

  font-size: 28px;
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
