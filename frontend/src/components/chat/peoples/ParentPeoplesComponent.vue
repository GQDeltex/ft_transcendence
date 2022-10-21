<script setup lang="ts">
import ChildPeopleComponent from './ChildPeopleComponent.vue';
import { ref } from 'vue';

defineProps<{
  clients: {
    id: number;
    title: string;
    username: string;
    picture: string;
    status: string;
  }[];
}>();

var friendsvar = ref(false);
var blockedvar = ref(false);
var peoplevar = ref(false);

function blockedfunc() {
  blockedvar.value = !blockedvar.value;
}

function peoplefunc() {
  peoplevar.value = !peoplevar.value;
}

function friendsfunc() {
  friendsvar.value = !friendsvar.value;
}
</script>

<template>
  <div class="friendsPeopleParent">
    <span class="text">People</span>
    <div class="scroll">
      <div class="subheader" @click="friendsfunc">Friends ▾</div>
      <div v-show="friendsvar" class="people">
        <ChildPeopleComponent
          v-for="client in clients"
          :key="client.id"
          :client-id="client.id"
          :title="client.title[0]"
          :username="client.username"
          :picture="client.picture"
          :status="client.status"
        />
      </div>
      <div class="subheader" @click="peoplefunc">People ▾</div>
      <div v-show="peoplevar" class="people">
        <ChildPeopleComponent
          v-for="client in clients"
          :key="client.id"
          :client-id="client.id"
          :title="client.title[0]"
          :username="client.username"
          :picture="client.picture"
          :status="client.status"
        />
      </div>
      <div class="subheader" @click="blockedfunc">Blocked ▾</div>
      <div v-show="blockedvar" class="people">
        <ChildPeopleComponent
          v-for="client in clients"
          :key="client.id"
          :client-id="client.id"
          :title="client.title[0]"
          :username="client.username"
          :picture="client.picture"
          :status="client.status"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.friendsPeopleParent {
  display: flex;
  flex-direction: column;
  padding: 0.5vw;
  padding-bottom: 0.5vw;
  border: 1px solid #202020;
}

.text {
  font-size: 1vw;
  padding-bottom: 0.5vw;
  color: #f8971d;
}

.scroll {
  overflow-y: scroll;
}

.subheader {
  cursor: pointer;
  font-size: 0.8vw;
  color: gray;
  font-weight: bold;
}
.people {
  padding-left: 5%;
}
</style>
