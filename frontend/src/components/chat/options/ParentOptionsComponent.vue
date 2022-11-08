<script setup lang="ts">
import { ref, computed } from 'vue';
import ChildOptionsPeopleComponent from './ChildOptionsPeopleComponent.vue';
import ModalUpdatePasswordComponent from './ModalUpdatePasswordComponent.vue';
import type { User } from '@/store/user';
import { useErrorStore } from '@/store/error';
import { socket } from '@/service/socket';
import ChannelService from '@/service/ChannelService';
import ChannelUserService from '@/service/ChannelUserService';
import type { Channel } from '@/store/message';
import { useUserStore } from '@/store/user';

const passModalActive = ref(false);
const emits = defineEmits(['leave', 'updatePublic', 'chat']);
const errorStore = useErrorStore();
const userStore = useUserStore();

const props = defineProps<{
  clients: User[];
  currentChannel: Channel;
}>();

const chatToggle = ref(true);

const leave = () => {
  try {
    socket.emit(
      'leave',
      {
        channel: { name: props.currentChannel.name },
      },
      () => emits('leave'),
    );
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
};

const changePassword = () => {
  passModalActive.value = true;
};

async function updateAdmin(userId: number) {
  try {
    await ChannelUserService.updateAdmin(props.currentChannel.name, userId);
    console.log(props.currentChannel.name + ' new admin ' + userId); //DEBUG
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
}

async function banUser(userId: number) {
  try {
    await ChannelUserService.banUser(props.currentChannel.name, userId);
    console.log(props.currentChannel.name + ' banned ' + userId); //DEBUG
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
}

async function muteUser(userId: number) {
  try {
    await ChannelUserService.muteUser(props.currentChannel.name, userId);
    console.log(props.currentChannel.name + ' muted ' + userId); //DEBUG
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

const onClose = () => {
  passModalActive.value = false;
};

const onChat = (username: string) => {
  emits('chat', username);
};

const userList = computed(() => {
  const tmp = props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) => channelUser.user_id == user.id,
    );
  });
  return tmp;
});

const adminList = computed(() => {
  const tmp = props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) =>
        channelUser.user_id == user.id && channelUser.admin == true,
    );
  });
  return tmp;
});

const banList = computed(() => {
  const tmp = props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) =>
        channelUser.user_id == user.id && channelUser.ban == true,
    );
  });
  return tmp;
});

const muteList = computed(() => {
  const tmp = props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) =>
        channelUser.user_id == user.id && channelUser.mute == true,
    );
  });
  return tmp;
});

const ownerList = computed(() => {
  const tmp = props.clients.filter((user) => {
    return props.currentChannel.userList.some(
      (channelUser) =>
        channelUser.user_id == user.id && channelUser.owner == true,
    );
  });
  return tmp;
});

const isOwner = computed(() => {
  if (ownerList.value.find((user) => user.id == userStore.id) != null)
    return true;
  return false;
});

const isAdmin = computed(() => {
  if (adminList.value.find((user) => user.id == userStore.id) != null)
    return true;
  return false;
});

function getChannelUserRank(client: User) {
  if (ownerList.value.find((user) => user.id == client.id) != null)
    return 'Owner';
  if (adminList.value.find((user) => user.id == client.id) != null)
    return 'Admin';
  return 'in chat';
}

function getChannelUserStatus(client: User) {
  if (banList.value.find((user) => user.id == client.id) != null)
    return 'banned';
  if (muteList.value.find((user) => user.id == client.id) != null)
    return 'muted';
  return '';
}
</script>

<template>
  <div class="optionsParent">
    <span class="headerText">Chat Options</span>
    <div class="list">
      <div class="subheader" @click="chatToggle = !chatToggle">In Chat ▾</div>
      <div v-show="chatToggle" class="people">
        <template v-for="client in userList" :key="client.userId">
          <ChildOptionsPeopleComponent
            :client="client"
            :is-owner="isOwner"
            :is-admin="isAdmin"
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
      <!-- <div class="subheader" @click="adminToggle = !adminToggle">Admins ▾</div>
      <div v-show="adminToggle" class="people">
        <template v-for="client in adminList" :key="client.id">
          <ChildOptionsPeopleComponent
          :client="client" @chat="onChat"
          :is-owner="isOwner"
          :is-admin="isAdmin"
          :current-channel="currentChannel"
          />
        </template>
      </div> -->
      <!-- <div class="subheader" @click="banToggle = !banToggle">Banned ▾</div>
      <div v-show="banToggle" class="people">
        <template v-for="client in banList" :key="client.id">
          <ChildOptionsPeopleComponent
          :client="client" @chat="onChat"
          :is-owner="isOwner"
          :is-admin="isAdmin"
          :current-channel="currentChannel"
          />
        </template>
      </div> -->
      <!-- <div class="subheader" @click="muteToggle = !muteToggle">Muted ▾</div>
      <div v-show="muteToggle" class="people">
        <template v-for="client in muteList" :key="client.id">
          <ChildOptionsPeopleComponent
          :client="client" @chat="onChat"
          :is-owner="isOwner"
          :is-admin="isAdmin"
          :current-channel="currentChannel"
          />
        </template>
      </div> -->
      <div class="buttonList">
        <span class="headerText"> Options </span>
        <span v-if="isOwner">
          <button class="button main" @click="changePassword">
            Change Password
          </button>
          <ModalUpdatePasswordComponent
            v-if="passModalActive"
            :current-channel="props.currentChannel"
            @close="onClose"
          />
        </span>
        <span v-if="props.currentChannel.name.startsWith('#')">
          <button class="button main" @click="leave">Leave Chat</button>
        </span>
        <!-- <span v-if="isOwner">
          <button class="button" @click="updateAdmin">Make Admin</button>
          <ModalUpdateAdminComponent
            v-show="adminModalActive"
            @close="onClose"
          />
        </span>
        <span v-if="isAdmin || isOwner">
          <button class="button" @click="banUser">Ban User</button>
          <ModalBanUserComponent v-show="banModalActive" @close="onClose" />
        </span>
        <span v-if="isAdmin || isOwner">
          <button class="button" @click="muteUser">Mute User</button>
          <ModalMuteUserComponent v-show="muteModalActive" @close="onClose" />
        </span> -->
        <span v-if="isOwner">
          <button class="button main" @click="makePublic">
            Make {{ props.currentChannel.private ? 'Public' : 'Private' }}
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
  border: 1px solid var(--main-4-color);
  height: inherit;
  width: 15vw;
}

.headerText {
  font-size: var(--main-text-font-size);
  color: var(--main-1-color);
}

.list {
  max-height: 1fr;
  overflow-y: scroll;
}

.subheader {
  cursor: pointer;
  font-size: var(--main-small-font-size);
  color: var(--main-3-color);
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
  /* text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent; */
  margin-top: 2px;
}
</style>
