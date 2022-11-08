<script setup lang="ts">
import { CI } from '@/CI';
import { computed, ref } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import { useRouter } from 'vue-router';
import type { User } from '@/store/user';
import {
  AllowedUpdateBlockingMethod,
  AllowedUpdateFriendshipMethod,
  AllowedUpdateGameRequestMethod,
  BlockStatusEnum,
  FriendStatusEnum,
  GameStatusEnum,
  useUserStore,
} from '@/store/user';

const ci = ref<typeof CI>(CI);

const emits = defineEmits(['chat']);

const props = defineProps<{
  client: User;
  highlight: boolean;
}>();

const router = useRouter();
const userStore = useUserStore();

const activeChat = computed(() => {
  // if (props.highlight) return { color: '#f8971d' };
  if (props.highlight) return { color: ci.value.color1 };
  return { color: ci.value.color2 };
});

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

const onFriendDecline = async () => {
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

const onInvite = async () => {
  switch (userStore.getGameRequestStatus(props.client.id)) {
    case GameStatusEnum.RECEIVED:
      await router.push({
        name: 'PongView',
        query: { inviterId: props.client.id },
      });
      break;
    case GameStatusEnum.SENT:
      await userStore.updateGameRequest(
        AllowedUpdateGameRequestMethod.CANCEL,
        props.client.id,
      );
      break;
    case GameStatusEnum.NOT_SEND:
      await userStore.updateGameRequest(
        AllowedUpdateGameRequestMethod.SEND,
        props.client.id,
      );
      break;
  }
};

const onGameDecline = async () => {
  if (
    userStore.getGameRequestStatus(props.client.id) === GameStatusEnum.RECEIVED
  ) {
    await userStore.updateGameRequest(
      AllowedUpdateGameRequestMethod.DECLINE,
      props.client.id,
    );
  }
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
  <div class="flex">
    <div class="client" @click="onChat(client.username)">
      <RoundPictureComponent
        class="picture"
        :picture="client.picture"
        size="1.5vw"
        :border-color="statusBorder"
      />
      <div class="infoBox">
        <span class="username" :style="activeChat"
          >{{ client.title[0] }} {{ client.username }}</span
        >
        <span :style="statusStyle" class="status">{{ client.status }}</span>
      </div>
    </div>
    <div class="dot" @click="toggle = !toggle">⋮</div>
  </div>

  <div v-show="toggle" class="popup">
    <div>
      <button class="button" @click="onChat(client.username)">Chat</button>
    </div>
    <div>
      <button
        v-show="
          userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
        "
        class="button"
        @click="onFriend"
      >
        {{ userStore.getFriendStatus(client.id) }}
      </button>
    </div>
    <div>
      <button
        v-show="
          userStore.getFriendStatus(client.id) ===
            FriendStatusEnum.REQUEST_RECEIVED &&
          userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
        "
        class="button"
        @click="onFriendDecline"
      >
        Decline friend request
      </button>
    </div>
    <div>
      <button class="button" @click="onBlock">
        {{ userStore.getBlockStatus(client.id) }}
      </button>
    </div>
    <div>
      <button
        v-show="
          userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
        "
        class="button"
        @click="onInvite"
      >
        {{ userStore.getGameRequestStatus(client.id) }}
      </button>
    </div>
    <div>
      <button
        v-show="
          userStore.getGameRequestStatus(client.id) ===
            GameStatusEnum.RECEIVED &&
          userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
        "
        class="button"
        @click="onGameDecline"
      >
        Decline game request
      </button>
    </div>
    <div>
      <button class="button" @click="onProfile">Show Profile</button>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}

.dot {
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
  color: var(--main-2-color);
  font-size: var(--main-small-font-size);
  font-stretch: expanded;
}

.status {
  font-size: 0.6vw;
  color: var(--main-3-color);
}

.popup {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
}

.button {
  /* text-decoration: none;
  border-radius: 5px;
  color: var(--main-bg-color);
  background-color: var(--main-1-color);
  cursor: pointer;
  font-size: 0.5vw;
  border-color: transparent; */
  margin-top: 1px;
  font-size: var(--main-small-font-size);
}
</style>
