<script setup lang="ts"></script>

<template>
  <span class="searchhead">
    <img class="logo" src="@/assets/magnifier.svg" width="25" height="25" />By
    Category</span
  >
  <div class="buttongroup">
    <button class="button button1">Wolfsburg</button>
    <button class="button button2">Top Viewed Players</button>
    <button class="button button3">Pisciner</button>
  </div>
  <div class="buttongroup">
    <button class="button button4">Your Level</button>
    <button class="button button5">Amateur</button>
  </div>
</template>
<style scoped>
.logo {
  margin-right: 10px;
}
.searchhead {
  font-size: 20px;
  color: #f8971d;
  margin: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.buttongroup {
  width: auto;
  display: flex;
  justify-content: center;
}
.button {
  height: 30px;
  width: 30%;
  text-decoration: none;
  color: white;
  background-color: #303030;
  border-radius: 10px;
  border: none;
  margin: 10px;
}
.button:hover {
  background-color: #f8971d;
  color: black;
}
.button1 {
  width: 20%;
}
.button2 {
  width: 50%;
}
.button3 {
  width: 20%;
}
.button4 {
  width: 55%;
}
.button5 {
  width: 37%;
}
</style>
