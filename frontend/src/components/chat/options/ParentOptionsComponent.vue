<script setup lang="ts">
import { ref } from 'vue';
import ChildPeopleComponent from '../peoples/ChildPeopleComponent.vue';

defineProps<{
  clients: {
    id: number;
    title: [string];
    username: string;
    picture: string;
    status: string;
  }[];
}>();

const chatToggle = ref(false);
const banToggle = ref(false);
const adminToggle = ref(false);
const muteToggle = ref(false);
</script>

<template>
  <div class="optionsParent">
    <span class="headerText">Chat Options</span>
    <div class="list">
      <div class="subheader" @click="chatToggle = !chatToggle">In Chat ▾</div>
      <div v-show="chatToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent :client="client" />
        </template>
      </div>
      <div class="subheader" @click="adminToggle = !adminToggle">Admins ▾</div>
      <div v-show="adminToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent :client="client" />
        </template>
      </div>
      <div class="subheader" @click="banToggle = !banToggle">Banned ▾</div>
      <div v-show="banToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent :client="client" />
        </template>
      </div>
      <div class="subheader" @click="muteToggle = !muteToggle">Muted ▾</div>
      <div v-show="muteToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent :client="client" />
        </template>
      </div>
      <div class="buttonList">
        <button class="button">Change Password</button>
        <button class="button">Leave Chat</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.optionsParent {
  display: flex;
  flex-direction: column;
  padding: 0.5vw;
  border: 1px solid #202020;
  height: inherit;
  width: 15vw;
}

.headerText {
  font-size: 1vw;
  color: #f8971d;
}

.list {
  max-height: 1fr;
  overflow-y: scroll;
}

.subheader {
  cursor: pointer;
  font-size: 0.8vw;
  color: grey;
  font-weight: bold;
  margin-top: 5px;
}

.people {
  padding-left: 5%;
}

.buttonList {
  display: flex;
  flex-direction: column;
}

.button {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent;
  margin-top: 5px;
}
</style>
