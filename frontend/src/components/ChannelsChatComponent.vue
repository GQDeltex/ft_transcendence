<script setup lang="ts">
import ChatChannelComponent from './ChatChannelComponent.vue';
import ModalJoinCreateChannelComponent from './ModalJoinCreateChannelComponent.vue';
import { ref } from 'vue';

const modalActive = ref(false);

const joinNewChannel = () => {
  modalActive.value = true;
};

const onClose = () => {
  modalActive.value = false;
};
</script>

<template>
  <div class="channelsParent">
    <span class="text"
      >Channels
      <button class="button" @click="joinNewChannel">
        Join / Create Channel
      </button>
      <ModalJoinCreateChannelComponent v-show="modalActive" @close="onClose" />
    </span>
    <div class="list">
      <ChatChannelComponent
        key="4242"
        :client-id="4242"
        channel-name="devOps"
        picture="@/assets/pongking_boi.svg"
      />
      <ChatChannelComponent
        key="4242"
        :client-id="4242"
        channel-name="chitChat"
        picture="@/assets/pongking_boi.svg"
      />
      <ChatChannelComponent
        key="4242"
        :client-id="4242"
        channel-name="42Wolfsburg"
        picture="@/assets/pongking_boi.svg"
      />
      <ChatChannelComponent
        key="4242"
        :client-id="4242"
        channel-name="examPrep"
        picture="@/assets/pongking_boi.svg"
      />
      <ChatChannelComponent
        key="4242"
        :client-id="4242"
        channel-name="ThisAndThat"
        picture="@/assets/pongking_boi.svg"
      />
      <ChatChannelComponent
        key="4242"
        :client-id="4242"
        channel-name="SecretChannel"
        picture="@/assets/pongking_boi.svg"
      />
      <ChatChannelComponent
        key="4242"
        :client-id="4242"
        channel-name="StaffOnly!"
        picture="@/assets/pongking_boi.svg"
      />
    </div>
  </div>
</template>

<style scoped>
.channelsParent {
  display: flex;
  flex-direction: column;
  padding: 0.5vw;
  padding-bottom: 0.5vw;
  border: 1px solid #202020;
}
.text {
  display: flex;
  font-size: 1vw;
  padding-bottom: 0.5vw;
  color: #f8971d;
  justify-content: space-between;
}
.list {
  overflow-y: scroll;
  padding-left: 5%;
}

button {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent;
}
</style>
