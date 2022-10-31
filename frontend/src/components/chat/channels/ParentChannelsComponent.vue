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
};

const channelSelect = (input: Channel) => {
  if (!userInChannel(input)) return;
  emits(
    'update',
    props.channels.find((channel) => channel.name === input.name),
  );
};

function userInChannel(input: Channel) {
  console.log('input', input);
  return input.userList.some((inside) => {
    if (inside.user_id == props.userId) return true;
    return false;
  });
}
</script>

<template>
  <div class="channelsParent">
    <span class="text"
      >Channels
      <button class="button" @click="joinNewChannel">
        Join / Create Channel
      </button>
      <ModalChannelComponent
        v-show="modalActive"
        @close="onClose"
        @join="onJoin"
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
