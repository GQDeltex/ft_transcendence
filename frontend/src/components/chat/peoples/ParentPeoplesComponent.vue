<script setup lang="ts">
import ChildPeopleComponent from './ChildPeopleComponent.vue';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';

defineProps<{
  clients: {
    id: number;
    title: [string];
    username: string;
    picture: string;
    status: string;
  }[];
}>();

const userStore = useUserStore();
const friendToggle = ref(false);
const blockToggle = ref(false);
const peopleToggle = ref(false);
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
              userStore.friends.some((friend) => friend.id === client.id)
            "
            :client="client"
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
              !userStore.friends.some((friend) => friend.id === client.id)
            "
            :client="client"
          />
        </template>
      </div>
      <div class="subheader" @click="blockToggle = !blockToggle">Blocked ▾</div>
      <div v-show="blockToggle" class="people">
        <template v-for="client in clients" :key="client.id">
          <ChildPeopleComponent
            v-if="client.id !== userStore.id"
            :client="client"
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
  border: 1px solid #202020;
}

.text {
  font-size: 1vw;
  padding-bottom: 0.5vw;
  color: #f8971d;
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
