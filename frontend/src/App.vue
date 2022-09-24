<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="cloumn1">
      <!--  <img
			  alt="page logo"
			  class="logo"
			  src="@/assets/logo.svg"
			  width="125"
			  height="125"
		  /> add the LOGO later here!!!!!!!!!!!!!!!!!!!!!!please!!!!!!!!!!!!!!!! -->

      <h1>trans_logo</h1>
      <!-- just a placeholder!!!!!!!11elf -->
    </div>
    <div class="column2">
      <h2>username-placeholder</h2>

      <!--  <img
			  alt="page logo"
			  class="logo"
			  src="@/assets/logo.svg"
			  width="125"
			  height="125"
		  /> add the LOGO later here!!!!!!!!!!!!!!!!!!!!!!please!!!!!!!!!!!!!!!! -->
      <h3>photo placeholder</h3>
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
}
.column1 {
  grid-column: 1 / 2;
}
.column2 {
  grid-column: 2 / 3;
  justify-self: end;
}
nav {
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
