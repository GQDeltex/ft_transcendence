<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { socket } from '@/service/socket';
import { useMessagesStore } from '@/store/message';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import type { Channel, Message } from '@/store/message';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const messagesStore = useMessagesStore();
const props = defineProps<{
  currentChannel: Channel;
}>();

let text: Ref<string> = ref('');
const { messages } = storeToRefs(messagesStore);

async function scrollToBottom() {
  const container: HTMLElement | null = document.getElementById('container');
  if (container === null) return;
  await nextTick();
  container.scrollTop = container.scrollHeight;
}

async function sendMsg() {
  if (text.value == '') return;
  socket.emit('prc', {
    to: { id: props.currentChannel.id, name: props.currentChannel.name },
    msg: text.value,
  });
  messagesStore.saveMessage({
    from: { id: +userStore.id, name: userStore.username },
    to: { id: +props.currentChannel.id, name: props.currentChannel.name },
    msg: text.value,
    isNew: false,
  });
  text.value = '';
  await scrollToBottom();
}

watch(
  [() => props.currentChannel.name, () => [...messages.value]],
  async () => {
    await scrollToBottom();
  },
);

function correctMessage(message: Message) {
  // If message belongs to a channel, also check the name
  if (
    message.to.name.startsWith('#') &&
    message.to.name != props.currentChannel.name
  )
    return false;
  return (
    message.to.id === props.currentChannel.id ||
    (message.from.id === props.currentChannel.id &&
      message.to.id === userStore.id)
  );
}

watch(
  () => [...messagesStore.notifiedList],
  () => {
    if (messagesStore.notifiedList.includes(props.currentChannel.name))
      messagesStore.notifiedList = messagesStore.notifiedList.filter(
        (name) => name !== props.currentChannel.name,
      );
  },
);
</script>

<template>
  <div class="parent">
    <span class="chatName"
      >{{ useI18n().t('chat') }}: {{ props.currentChannel.name }}</span
    >
    <div id="container" class="messages">
      <template v-for="message in messages">
        <span
          v-if="correctMessage(message)"
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
        @keyup.enter="sendMsg"
      />
      <button class="sendButton" @click="sendMsg">
        {{ useI18n().t('send') }}
      </button>
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
.chatName {
  color: #c00000;
  padding: 1vw;
  font-size: 2vw;
}

.messages {
  height: 100%;
  border-top: 1px solid gray;
  border-bottom: 1px solid grey;
  font-size: 2vw;
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
  font-size: 2vw;
  font-family: 'Mountains of Christmas', cursive;
}

.sendButton {
  font-family: 'Mountains of Christmas', cursive;
  text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  font-size: 2vw;
  border-color: transparent;
  cursor: pointer;
}
</style>
