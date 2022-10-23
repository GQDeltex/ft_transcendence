<script setup lang="ts">
// import ChildRequestComponent from './ChildRequestComponent.vue';
import FriendRequestComponent from './FriendRequestComponent.vue';
import { useUserStore } from '@/store/user';
import type { User } from '@/store/user';

defineProps<{
  clients: User[];
}>();

const userStore = useUserStore();
</script>

<template>
  <div class="requestsParent">
    <span class="text">Requests</span>
    <div class="list">
      <template v-for="client in clients" :key="client.id">
        <FriendRequestComponent
          v-if="
            client.id !== userStore.id &&
            userStore.receivedFriendRequests.includes(client.id)
          "
          :client="client"
        />
      </template>
      <!--      <ChildRequestComponent-->
      <!--        key="4242"-->
      <!--        :client-id="4242"-->
      <!--        sender="René"-->
      <!--        request="has invited you to join the channel"-->
      <!--        target="SecretChannel"-->
      <!--      />-->
      <!--      <ChildRequestComponent-->
      <!--        key="4242"-->
      <!--        :client-id="4242"-->
      <!--        sender="Vinny"-->
      <!--        request="has invited you to play a game"-->
      <!--        target=""-->
      <!--      />-->
    </div>
  </div>
</template>

<style scoped>
.requestsParent {
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

.list {
  overflow-y: scroll;
  padding-left: 5%;
}
</style>
