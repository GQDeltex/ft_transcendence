<script setup lang="ts">
import { ref } from 'vue';
import ChildPeopleComponent from '../peoples/ChildPeopleComponent.vue';
import ModalUpdatePasswordComponent from './ModalUpdatePassowordComponent.vue';

const modalActive = ref(false);

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
var mutedvar = ref(false);

const changePassword = () => {
  modalActive.value = true;
};

const onClose = () => {
  modalActive.value = false;
};

function bannedfunc() {
  bannedvar.value = !bannedvar.value;
}

function adminfunc() {
  adminvar.value = !adminvar.value;
}

function inchatfunc() {
  inchatvar.value = !inchatvar.value;
}

function mutedfunc() {
  mutedvar.value = !mutedvar.value;
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
      <div class="subheader" @click="mutedfunc">Muted ▾</div>
      <div v-show="mutedvar" class="people">
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
      <div class="buttonlist">
        <span class="Text"
          >Options
          <button class="button" @click="changePassword">
            Change Password
          </button>
          <ModalUpdatePasswordComponent v-show="modalActive" @close="onClose" />
          <!-- <button class="button">Leave Chat</button>-->
        </span>
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
.headertext {
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

.buttonlist {
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
