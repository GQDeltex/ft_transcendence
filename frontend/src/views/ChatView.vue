<script setup lang="ts">
import ChatChatComponent from '../components/ChatChatComponent.vue';
import FriendsPeopleChatComponent from '../components/FriendsPeopleChatComponent.vue';
import ChannelsChatComponent from '../components/ChannelsChatComponent.vue';
import RequestsChatComponent from '../components/RequestsChatComponent.vue';
import ChatOptionsChatComponent from '../components/ChatOptionsChatComponent.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';
import UserService from '../service/UserService';
import { onMounted } from 'vue';

const chatName: Ref<string> = ref('gucalvi');
const users: Ref<any> = ref([]);
onMounted(async () => {
  users.value = await UserService.findAll();
});
</script>

<template>
  <div class="chatViewParent">
    <div class="leftSide">
      <FriendsPeopleChatComponent :clients="users" class="friendsPeopleComp" />
      <ChannelsChatComponent class="channelsComp" />
      <RequestsChatComponent class="requestsComp" />
    </div>
    <ChatChatComponent :chat-name="chatName" class="chatChatComp" />
    <input v-model="chatName" type="test" class="inputBox" />
    <ChatOptionsChatComponent class="optionsComp" />
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
