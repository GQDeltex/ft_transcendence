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
  <div v-if="active === true" class="modal">
    <div class="modal-content">
      <span class="modal-header"
        >{{ heading }}<span class="close" @click="close()">&times;</span></span
      >
      <p>{{ text }}</p>
      <button class="ok" @click="close()">OK</button>
    </div>
  </div>
</template>

<style scoped>
.modal-header {
  font-size: 2.7vw;
  margin: 0;
}

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 900; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-image: url('@/assets/frosty_bg_frame.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: left;
  background-position-y: top;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: inherit;
  background-color: #112;
  margin: 25% auto; /* 15% from the top and centered */
  /* padding-top: 5%; */
  padding-left: 15%;
  width: 50%;
  aspect-ratio: 4/3;
  color: #c00000;
  opacity: 80%;
  position: absolute;
  top: -15vw;
  left: 25vw;
}
/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 850px) {
  .modal-content {
    width: 100%;
    padding-left: 30%;
    top: 0vw;
    left: 0vw;
  }
  .modal-content .close {
    position: fixed;
    right: 5vw;
    top: 30vw;
  }
}
.modal-content h1 {
  font-size: 1.5vw;
  margin: 0;
}
/* The Close Button */
.close {
  font-size: 2.7vw;
  color: white;
  float: right;
  font-size: 2vw;
  font-weight: bold;
  cursor: pointer;
  position: fixed;
  right: 26vw;
  top: 11.5vw;
}

.close:hover,
.close:focus {
  color: #c00000;
  text-decoration: none;
}
.ok {
  font-family: 'Mountains of Christmas', cursive;
  cursor: pointer;
  width: 60%;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  cursor: pointer;
  border-color: transparent;
  margin-bottom: 1%;
}

/* Add Animation */
.modal-content,
#caption {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
