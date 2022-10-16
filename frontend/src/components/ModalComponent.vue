<script setup lang="ts">
import { ref } from 'vue';

type CallbackFunction = (key: string) => void;

const props = defineProps<{
  heading: string;
  text: string;
  callback: CallbackFunction;
}>();

const active = ref(true);

function close() {
  active.value = false;
  props.callback(props.text);
}
</script>

<template>
  <div v-if="active == true" class="modal">
    <div class="modal-content">
      <span class="close" @click="close()">&times;</span>
      <h1>{{ heading }}</h1>
      <p>{{ text }}</p>
      <button @click="close()">OK</button>
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
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  color: black;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
