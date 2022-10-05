<script setup lang="ts">
defineProps<{
  chatName: string;
}>();
</script>

<template>
  <div class="parent">
    <span class="chatname">{{ chatName }}</span>
    <span class="messages">here the messages will be displayed</span>
    <div class="lower">
      <input type="text" width="10" />
      <button class="sendbutton">Send</button>
    </div>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  background-color: #202020;
  align-items: center;
}
.chatname {
  color: #f8971d;
  margin-left: 9px;
  margin-right: 9px;
  margin-top: 9px;
  margin-bottom: 9px;
  background-color: black;
}
.messages {
  margin-left: 9px;
  margin-right: 9px;
  background-color: black;
}
.lower {
  margin-left: 9px;
  margin-right: 9px;
  margin-top: 9px;
  margin-bottom: 9px;
  background-color: black;
}
</style>
