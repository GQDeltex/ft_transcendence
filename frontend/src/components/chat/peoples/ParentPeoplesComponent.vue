<script setup lang="ts">
import ChildPeopleComponent from './ChildPeopleComponent.vue';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import type { User } from '@/store/user';
import type { Channel } from '@/store/message';
const emits = defineEmits(['chat']);

const props = defineProps<{
  clients: User[];
  currentChannel: Channel;
}>();

const userStore = useUserStore();
const friendToggle = ref(true);
const blockToggle = ref(true);
const peopleToggle = ref(true);

const onChat = (username: string) => {
  emits('chat', username);
};

function userInChatWith(input: User) {
  if (input.username == props.currentChannel.name) return true;
  return false;
}
</script>

<template>
  <div class="friendsPeopleParent">
    <span class="text">People</span>
    <div class="scroll">
      <div class="subheader" @click="friendToggle = !friendToggle">
        Friends ▾
      </div>
      <div v-show="friendToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent
            v-if="
              client.id !== userStore.id &&
              userStore.friends.includes(client.id)
            "
            :client="client"
            :highlight="userInChatWith(client)"
            @chat="onChat"
          />
        </template>
      </div>
      <div class="subheader" @click="peopleToggle = !peopleToggle">
        People ▾
      </div>
      <div v-show="peopleToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent
            v-if="
              client.id !== userStore.id &&
              !userStore.friends.includes(client.id) &&
              !userStore.blocks.includes(client.id)
            "
            :client="client"
            :highlight="userInChatWith(client)"
            @chat="onChat"
          />
        </template>
      </div>
      <div class="subheader" @click="blockToggle = !blockToggle">Blocked ▾</div>
      <div v-show="blockToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent
            v-if="
              client.id !== userStore.id && userStore.blocks.includes(client.id)
            "
            :client="client"
            :highlight="false"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friendsPeopleParent {
  display: flex;
  flex-direction: column;
  padding: 0.5vw;
  border: 1px solid gray;
}

.text {
  font-size: 1vw;
  padding-bottom: 0.5vw;
  color: #c00000;
}

.scroll {
  overflow-y: scroll;
}

.subheader {
  cursor: pointer;
  font-size: 0.8vw;
  color: gray;
  font-weight: bold;
}
.people {
  padding-left: 5%;
}
</style>
