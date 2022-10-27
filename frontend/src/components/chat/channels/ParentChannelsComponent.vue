<script setup lang="ts">
import ChildChannelComponent from './ChildChannelComponent.vue';
import ModalChannelComponent from './ModalChannelComponent.vue';
import { ref } from 'vue';
const emits = defineEmits(['update']);

defineProps<{
  channels: {
    id: number;
    name: string;
    private: boolean;
  }[];
}>();
const modalActive = ref(false);
const selectedChannel = ref('');

const joinNewChannel = () => {
  modalActive.value = true;
};

const onClose = (input: string) => {
  modalActive.value = false;
  emits('update', input);
};

const channelSelect = (input: string) => {
  selectedChannel.value = input;
  emits('update', input);
};
</script>

<template>
  <div class="channelsParent">
    <span class="text"
      >Channels
      <button class="button" @click="joinNewChannel">
        Join / Create Channel
      </button>
      <ModalChannelComponent v-show="modalActive" @close="onClose" />
    </span>
    <div class="list">
      <ChildChannelComponent
        v-for="channel in channels"
        :key="channel.id"
        :channel-id="channel.id"
        :channel-name="channel.name"
        picture="@/assets/pongking_boi.svg"
        class="clickable"
        :selected-channel="selectedChannel"
        @click="channelSelect(channel.name)"
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

.clickable {
  cursor: pointer;
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
