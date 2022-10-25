<script setup lang="ts">
import ParentChatComponent from '../components/chat/chat/ParentChatComponent.vue';
import ParentPeoplesComponent from '../components/chat/peoples/ParentPeoplesComponent.vue';
import ParentChannelsComponent from '../components/chat/channels/ParentChannelsComponent.vue';
import ParentRequestsComponent from '../components/chat/requests/ParentRequestsComponent.vue';
import ParentOptionsComponent from '../components/chat/options/ParentOptionsComponent.vue';
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

const errorStore = useErrorStore();
const userStore = useUserStore();
const chatName = ref('gucalvi');
const users = ref<User[]>([]);

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
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
});

onBeforeUnmount(() => {
  socket.off('onFriend');
  socket.off('onBlock');
});
</script>

<template>
  <div class="chatViewParent">
    <div class="leftSide">
      <ParentPeoplesComponent :clients="users" class="friendsPeopleComp" />
      <ParentChannelsComponent class="channelsComp" />
      <ParentRequestsComponent :clients="users" class="requestsComp" />
    </div>
    <ParentChatComponent :chat-name="chatName" class="chatChatComp" />
    <input v-model="chatName" type="text" class="inputBox" />
    <ParentOptionsComponent :clients="users" class="optionsComp" />
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
