<script setup lang="ts">
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
import { useMessagesStore } from '@/store/message';
import { useI18n } from 'vue-i18n';

const emits = defineEmits(['chat']);

const props = defineProps<{
  client: User;
  highlight: boolean;
}>();

const router = useRouter();
const userStore = useUserStore();
const messagesStore = useMessagesStore();

const activeChat = computed(() => {
  if (props.highlight) return { color: '#c00000' };
  return { color: 'white' };
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

const statusText = computed(() => {
  switch (props.client.status) {
    case 'online':
      return useI18n().t('online');
    case 'in game':
      return useI18n().t('ingame');
    default:
      return useI18n().t('offline');
  }
});
const toggle = ref(false);

function localizedFriendStatus(friendStatus: FriendStatusEnum) {
  if (friendStatus == FriendStatusEnum.FRIEND)
    return useI18n().t('removefriend');
  if (friendStatus == FriendStatusEnum.NOT_FRIEND)
    return useI18n().t('addfriend');
  if (friendStatus == FriendStatusEnum.REQUEST_SENT)
    return useI18n().t('cancelfriendrequest');
  if (friendStatus == FriendStatusEnum.REQUEST_RECEIVED)
    return useI18n().t('acceptfriendrequest');
}

function localizedBlockStatus(blockStatus: BlockStatusEnum) {
  if (blockStatus == BlockStatusEnum.BLOCKED) return useI18n().t('unblock');
  if (blockStatus == BlockStatusEnum.NOT_BLOCKED) return useI18n().t('block');
}

function localizedGameRequestStatus(gameStatus: GameStatusEnum) {
  if (gameStatus == GameStatusEnum.NOT_SEND)
    return useI18n().t('sendgamerequest');
  if (gameStatus == GameStatusEnum.SENT)
    return useI18n().t('cancelgamerequest');
  if (gameStatus == GameStatusEnum.RECEIVED)
    return useI18n().t('acceptgamerequest');
}

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
        size="2vw"
        :border-color="statusBorder"
        :is-notified="messagesStore.isNotified(client.username)"
      />
      <div class="infoBox">
        <span class="username" :style="activeChat"
          >{{ client.title[0] }} {{ client.username }}</span
        >
        <span :style="statusStyle" class="status">{{ statusText }}</span>
      </div>
    </div>
    <div class="dot" @click="toggle = !toggle">⋮</div>
  </div>

  <div v-show="toggle" class="popup">
    <button class="butt" @click="onChat(client.username)">
      {{ useI18n().t('chat') }}
    </button>
    <button
      v-show="
        userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
      "
      class="butt"
      @click="onFriend"
    >
      {{ localizedFriendStatus(userStore.getFriendStatus(client.id)) }}
    </button>
    <button
      v-show="
        userStore.getFriendStatus(client.id) ===
          FriendStatusEnum.REQUEST_RECEIVED &&
        userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
      "
      class="butt"
      @click="onFriendDecline"
    >
      {{ useI18n().t('declinefriendrequest') }}
    </button>
    <button class="butt" @click="onBlock">
      {{ localizedBlockStatus(userStore.getBlockStatus(client.id)) }}
    </button>
    <button
      v-show="
        userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
      "
      class="butt"
      @click="onInvite"
    >
      {{
        localizedGameRequestStatus(userStore.getGameRequestStatus(client.id))
      }}
    </button>
    <button
      v-show="
        userStore.getGameRequestStatus(client.id) === GameStatusEnum.RECEIVED &&
        userStore.getBlockStatus(client.id) === BlockStatusEnum.NOT_BLOCKED
      "
      class="butt"
      @click="onGameDecline"
    >
      {{ useI18n().t('declinegamerequest') }}
    </button>
    <button class="butt" @click="onProfile">
      {{ useI18n().t('showprofile') }}
    </button>
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
  color: white;
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
  font-size: 1.2vw;
  font-stretch: expanded;
}

.status {
  font-size: 1vw;
  color: grey;
}

.popup {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
}

.butt {
  font-family: 'Mountains of Christmas', cursive;
  text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  cursor: pointer;
  font-size: 1vw;
  border-color: transparent;
  margin-top: 3px;
}
</style>
