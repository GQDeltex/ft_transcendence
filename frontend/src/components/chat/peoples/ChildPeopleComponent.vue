<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import { useRouter } from 'vue-router';
import { AllowedUpdateFriendshipMethod, useUserStore } from '@/store/user';

const props = defineProps<{
  client: {
    id: number;
    title: [string];
    username: string;
    picture: string;
    status: string;
  };
}>();

const router = useRouter();
const userStore = useUserStore();

const statusStyle = computed(() => {
  switch (props.client.status) {
    case 'online':
      return { color: 'lime' };
    default:
      return { color: 'grey' };
  }
});

const statusBorder = computed(() => {
  switch (props.client.status) {
    case 'online':
      return 'lime';
    default:
      return 'grey';
  }
});

enum friendStatusEnum {
  FRIEND = 'Remove friend',
  NOT_FRIEND = 'Add friend',
  REQUEST_SENT = 'Cancel friend request',
  REQUEST_RECEIVED = 'Accept friend request',
}

const toggle = ref(false);
const friendText = ref<friendStatusEnum>(friendStatusEnum.NOT_FRIEND);
let friendStatus = friendStatusEnum.NOT_FRIEND;

watch(
  [
    () => userStore.friends,
    () => userStore.sentFriendRequests,
    () => userStore.receivedFriendRequests,
  ],
  () => {
    if (userStore.friends.some((friend) => friend.id === props.client.id)) {
      friendStatus = friendStatusEnum.FRIEND;
    } else if (
      userStore.sentFriendRequests.some(
        (friend) => friend.id === props.client.id,
      )
    ) {
      friendStatus = friendStatusEnum.REQUEST_SENT;
    } else if (
      userStore.receivedFriendRequests.some(
        (friend) => friend.id === props.client.id,
      )
    ) {
      friendStatus = friendStatusEnum.REQUEST_RECEIVED;
    } else {
      friendStatus = friendStatusEnum.NOT_FRIEND;
    }
    friendText.value = friendStatus;
  },
  { immediate: true },
);

const onFriend = () => {
  switch (friendStatus) {
    case friendStatusEnum.NOT_FRIEND:
      userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.ADD,
        props.client.id,
      );
      break;
    case friendStatusEnum.FRIEND:
      userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.REMOVE,
        props.client.id,
      );
      break;
    case friendStatusEnum.REQUEST_SENT:
      userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.CANCEL,
        props.client.id,
      );
      break;
    case friendStatusEnum.REQUEST_RECEIVED:
      userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.ACCEPT,
        props.client.id,
      );
      break;
  }
};

const onDecline = () => {
  if (friendStatus === friendStatusEnum.REQUEST_RECEIVED) {
    userStore.updateFriendship(
      AllowedUpdateFriendshipMethod.DECLINE,
      props.client.id,
    );
  }
};

const onBlock = () => {
  console.log('onBlock');
};

const onInvite = () => {
  console.log('onInvite');
};

const onProfile = async () => {
  await router.push({
    name: 'ProfileView',
    params: { id: props.client.id },
  });
};
</script>

<template>
  <div class="client" @click="toggle = !toggle">
    <RoundPictureComponent
      class="picture"
      :picture="client.picture"
      size="1.5vw"
      :border-color="statusBorder"
    />
    <div class="infoBox">
      <span class="username">{{ client.title[0] }} {{ client.username }}</span>
      <span :style="statusStyle" class="status">{{ client.status }}</span>
    </div>
  </div>
  <div v-show="toggle" class="popup">
    <button class="butt" @click="onFriend">{{ friendText }}</button>
    <button
      v-show="friendText === friendStatusEnum.REQUEST_RECEIVED"
      class="butt"
      @click="onDecline"
    >
      Decline friend request
    </button>
    <button class="butt" @click="onBlock">Block</button>
    <button class="butt" @click="onInvite">Invite to Game</button>
    <button class="butt" @click="onProfile">Show Profile</button>
  </div>
</template>

<style scoped>
.client {
  display: flex;
  align-items: center;
  padding-top: 1%;
  cursor: pointer;
}

.infoBox {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
}
.username {
  color: white;
  font-size: 0.8vw;
  font-stretch: expanded;
}

.status {
  font-size: 0.6vw;
  color: lime;
}

.popup {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
}

.butt {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.5vw;
  border-color: transparent;
  margin-top: 3px;
}
</style>
