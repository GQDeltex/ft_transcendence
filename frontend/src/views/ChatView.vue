<script setup lang="ts">
import ChatChatComponent from '../components/ChatChatComponent.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

const chatName: Ref<string> = ref('gucalvi');
</script>

<template>
  <input v-model="chatName" type="test" />
  <div class="parent">
    <ChatChatComponent :chat-name="chatName" class="chatchatcomp" />
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 2em;
}
.chatchatcomp {
  max-width: 80%;
}
</style>
