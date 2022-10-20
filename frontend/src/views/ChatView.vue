<script setup lang="ts">
import ParentChatComponent from '../components/chat/chat/ParentChatComponent.vue';
import ParentPeoplesComponent from '../components/chat/peoples/ParentPeoplesComponent.vue';
import ParentChannelsComponent from '../components/chat/channels/ParentChannelsComponent.vue';
import ParentRequestsComponent from '../components/chat/requests/ParentRequestsComponent.vue';
import ParentOptionsComponent from '../components/chat/options/ParentOptionsComponent.vue';
import { onMounted, ref } from 'vue';
import UserService from '../service/UserService';

const chatName = ref('gucalvi');
const users = ref([]);
onMounted(async () => {
  users.value = await UserService.findAll();
});
</script>

<template>
  <div class="chatViewParent">
    <div class="leftSide">
      <ParentPeoplesComponent :clients="users" class="friendsPeopleComp" />
      <ParentChannelsComponent class="channelsComp" />
      <ParentRequestsComponent class="requestsComp" />
    </div>
    <ParentChatComponent :chat-name="chatName" class="chatChatComp" />
    <input v-model="chatName" type="text" class="inputBox" />
    <ParentOptionsComponent class="optionsComp" />
  </div>
</template>

<style scoped>
.chatViewParent {
  display: grid;
  grid-gap: 1%;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 2vw;
  width: 80vw;
  height: 70vh;
}

.leftSide {
  display: grid;
  /* flex-direction: column; */
  width: 15vw;
  height: inherit;
  /* max-height: 100%; */
  grid-auto-rows: 1fr;
}
.friendsPeopleComp {
  grid-row: 1 / 2;
  max-height: 25vh;
  /* flex-grow: 1; */
}

.channelsComp {
  grid-row: 2 / 3;
  max-height: 25vh;
  /* flex-grow: 1; */
}

.requestsComp {
  grid-row: 3 / 4;
  max-height: 25vh;
  /* flex-grow: 1; */
}
.chatChatComp {
  grid-column: 2 / 3;
}

.optionsComp {
  grid-column: 3 / 4;
}

.inputBox {
  grid-column: 2 / 3;
  grid-row: 2 / 2;
  font-size: 1vw;
}
</style>
