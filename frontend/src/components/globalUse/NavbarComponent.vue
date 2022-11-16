<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/store/user';
import RoundPictureComponent from './RoundPictureComponent.vue';
import { useMessagesStore } from '@/store/message';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const messagesStore = useMessagesStore();
</script>

<template>
  <div class="column1">
    <router-link to="/" class="columncontent">
      <img alt="page logo" class="logo" src="@/assets/xmas.png" height="50" />
      <span>christmasballs</span>
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
    <li><RouterLink to="/leaderboard">{{ useI18n().t('leaderboard') }}</RouterLink></li>
    <li><RouterLink to="/play">{{ useI18n().t('playnow') }}</RouterLink></li>
    <li><RouterLink to="/skin">{{ useI18n().t('skinselection') }}</RouterLink></li>
    <li><RouterLink to="/stream">{{ useI18n().t('stream') }}</RouterLink></li>
    <li>
      <div class="item">
        <span
          v-show="messagesStore.notifiedList.length > 0"
          class="notify-badge"
          >NEW</span
        >
        <RouterLink to="/chat">{{ useI18n().t('chat') }}</RouterLink>
      </div>
    </li>
  </nav>
</template>

<style scoped>
.item {
  position: relative;
}

.notify-badge {
  position: absolute;
  right: 2.69vw;
  background: red;
  text-align: center;
  border-radius: 0.3vw;
  color: white;
  padding: 0.1vw 0.2vw;
  font-size: 1vw;
}

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
  color: #c00000;
  text-align: center;
  padding: 1% 1%;
  text-decoration: none;
}
li a:hover {
  background-color: #c00000;
  color: white;
}
</style>
