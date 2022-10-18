<script setup lang="ts">
import RequestChatComponent from './RequestChatComponent.vue';
</script>

<template>
  <div class="requestsParent">
    <span class="text">Requests</span>
    <div class="list">
      <RequestChatComponent
        key="4242"
        :client-id="4242"
        sender="Guillaume"
        request="has send a friend request"
        target=""
      />
      <RequestChatComponent
        key="4242"
        :client-id="4242"
        sender="Henne"
        request="has invited you to play a game"
        target=""
      />
      <RequestChatComponent
        key="4242"
        :client-id="4242"
        sender="René"
        request="has invited you to join the channel"
        target="SecretChannel"
      />
      <RequestChatComponent
        key="4242"
        :client-id="4242"
        sender="Vinny"
        request="has invited you to play a game"
        target=""
      />
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
  /* display: flex; */
  font-size: 1vw;
  padding-bottom: 0.5vw;
  color: #f8971d;
  /* justify-content: space-between; */
}
.list {
  /* max-height: 25vh; */
  overflow-y: scroll;
  padding-left: 5%;
}
</style>
