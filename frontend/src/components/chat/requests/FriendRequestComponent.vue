<script setup lang="ts">
import type { User } from '@/store/user';
import { useUserStore, AllowedUpdateFriendshipMethod } from '@/store/user';

const props = defineProps<{
  client: User;
}>();

const userStore = useUserStore();

const acceptButton = async () => {
  await userStore.updateFriendship(
    AllowedUpdateFriendshipMethod.ACCEPT,
    props.client.id,
  );
};

const declineButton = async () => {
  await userStore.updateFriendship(
    AllowedUpdateFriendshipMethod.DECLINE,
    props.client.id,
  );
};
</script>

<template>
  <div class="requestParent">
    <div class="infoBox">
      <img class="picture" alt="user picture" :src="client.picture" />
      <span class="sender">
        {{ client.username }}
        <span class="requestText"><br />has send a friend request</span>
      </span>
    </div>
    <div class="buttonBox">
      <button class="acceptButton" @click="acceptButton">Accept</button>
      <button class="declineButton" @click="declineButton">Decline</button>
    </div>
  </div>
</template>

<style scoped>
.requestParent {
  display: flex;
  flex-direction: column;
  padding-top: 1%;
}
.infoBox {
  display: flex;
  font-size: 0.8vw;
}
.sender {
  color: white;
}

.requestText {
  color: grey;
  font-stretch: expanded;
}

.buttonBox {
  display: flex;
  padding: 0.2vw 0.2vw 0.5vw;
}

.acceptButton {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent;
  margin-right: 1vw;
}

.declineButton {
  text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: #202020;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent;
  margin-left: 1vw;
}

.picture {
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 50%;
  object-position: 50% 0;
  border: 1px solid;
  object-fit: cover;
  margin-right: 0.2vw;
}
</style>
