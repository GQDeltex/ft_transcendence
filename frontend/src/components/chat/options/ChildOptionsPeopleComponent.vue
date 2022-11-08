<script setup lang="ts">
import { computed, ref } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import { useRouter } from 'vue-router';
import type { User } from '@/store/user';
import { useUserStore } from '@/store/user';
import type { Channel } from '@/store/message';

const emits = defineEmits(['chat', 'updateAdmin', 'banUser', 'muteUser']);

const props = defineProps<{
  client: User;
  isOwner: boolean;
  isAdmin: boolean;
  currentChannel: Channel;
  channelUserRank: string;
  channelUserStatus: string;
}>();

const router = useRouter();
const userStore = useUserStore();

const statusStyle = computed(() => {
  switch (props.channelUserRank) {
    case 'in chat':
      return { color: 'white' };
    case 'Owner':
      return { color: 'lime' };
    case 'Admin':
      return { color: 'yellow' };
    default:
      return { color: 'grey' };
  }
});

const statusBorder = computed(() => {
  switch (props.channelUserStatus) {
    case 'muted':
      return 'red';
    case 'banned':
      return 'red';
    default:
      switch (props.channelUserRank) {
        case 'in chat':
          return 'white';
        case 'Owner':
          return 'lime';
        case 'Admin':
          return 'yellow';
        default:
          return 'grey';
      }
  }
});

const toggle = ref(false);

const onProfile = async () => {
  await router.push({
    name: 'ProfileView',
    params: { id: props.client.id },
  });
};
</script>

<template>
  <div class="flex">
    <div class="client">
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
        <span :style="statusStyle" class="status">
          {{ props.channelUserRank }} {{ props.channelUserStatus }}</span
        >
      </div>
    </div>
    <div class="dot" @click="toggle = !toggle">⋮</div>
  </div>

  <div v-if="props.client.id != userStore.id" v-show="toggle" class="popup">
    <span>
      <button class="button" @click="onProfile">Show Profile</button>
    </span>
    <span v-if="props.isOwner">
      <button class="button" @click="emits('updateAdmin', props.client.id)">
        Make Admin
      </button>
    </span>
    <span v-if="props.isAdmin || props.isOwner">
      <button class="button" @click="emits('banUser', props.client.id)">
        Ban User
      </button>
    </span>
    <span v-if="props.isAdmin || props.isOwner">
      <button class="button" @click="emits('muteUser', props.client.id)">
        Mute User
      </button>
    </span>
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
}

.username {
  color: var(--main-2-color);
  font-size: var(--main-small-font-size);
  font-stretch: expanded;
}

.status {
  font-size: var(--main-small-font-size);
  color: var(--main-4-color);
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
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.5vw;
  border-color: transparent; */
  margin-top: 2px;
}
</style>
