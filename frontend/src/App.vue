<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="column1">
      <img
        alt="page logo"
        class="logo"
        src="@/assets/pongking_boi.svg"
        height="50"
      />
      <span>pongking</span>
    </div>
    <div class="column2">
      <span>gucalvi</span>

      <img
        alt="page logo"
        class="logo"
        src="@/assets/sexy-guy-001-modified.png"
        height="50"
      />
    </div>
    <nav>
      <li><RouterLink to="leaderboard">Leaderboard</RouterLink></li>
      <li><RouterLink to="play">Play Now</RouterLink></li>
      <li><RouterLink to="skin">Skin Selection</RouterLink></li>
      <li><RouterLink to="stream">Stream</RouterLink></li>
      <li><RouterLink to="chat">Chat</RouterLink></li>
    </nav>
  </header>
  <RouterView />
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  background-color: black;
}
</style>

<style scoped>
header {
  display: grid;
  row-gap: 10px;
}
img {
  margin-left: 15px;
}
.column1 {
  display: flex;
  align-items: center;
  grid-column: 1 / 2;
  justify-self: start;
}
.column2 {
  display: flex;
  align-items: center;
  grid-column: 2 / 3;
  justify-self: end;
}
nav {
  border-top: 1px solid grey;
  border-bottom: 1px solid gray;
  grid-column: 1 / 3;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
li {
  display: inline;
  flex-grow: 4;
}
li a {
  display: block;
  color: #f8971d;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: #f8971d;
  color: black;
}
</style>
