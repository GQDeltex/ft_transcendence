<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import ChannelUserService from '@/service/ChannelUserService';
import { useErrorStore } from '@/store/error';
const emits = defineEmits(['close']);
const errorStore = useErrorStore();

let channelName: Ref<string> = ref('');
let password: Ref<string> = ref('');

async function closeOk() {
  console.log(
    'channelName= ' + channelName.value + ' password= ' + password.value, //DEBUG
  );
  try {
    await ChannelUserService.updatePassword(channelName.value, password.value);
    console.log(channelName.value + ' password is now ' + password.value); //DEBUG
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
  channelName.value = '';
  password.value = '';
  emits('close');
}

function closeCancel() {
  channelName.value = '';
  password.value = '';
  emits('close');
}
</script>

<template>
  <div class="modal" @keyup.enter="closeOk()">
    <div class="modal-content">
      <h1>
        Change Password<span class="close" @click="closeCancel()">&times;</span>
      </h1>
      <label>Name</label>
      <input v-model="channelName" type="text" />
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
  z-index: 998; /* Sit on top */
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