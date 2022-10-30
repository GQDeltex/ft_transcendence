<script setup lang="ts">
import { computed, ref } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import { useRouter } from 'vue-router';
import type { User } from '@/store/user';
import {
  AllowedUpdateBlockingMethod,
  AllowedUpdateFriendshipMethod,
  FriendStatusEnum,
  BlockStatusEnum,
  useUserStore,
} from '@/store/user';
const emits = defineEmits(['chat']);

const props = defineProps<{
  client: User;
}>();

const router = useRouter();
const userStore = useUserStore();

const statusStyle = computed(() => {
  switch (props.client.status) {
    case 'online':
      return { color: 'lime' };
    case 'in game':
      return { color: 'yellow' };
    default:
      return { color: 'grey' };
  }
});

const statusBorder = computed(() => {
  switch (props.client.status) {
    case 'online':
      return 'lime';
    case 'in game':
      return 'yellow';
    default:
      return 'grey';
  }
});

const toggle = ref(false);

const onFriend = async () => {
  switch (userStore.getFriendStatus(props.client.id)) {
    case FriendStatusEnum.NOT_FRIEND:
      await userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.ADD,
        props.client.id,
      );
      break;
    case FriendStatusEnum.FRIEND:
      await userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.REMOVE,
        props.client.id,
      );
      break;
    case FriendStatusEnum.REQUEST_SENT:
      await userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.CANCEL,
        props.client.id,
      );
      break;
    case FriendStatusEnum.REQUEST_RECEIVED:
      await userStore.updateFriendship(
        AllowedUpdateFriendshipMethod.ACCEPT,
        props.client.id,
      );
      break;
  }
};

const onDecline = async () => {
  if (
    userStore.getFriendStatus(props.client.id) ===
    FriendStatusEnum.REQUEST_RECEIVED
  ) {
    await userStore.updateFriendship(
      AllowedUpdateFriendshipMethod.DECLINE,
      props.client.id,
    );
  }
};

const onBlock = async () => {
  switch (userStore.getBlockStatus(props.client.id)) {
    case BlockStatusEnum.NOT_BLOCKED:
      await userStore.updateBlocking(
        AllowedUpdateBlockingMethod.BLOCK,
        props.client.id,
      );
      break;
    case BlockStatusEnum.BLOCKED:
      await userStore.updateBlocking(
        AllowedUpdateBlockingMethod.UNBLOCK,
        props.client.id,
      );
      break;
  }
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

const onChat = (username: string) => {
  emits('chat', username);
};
</script>

<template>
  <div class="encaps">
    <div class="client" @click="onChat(client.username)">
      <RoundPictureComponent
        class="picture"
        :picture="client.picture"
        size="1.5vw"
        :border-color="statusBorder"
      />
      <div class="infoBox">
        <span class="username"
          >{{ client.title[0] }} {{ client.username }}</span
        >
        <span :style="statusStyle" class="status">{{ client.status }}</span>
      </div>
    </div>
    <div class="vertdot" @click="toggle = !toggle">⋮</div>
  </div>

  <div v-show="toggle" class="popup">
    <button class="butt" @click="onChat(client.username)">Chat</button>
    <button
      v-show="
        userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
      "
      class="butt"
      @click="onFriend"
    >
      {{ userStore.getFriendStatus(client.id) }}
    </button>
    <button
      v-show="
        userStore.getFriendStatus(client.id) ===
          FriendStatusEnum.REQUEST_RECEIVED &&
        userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
      "
      class="butt"
      @click="onDecline"
    >
      Decline friend request
    </button>
    <button class="butt" @click="onBlock">
      {{ userStore.getBlockStatus(client.id) }}
    </button>
    <button class="butt" @click="onInvite">Invite to Game</button>
    <button class="butt" @click="onProfile">Show Profile</button>
  </div>
</template>

<style scoped>
.encaps {
  display: flex;
}
.vertdot {
  margin-left: 0.5em;
  margin-right: 1em;
  cursor: pointer;
  font-size: 1.5vw;
}
.client {
  display: flex;
  align-items: center;
  padding-top: 1%;
}

.infoBox {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  cursor: pointer;
}
.username {
  color: white;
  font-size: 0.8vw;
  font-stretch: expanded;
}

.status {
  font-size: 0.6vw;
  color: grey;
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
