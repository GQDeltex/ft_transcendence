<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import UserService from '@/service/UserService';
import { useUserStore } from '@/store/user';
import { useErrorStore } from '@/store/error';
const emits = defineEmits(['close']);

let outputUsername: Ref<string> = ref('');
const userStore = useUserStore();
const errorStore = useErrorStore();

const props = defineProps<{
  userId: number;
  inputUsername: string;
}>();

async function closeOk() {
  try {
    userStore.username = (
      await UserService.changeUsername(outputUsername.value)
    ).username;
  } catch (error) {
    errorStore.setError((error as Error).message);
    return;
  }
  outputUsername.value = '';
  emits('close');
}

function closeCancel() {
  outputUsername.value = '';
  emits('close');
}
</script>

<template>
  <div class="modal" @keyup.enter="closeOk()">
    <div class="modal-content">
      <h1>
        Change Username<span class="close" @click="closeCancel()">&times;</span>
      </h1>
      <label>new Username</label>
      <input
        v-model="outputUsername"
        type="text"
        :placeholder="props.inputUsername"
      />
      <br />
      <button class="button" @click="closeOk()">OK</button>
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
</style>
