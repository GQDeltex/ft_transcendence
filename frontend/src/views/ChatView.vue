<script setup lang="ts">
import ParentChatComponent from '../components/chat/chat/ParentChatComponent.vue';
import ParentPeoplesComponent from '../components/chat/peoples/ParentPeoplesComponent.vue';
import ParentChannelsComponent from '../components/chat/channels/ParentChannelsComponent.vue';
import ParentRequestsComponent from '../components/chat/requests/ParentRequestsComponent.vue';
import ParentOptionsComponent from '../components/chat/options/ParentOptionsComponent.vue';
import ChannelService from '../service/ChannelService';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import { socket } from '@/service/socket';
import {
  AllowedUpdateBlockingMethod,
  AllowedUpdateFriendshipMethod,
  useUserStore,
} from '@/store/user';
import type { User } from '@/store/user';
import type { Channel } from '@/store/message';

const errorStore = useErrorStore();
const userStore = useUserStore();
const currentChannel = ref<Channel>({ id: 0, name: '', private: true });

const users = ref<User[]>([]);
const channels = ref<Channel[]>([]);

socket.on('onFriend', ({ method, id }: { method: string; id: number }) => {
  switch (method) {
    case AllowedUpdateFriendshipMethod.ADD:
      userStore.receivedFriendRequests.push(id);
      break;
    case AllowedUpdateFriendshipMethod.REMOVE:
      userStore.friends = userStore.friends.filter(
        (friendId) => friendId !== id,
      );
      break;
    case AllowedUpdateFriendshipMethod.ACCEPT:
      userStore.friends.push(id);
      userStore.sentFriendRequests = userStore.sentFriendRequests.filter(
        (friendId) => friendId !== id,
      );
      break;
    case AllowedUpdateFriendshipMethod.DECLINE:
      userStore.sentFriendRequests = userStore.sentFriendRequests.filter(
        (friendId) => friendId !== id,
      );
      break;
    case AllowedUpdateFriendshipMethod.CANCEL:
      userStore.receivedFriendRequests =
        userStore.receivedFriendRequests.filter((friendId) => friendId !== id);
      break;
  }
});

socket.on('onBlock', ({ method, id }: { method: string; id: number }) => {
  switch (method) {
    case AllowedUpdateBlockingMethod.BLOCK:
      userStore.blockedBy.push(id);
      userStore.friends = userStore.friends.filter(
        (friendId) => friendId !== id,
      );
      userStore.sentFriendRequests = userStore.sentFriendRequests.filter(
        (friendId) => friendId !== id,
      );
      userStore.receivedFriendRequests =
        userStore.receivedFriendRequests.filter((friendId) => friendId !== id);
      break;
    case AllowedUpdateBlockingMethod.UNBLOCK:
      userStore.blockedBy = userStore.blockedBy.filter(
        (userId) => userId !== id,
      );
      break;
  }
});

onMounted(async () => {
  try {
    users.value = await UserService.findAll();
    channels.value = await ChannelService.findAll();
    if (channels.value.length > 0) currentChannel.value = channels.value[0];
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
});

onBeforeUnmount(() => {
  socket.off('onFriend');
  socket.off('onBlock');
});

const UpdateChannels = (channel: Channel) => {
  currentChannel.value = channel;
};

const UpdateChat = (username: string) => {
  currentChannel.value = { id: 0, name: username, private: true };
};

const joinChannel = (channel: Channel) => {
  // Somehow channels.value.push does not work. This seems to be fine.
  channels.value = [...channels.value, channel];
};

const leaveChannel = (channelName: string) => {
  channels.value = [
    ...channels.value.filter((channel) => channel.name !== channelName),
  ];
  if (channels.value.length > 0) currentChannel.value = channels.value[0];
  else currentChannel.value = { id: 0, name: '', private: true };
};

const onUpdatePublic = (updatedChannel: Channel) => {
  channels.value = [
    ...channels.value.filter((channel) => channel.name !== updatedChannel.name),
    updatedChannel,
  ];
  console.log('current channel updated public');
};
</script>

<template>
  <div class="chatViewParent">
    <div class="leftSide">
      <ParentPeoplesComponent
        :clients="users"
        class="friendsPeopleComp"
        @chat="UpdateChat"
      />
      <ParentChannelsComponent
        :channels="channels"
        :current-channel="currentChannel"
        :user-id="userStore.id"
        class="channelsComp"
        @update="UpdateChannels"
        @join="joinChannel"
      />
      <ParentRequestsComponent :clients="users" class="requestsComp" />
    </div>
    <ParentChatComponent
      :chat-name="currentChannel.name"
      class="chatChatComp"
    />
    <input v-model="currentChannel.name" type="text" class="inputBox" />
    <ParentOptionsComponent
      :clients="users"
      :current-channel="currentChannel"
      class="optionsComp"
      @leave="leaveChannel"
      @update-public="onUpdatePublic"
      @chat="UpdateChat"
    />
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
  width: 15vw;
  height: inherit;
  grid-auto-rows: 1fr;
}
.friendsPeopleComp {
  grid-row: 1 / 2;
  max-height: 25vh;
}

.channelsComp {
  grid-row: 2 / 3;
  max-height: 25vh;
}

.requestsComp {
  grid-row: 3 / 4;
  max-height: 25vh;
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
