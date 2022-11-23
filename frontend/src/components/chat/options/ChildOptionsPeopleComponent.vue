<script setup lang="ts">
import { computed, ref } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import { useRouter } from 'vue-router';
import type { User } from '@/store/user';
import { useUserStore } from '@/store/user';
import type { Channel } from '@/store/message';

const emits = defineEmits([
  'chat',
  'updateAdmin',
  'banUser',
  'muteUser',
  'kickUser',
]);

const props = defineProps<{
  client: User;
  isOwner: boolean;
  isAdmin: boolean;
  isClientAdmin: boolean;
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
        size="2vw"
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

  <div v-if="props.client.id !== userStore.id" v-show="toggle" class="popup">
    <button class="button" @click="onProfile">Show profile</button>

    <button
      v-if="props.isOwner"
      class="button"
      @click="emits('updateAdmin', props.client.id)"
    >
      {{ isClientAdmin ? 'Remove' : 'Make' }} admin
    </button>

    <button
      v-if="props.isAdmin || props.isOwner"
      class="button"
      @click="emits('banUser', props.client.id)"
    >
      Ban user
    </button>

    <button
      v-if="props.isAdmin || props.isOwner"
      class="button"
      @click="emits('muteUser', props.client.id)"
    >
      Mute user
    </button>

    <button
      v-if="props.isAdmin || props.isOwner"
      class="button"
      @click="emits('kickUser', props.client.id)"
    >
      Kick user
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

.button {
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
