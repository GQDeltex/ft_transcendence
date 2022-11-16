<script setup lang="ts">
import { computed, ref } from 'vue';
import ChildOptionsPeopleComponent from './ChildOptionsPeopleComponent.vue';
import ModalUpdatePasswordComponent from './ModalUpdatePasswordComponent.vue';
import type { User } from '@/store/user';
import { useUserStore } from '@/store/user';
import { useErrorStore } from '@/store/error';
import { socket } from '@/service/socket';
import ChannelService from '@/service/ChannelService';
import ChannelUserService from '@/service/ChannelUserService';
import type { Channel } from '@/store/message';
import { useI18n } from 'vue-i18n';

const passModalActive = ref(false);
const emits = defineEmits(['leave', 'updatePublic', 'chat', 'updateAdmin']);
const errorStore = useErrorStore();
const userStore = useUserStore();

const props = defineProps<{
  clients: User[];
  currentChannel: Channel;
}>();

const chatToggle = ref(true);

const leave = () => {
  try {
    socket.emit('leave', { channel: { name: props.currentChannel.name } }, () =>
      emits('leave'),
    );
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
};

async function updateAdmin(userId: number) {
  try {
    const updateAdmin: { id: number; admin: boolean } =
      await ChannelUserService.updateAdmin(props.currentChannel.name, userId);
    emits('updateAdmin', updateAdmin);
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
}

async function banUser(userId: number) {
  try {
    await ChannelUserService.banUser(props.currentChannel.name, userId);
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
}

async function muteUser(userId: number) {
  try {
    await ChannelUserService.muteUser(props.currentChannel.name, userId);
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
}

const makePublic = async () => {
  try {
    const updatedChannel: Channel = await ChannelService.updatePublic(
      props.currentChannel.name,
      !props.currentChannel.private,
    );
    emits('updatePublic', updatedChannel);
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
};

const onChat = (username: string) => {
  emits('chat', username);
};

const userList = computed(() => {
  return props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) => channelUser.user_id === user.id,
    );
  });
});

const adminList = computed(() => {
  return props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) => channelUser.user_id === user.id && channelUser.admin,
    );
  });
});

const banList = computed(() => {
  return props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) => channelUser.user_id === user.id && channelUser.ban,
    );
  });
});

const muteList = computed(() => {
  return props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) => channelUser.user_id === user.id && channelUser.mute,
    );
  });
});

const ownerList = computed(() => {
  return props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) => channelUser.user_id === user.id && channelUser.owner,
    );
  });
});

const isOwner = computed(() => {
  return ownerList.value.some((user) => user.id == userStore.id);
});

const isAdmin = (id: number) => {
  return adminList.value.some((user) => user.id === id);
};

function getChannelUserRank(client: User) {
  if (ownerList.value.some((user) => user.id == client.id)) return 'Owner';
  if (adminList.value.some((user) => user.id == client.id)) return 'Admin';
  return 'in chat';
}

function getChannelUserStatus(client: User) {
  if (banList.value.some((user) => user.id == client.id)) return 'banned';
  if (muteList.value.some((user) => user.id == client.id)) return 'muted';
  return '';
}
</script>

<template>
  <div class="optionsParent">
    <span class="headerText">{{ useI18n().t('chatoptions') }}</span>
    <div class="list">
      <div class="subheader" @click="chatToggle = !chatToggle">
        {{ useI18n().t('inchat') }} ▾
      </div>
      <div v-show="chatToggle" class="people">
        <template v-for="client in userList" :key="client.id">
          <ChildOptionsPeopleComponent
            :client="client"
            :is-owner="isOwner"
            :is-admin="isAdmin(userStore.id)"
            :is-client-admin="isAdmin(client.id)"
            :current-channel="currentChannel"
            :channel-user-rank="getChannelUserRank(client)"
            :channel-user-status="getChannelUserStatus(client)"
            @chat="onChat"
            @update-admin="updateAdmin"
            @ban-user="banUser"
            @mute-user="muteUser"
          />
        </template>
      </div>
      <div class="buttonList">
        <span class="headerText"> {{ useI18n().t('options') }} </span>
        <span v-if="isOwner">
          <button class="button" @click="passModalActive = true">
            {{ useI18n().t('changepassword') }}
          </button>
          <ModalUpdatePasswordComponent
            v-if="passModalActive"
            :current-channel="props.currentChannel"
            @close="passModalActive = false"
          />
        </span>
        <span v-if="props.currentChannel.name.startsWith('#')">
          <button class="button" @click="leave">
            {{ useI18n().t('leavechat') }}
          </button>
        </span>
        <span v-if="isOwner">
          <button class="button" @click="makePublic">
            {{
              props.currentChannel.private
                ? useI18n().t('makepublic')
                : useI18n().t('makeprivate')
            }}
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.optionsParent {
  display: flex;
  flex-direction: column;
  padding: 0.5vw;
  border: 1px solid gray;
  height: inherit;
  width: 15vw;
}

.headerText {
  font-size: 1vw;
  color: #c00000;
}

.list {
  max-height: 1fr;
  overflow-y: scroll;
}

.subheader {
  cursor: pointer;
  font-size: 0.8vw;
  color: grey;
  font-weight: bold;
  margin-top: 5px;
}

.people {
  padding-left: 5%;
}

.buttonList {
  display: flex;
  flex-direction: column;
}

.button {
  text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent;
  margin-top: 5px;
}
</style>
