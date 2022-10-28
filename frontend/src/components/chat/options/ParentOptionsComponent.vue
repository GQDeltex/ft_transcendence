<script setup lang="ts">
import { ref } from 'vue';
import ChildPeopleComponent from '../peoples/ChildPeopleComponent.vue';
import ModalUpdatePasswordComponent from './ModalUpdatePasswordComponent.vue';
import ModalUpdateAdminComponent from './ModalUpdateAdminComponent.vue';
import ModalBanUserComponent from './ModalBanUserComponent.vue';
import ModalMuteUserComponent from './ModalMuteUserComponent.vue';
import type { User } from '@/store/user';
import ModalLeaveComponent from './ModalLeaveComponent.vue';

const passModalActive = ref(false);
const adminModalActive = ref(false);
const banModalActive = ref(false);
const muteModalActive = ref(false);
const leaveModalActive = ref(false);

defineProps<{
  clients: User[];
}>();

const chatToggle = ref(false);
const banToggle = ref(false);
const adminToggle = ref(false);
const muteToggle = ref(false);

const leave = () => {
  leaveModalActive.value = true;
};

const changePassword = () => {
  passModalActive.value = true;
};

const updateAdmin = () => {
  adminModalActive.value = true;
};

const banUser = () => {
  banModalActive.value = true;
};

const muteUser = () => {
  muteModalActive.value = true;
};

const onClose = () => {
  passModalActive.value = false;
  adminModalActive.value = false;
  banModalActive.value = false;
  muteModalActive.value = false;
  leaveModalActive.value = false;
};
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
        <span class="Text"> Options </span>
        <span>
          <button class="button" @click="changePassword">
            Change Password
          </button>
          <ModalUpdatePasswordComponent
            v-show="passModalActive"
            @close="onClose"
          />
        </span>
        <span>
          <button class="button" @click="leave">Leave Chat</button>
          <ModalLeaveComponent v-show="leaveModalActive" @close="onClose" />
        </span>
        <span>
          <button class="button" @click="updateAdmin">Make Admin</button>
          <ModalUpdateAdminComponent
            v-show="adminModalActive"
            @close="onClose"
          />
        </span>
        <span>
          <button class="button" @click="banUser">Ban User</button>
          <ModalBanUserComponent v-show="banModalActive" @close="onClose" />
        </span>
        <span>
          <button class="button" @click="muteUser">Mute User</button>
          <ModalMuteUserComponent v-show="muteModalActive" @close="onClose" />
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
