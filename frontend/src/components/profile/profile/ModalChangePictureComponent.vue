<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useErrorStore } from '@/store/error';
const emits = defineEmits(['close']);

const userStore = useUserStore();
const errorStore = useErrorStore();

const file = ref<HTMLInputElement | null>(null);

async function uploadPicture() {
  if (file.value?.files) {
    try {
      await userStore.uploadPicture(file.value.files[0]);
    } catch (error) {
      errorStore.setError((error as Error).message);
      return;
    }
    emits('close');
  }
}

function closeCancel() {
  emits('close');
}
</script>

<template>
  <div class="modal" @keyup.enter="uploadPicture()">
    <div class="modal-content">
      <h1>
        Change Profile Picture<span class="close" @click="closeCancel()"
          >&times;</span
        >
      </h1>
      <label>new Picture</label>
      <input ref="file" name="picture" type="file" accept="image/*" />
      <br />
      <button class="ok" @click="uploadPicture">upload picture</button>
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
  cursor: pointer;
}
</style>
