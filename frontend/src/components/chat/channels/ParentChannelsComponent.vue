<script setup lang="ts">
import ChildChannelComponent from './ChildChannelComponent.vue';
import ModalChannelComponent from './ModalChannelComponent.vue';
import type { Channel } from '@/store/message';
import { ref } from 'vue';
const emits = defineEmits(['update', 'join']);

const props = defineProps<{
  channels: Channel[];
  currentChannel: Channel;
  userId: number;
}>();
const modalActive = ref(false);

const joinNewChannel = () => {
  modalActive.value = true;
};

const onClose = () => {
  modalActive.value = false;
};

const onJoin = (channel: Channel) => {
  emits('join', channel);
  emits('update', channel);
  modalActive.value = false;
};

const channelSelect = (input: Channel) => {
  if (!userInChannel(input)) return;
  emits(
    'update',
    props.channels.find((channel) => channel.name === input.name),
  );
};

function userInChannel(input: Channel) {
  return input.userList.some((inside) => {
    return inside.user_id === props.userId;
  });
}
</script>

<template>
  <div class="channelsParent">
    <span class="text"
      >Channels
      <button class="button" @click="joinNewChannel">
        Join / Create channel
      </button>
      <ModalChannelComponent
        v-if="modalActive"
        @join="onJoin"
        @close="onClose"
      />
    </span>
    <div class="list">
      <ChildChannelComponent
        v-for="channel in channels"
        :key="channel.id"
        :channel-id="channel.id"
        :channel-name="channel.name"
        picture="@/assets/pongking_boi.svg"
        :class="{ clickable: userInChannel(channel) }"
        :is-user-inside="userInChannel(channel)"
        :selected-channel="currentChannel.name"
        @click="channelSelect(channel)"
      />
    </div>
  </div>
</template>

<style scoped>
.channelsParent {
  display: flex;
  flex-direction: column;
  padding: 0.5vw;
  border: 1px solid grey;
}
.text {
  display: flex;
  font-size: 2vw;
  padding-bottom: 0.5vw;
  color: #c00000;
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
  font-family: 'Mountains of Christmas', cursive;
  text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  cursor: pointer;
  font-size: 1.2vw;
  border-color: transparent;
}
</style>
