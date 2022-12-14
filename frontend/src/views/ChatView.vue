<script setup lang="ts">
import ParentChatComponent from '../components/chat/chat/ParentChatComponent.vue';
import ParentPeoplesComponent from '../components/chat/peoples/ParentPeoplesComponent.vue';
import ParentChannelsComponent from '../components/chat/channels/ParentChannelsComponent.vue';
import ParentRequestsComponent from '../components/chat/requests/ParentRequestsComponent.vue';
import ParentOptionsComponent from '../components/chat/options/ParentOptionsComponent.vue';
import ChannelService from '../service/ChannelService';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import { socket } from '@/service/socket';
import {
  AllowedUpdateBlockingMethod,
  AllowedUpdateFriendshipMethod,
  AllowedUpdateGameRequestMethod,
  useUserStore,
} from '@/store/user';
import type { User } from '@/store/user';
import type { Channel } from '@/store/message';
import { useMessagesStore } from '@/store/message';
import { cloneDeep } from 'lodash';

const errorStore = useErrorStore();
const userStore = useUserStore();
const messagesStore = useMessagesStore();
const currentChannel = ref<Channel>({
  id: 0,
  name: '',
  private: true,
  password: '',
  userList: [],
});

const users = ref<User[]>([]);
const channels = ref<Channel[]>([]);

socket.on('onFriend', ({ method, id }: { method: string; id: number }) => {
  switch (method) {
    case AllowedUpdateFriendshipMethod.ADD:
      userStore.receivedFriendRequests = [
        ...userStore.receivedFriendRequests,
        id,
      ];
      break;
    case AllowedUpdateFriendshipMethod.REMOVE:
      userStore.friends = userStore.friends.filter(
        (friendId) => friendId !== id,
      );
      break;
    case AllowedUpdateFriendshipMethod.ACCEPT:
      userStore.friends = [...userStore.friends, id];
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
      userStore.blockedBy = [...userStore.blockedBy, id];
      userStore.friends = userStore.friends.filter(
        (friendId) => friendId !== id,
      );
      userStore.sentFriendRequests = userStore.sentFriendRequests.filter(
        (friendId) => friendId !== id,
      );
      userStore.receivedFriendRequests =
        userStore.receivedFriendRequests.filter((friendId) => friendId !== id);
      userStore.sentGameRequests = userStore.sentGameRequests.filter(
        (userId) => userId !== id,
      );
      userStore.receivedGameRequests = userStore.receivedGameRequests.filter(
        (userId) => userId !== id,
      );
      break;
    case AllowedUpdateBlockingMethod.UNBLOCK:
      userStore.blockedBy = userStore.blockedBy.filter(
        (userId) => userId !== id,
      );
      break;
  }
});

socket.on('onGameRequest', ({ method, id }: { method: string; id: number }) => {
  switch (method) {
    case AllowedUpdateGameRequestMethod.SEND:
      userStore.receivedGameRequests = [...userStore.receivedGameRequests, id];
      break;
    case AllowedUpdateGameRequestMethod.DECLINE:
      userStore.sentGameRequests = userStore.sentGameRequests.filter(
        (userId) => userId !== id,
      );
      break;
    case AllowedUpdateGameRequestMethod.CANCEL:
      userStore.receivedGameRequests = userStore.receivedGameRequests.filter(
        (userId) => userId !== id,
      );
      break;
  }
});

watch([() => userStore.friends, () => userStore.blocks], async () => {
  try {
    users.value = await UserService.findAll({ fetchPolicy: 'network-only' });
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
});

onMounted(async () => {
  try {
    users.value = await UserService.findAll();
    channels.value = await ChannelService.findAll();
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
});

onBeforeUnmount(() => {
  socket.off('onFriend');
  socket.off('onBlock');
  socket.off('onGameRequest');
});

const UpdateChannels = (input: Channel) => {
  currentChannel.value = input;
};

const UpdateChat = (username: string) => {
  let chatUser: User | undefined = users.value.find(
    (client: User) => client.username == username,
  );
  currentChannel.value = {
    id: chatUser ? chatUser.id : 0,
    name: username,
    private: true,
    password: '',
    userList: [],
  };
};

const joinChannel = async (channel: Channel) => {
  channels.value = await ChannelService.findAll({
    fetchPolicy: 'network-only',
  });
  currentChannel.value = channel;
};

const leaveChannel = async () => {
  channels.value = await ChannelService.findAll({
    fetchPolicy: 'network-only',
  });
  currentChannel.value = {
    id: 0,
    name: '',
    private: true,
    password: '',
    userList: [],
  };
};

const onUpdatePublic = (updatedChannel: Channel) => {
  channels.value = [
    ...channels.value.filter((channel) => channel.name !== updatedChannel.name),
    updatedChannel,
  ];
  currentChannel.value = updatedChannel;
};

const onUpdateAdmin = ({
  updateAdmin,
}: {
  updateAdmin: { id: number; admin: boolean };
}) => {
  let updatedChannel = channels.value.find((channel) =>
    channel.userList.some((user) => user.id === updateAdmin.id),
  );
  if (typeof updatedChannel === 'undefined') return;
  updatedChannel = cloneDeep(updatedChannel);
  updatedChannel.userList.forEach((user) => {
    if (user.id === updateAdmin.id) {
      user.admin = updateAdmin.admin;
    }
  });
  channels.value = [
    ...channels.value.filter(
      (channel) => channel.name !== updatedChannel?.name,
    ),
    updatedChannel,
  ];
  currentChannel.value = updatedChannel;
};

watch(currentChannel, (newChat) => {
  messagesStore.notifiedList = messagesStore.notifiedList.filter(
    (name) => name !== newChat.name,
  );
});
</script>

<template>
  <div class="chatViewParent">
    <div class="leftSide">
      <ParentPeoplesComponent
        :clients="users"
        :current-channel="currentChannel"
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
      :current-channel="currentChannel"
      class="chatChatComp"
    />
    <ParentOptionsComponent
      :clients="users"
      :current-channel="currentChannel"
      class="optionsComp"
      @leave="leaveChannel"
      @update-public="onUpdatePublic"
      @update-admin="onUpdateAdmin"
      @chat="UpdateChat"
      @update-kick-user="onUpdatePublic"
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
  width: 20vw;
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
  width: 50vw;
  grid-column: 2 / 3;
}

.optionsComp {
  width: 20vw;
  grid-column: 3 / 4;
}
</style>
