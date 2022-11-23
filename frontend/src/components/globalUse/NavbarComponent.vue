<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/store/user';
import RoundPictureComponent from './RoundPictureComponent.vue';
import { useMessagesStore } from '@/store/message';
import DropDownComponent from './DropDownComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const messagesStore = useMessagesStore();
const dropDownContent = ref<string[]>(['Profile', 'Logout']);
const showDropDown = ref(false);
const router = useRouter();

async function dropDownClicked(selected: string) {
  showDropDown.value = false;
  if (selected == 'Profile') {
    await router.push({ path: `/profile/${userStore.id}` });
  }
  if (selected == 'Logout') {
    await userStore.logout();
    await router.push({ path: '/login' });
  }
}
</script>

<template>
  <div class="column1">
    <router-link to="/" class="columncontent">
      <img alt="page logo" class="logo" src="@/assets/xmas.png" />
      <span>christmasballs</span>
    </router-link>
  </div>
  <div class="column2">
    <span class="clickme" @click="showDropDown = !showDropDown"
      >{{ userStore.title[0] }}&nbsp;</span
    >
    <div class="userAndPicture">
      <div class="columncontent" @click="showDropDown = !showDropDown">
        {{ userStore.username }}
        <RoundPictureComponent
          :picture="userStore.picture"
          size="3.5vw"
          border-color="transparent"
          class="profilePicture"
        />
      </div>
      <DropDownComponent
        v-if="showDropDown"
        :items="dropDownContent"
        width="12vw"
        height="4vw"
        @close="dropDownClicked"
        @mouseleave="showDropDown = false"
      />
    </div>
  </div>
  <nav>
    <li><RouterLink to="/leaderboard">Leaderboard</RouterLink></li>
    <li><RouterLink to="/play">Play Now</RouterLink></li>
    <li><RouterLink to="/skin">Skin Selection</RouterLink></li>
    <li><RouterLink to="/stream">Stream</RouterLink></li>
    <li>
      <div class="item">
        <span
          v-show="messagesStore.notifiedList.length > 0"
          class="notify-badge"
          >NEW</span
        >
        <RouterLink to="/chat">Chat</RouterLink>
      </div>
    </li>
  </nav>
</template>

<style scoped>
.clickme {
  cursor: pointer;
}
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
  font-size: 3vw;
}
.column2 {
  grid-column: 2 / 3;
  display: flex;
  text-decoration: none;
  /* flex-direction: column; */
  align-items: center;
  justify-self: flex-end;
  font-size: 3vw;
  color: white;
  font-weight: bold;
}
.columncontent {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: bold;
}
.logo {
  margin-right: 5%;
  height: 3vw;
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
  font-size: 3vw;
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
  font-weight: bold;
}
li a:hover {
  background-color: #c00000;
  color: white;
}

.userAndPicture {
  cursor: pointer;
}
</style>
