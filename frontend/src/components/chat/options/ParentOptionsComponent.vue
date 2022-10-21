<script setup lang="ts">
import { ref } from 'vue';
import ChildPeopleComponent from '../peoples/ChildPeopleComponent.vue';

defineProps<{
  clients: {
    id: number;
    title: string;
    username: string;
    picture: string;
    status: string;
  }[];
}>();

var inchatvar = ref(false);
var bannedvar = ref(false);
var adminvar = ref(false);

function bannedfunc() {
  bannedvar.value = !bannedvar.value;
}

function adminfunc() {
  adminvar.value = !adminvar.value;
}

function inchatfunc() {
  inchatvar.value = !inchatvar.value;
}
</script>

<template>
  <div class="optionsParent">
    <span class="headertext">Chat Options</span>
    <div class="list">
      <div class="subheader" @click="inchatfunc">In Chat ▾</div>
      <div v-show="inchatvar" class="people">
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
      <div class="subheader" @click="adminfunc">Admins ▾</div>
      <div v-show="adminvar" class="people">
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
      <div class="subheader" @click="bannedfunc">Banned ▾</div>
      <div v-show="bannedvar" class="people">
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
      <div class="leave">Leave Chat</div>
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
.headertext {
  font-size: 1vw;
  color: #f8971d;
}
.list {
  max-height: 25vh;
  overflow-y: scroll;
}

.subheader {
  cursor: pointer;
  font-size: 0.8vw;
  color: grey;
  font-weight: bold;
}

.people {
  padding-left: 5%;
}
</style>
