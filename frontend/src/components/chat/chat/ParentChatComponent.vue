<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { socket } from '@/service/socket';
import { useMessagesStore } from '@/store/message';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const messagesStore = useMessagesStore();
const props = defineProps<{
  chatName: string;
}>();

let text: Ref<string> = ref('');
const { messages } = storeToRefs(messagesStore);

/*function scrollToBottom() {
  const container = document.getElementById('container');
  if (container == null) return;
  container.scrollTop = container.scrollHeight;
}*/

function sendMsg() {
  if (text.value == '') return;
  // console.log(props.chatName, text.value);
  socket.emit('prc', { to: props.chatName, msg: text.value });
  messagesStore.saveMessage({
    from: { id: +userStore.id, name: userStore.username },
    to: { name: props.chatName },
    msg: text.value,
  });
  text.value = '';
}

//onUnmounted(() => socket.off('prc'));
</script>

<template>
  <div class="parent">
    <span class="chatname">chat: {{ props.chatName }}</span>
    <div id="container" class="messages">
      <template v-for="message in messages">
        <span
          v-if="
            message.to.name === props.chatName ||
            (message.from.name === props.chatName &&
              message.to.name === userStore.username)
          "
          :key="`msg_${message.from.name}_${message.to.name}_${message.msg}`"
          >{{ message.from.name }}: {{ message.msg }}<br
        /></span>
      </template>
    </div>
    <div class="lower">
      <input
        v-model="text"
        alt="inputBox"
        type="text"
        class="text"
        @keyup.enter="sendMsg()"
      />
      <button class="sendbutton" @click="sendMsg()">Send</button>
    </div>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  height: inherit;
  width: 60vw;
}
.chatname {
  color: #c00000;
  padding: 1vw;
  font-size: 1vw;
}
.messages {
  height: 100%;
  border-top: 1px solid gray;
  border-bottom: 1px solid grey;
  font-size: 1vw;
  padding: 0.5vw;
  overflow-y: scroll;
  overflow-wrap: break-word;
  color: white;
}
.lower {
  display: flex;
  width: 100%;
}
.text {
  flex-grow: 1;
  font-size: 1vw;
}
.sendbutton {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #c00000;
  font-size: 1vw;
  border-color: transparent;
  cursor: pointer;
}
</style>
