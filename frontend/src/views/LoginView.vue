<script setup lang="ts">

</script>


<template>
  <div class="loginParent">
    <div class="buttons">
      <img
        alt="page logo"
        class="logo"
        src="@/assets/pongking_boi.svg"
      />
    </div>
    <span class="text">please log in to experience the full fun of PongKing</span>
    <div class="buttons">
      <button class="button" onclick="location.href='http://localhost:8080/login'">Login</button>
      <a href="http://localhost:8080/login">Login</a>
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
  width: 200px;
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

a {
  text-decoration: none;
  border-radius: 20px;
  color: white;
  background-color: #f8971d;
  padding: 10px;
  align-content: center;
  width: min-content;
}

</style>
