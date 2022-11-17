<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { socket } from '@/service/socket';
import type { Channel } from '@/store/message';

const emits = defineEmits(['close', 'join']);

let channelName: Ref<string> = ref('');
let password: Ref<string> = ref('');

function closeOk() {
  if (channelName.value.length > 0 && !channelName.value.startsWith('#')) {
    channelName.value = '#' + channelName.value;
  }
  console.log(channelName.value);
  socket.emit(
    'join',
    {
      channel: { name: channelName.value, password: password.value },
    },
    (channel: Channel) => {
      emits('join', channel);
    },
  );
  channelName.value = '';
  password.value = '';
  // emits('close');
}

function closeCancel() {
  channelName.value = '';
  password.value = '';
  emits('close');
}

onMounted(() => {
  const element = document.getElementById('mytext');
  if (element != null) element.focus();
});
</script>

<template>
  <div class="modal" @keyup.enter="closeOk()">
    <div class="modal-content">
      <h1>
        Join / Create Channel<span class="close" @click="closeCancel()"
          >&times;</span
        >
      </h1>
      <label>Name</label>
      <input id="mytext" v-model="channelName" type="text" />
      <label>Password</label>
      <input v-model="password" type="password" />
      <br />
      <button class="ok" @click="closeOk()">OK</button>
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 800; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 2vw;
  border: 1px solid #888;
  width: 25%; /* Could be more or less, depending on screen size */
  color: black;
}
.modal-content label {
  padding-top: 10%;
  padding-bottom: 5%;
}
.modal-content h1 {
  font-size: 1.5vw;
  margin: 0;
}
/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 2vw;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}
.ok {
  font-family: 'Mountains of Christmas', cursive;
  cursor: pointer;
}
</style>
