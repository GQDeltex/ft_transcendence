<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useErrorStore } from '@/store/error';
import { socket } from '@/service/socket';

const emits = defineEmits(['close']);
const errorStore = useErrorStore();

let channelName: Ref<string> = ref('');
let banUser: Ref<string> = ref('');

async function closeOk() {
  console.log(
    'channelName= ' + channelName.value + ' admin= ' + banUser.value, //DEBUG
  );
  try {
    socket.emit('ban', {
      channelName: channelName.value,
      banID: +banUser.value,
    });
    console.log(channelName.value + ' has banned ' + banUser.value); //DEBUG
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
  channelName.value = '';
  banUser.value = '';
  emits('close');
}

function closeCancel() {
  channelName.value = '';
  banUser.value = '';
  emits('close');
}
</script>

<template>
  <div class="modal" @keyup.enter="closeOk()">
    <div class="modal-content">
      <h1>Ban User<span class="close" @click="closeCancel()">&times;</span></h1>
      <label>Channel Name</label>
      <input v-model="channelName" type="text" />
      <label>User to ban</label>
      <input v-model="banUser" type="username" />
      <br />
      <button class="ok" @click="closeOk()">OK</button>
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
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
  cursor: pointer;
}
</style>
