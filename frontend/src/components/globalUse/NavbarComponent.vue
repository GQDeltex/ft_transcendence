<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/store/user';
import RoundPictureComponent from './RoundPictureComponent.vue';

const userStore = useUserStore();
</script>

<template>
  <div class="column1">
    <router-link to="/" class="columncontent">
      <img
        alt="page logo"
        class="logo"
        src="@/assets/pongking_boi.svg"
        height="50"
      />
      <span>pongking</span>
    </router-link>
  </div>
  <div class="column2">
    <router-link :to="`/profile/${userStore.id}`" class="columncontent">
      <span>{{ userStore.title[0] }} {{ userStore.username }}</span>
      <RoundPictureComponent
        :picture="userStore.picture"
        size="50px"
        border-color="transparent"
      />
    </router-link>
  </div>
  <nav>
    <li><RouterLink to="/leaderboard">Leaderboard</RouterLink></li>
    <li><RouterLink to="/play">Play Now</RouterLink></li>
    <li><RouterLink to="/skin">Skin Selection</RouterLink></li>
    <li><RouterLink to="/stream">Stream</RouterLink></li>
    <li><RouterLink to="/chat">Chat</RouterLink></li>
  </nav>
</template>

<style scoped>
img {
  margin-left: 1vw;
}
.column1 {
  grid-column: 1 / 2;
  justify-self: start;
  font-size: 2vw;
}
.column2 {
  grid-column: 2 / 3;
  justify-self: end;
  font-size: 2vw;
}
.columncontent {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}
.logo {
  margin-right: 5%;
  height: 50px;
  border-radius: 20%;
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
  font-size: 2vw;
}
.router-link-active {
  color: white;
}
li {
  display: inline;
  flex-grow: 4;
}
li a {
  display: block;
  color: #f8971d;
  text-align: center;
  padding: 1% 1%;
  text-decoration: none;
}
li a:hover {
  background-color: #f8971d;
  color: black;
}
</style>
