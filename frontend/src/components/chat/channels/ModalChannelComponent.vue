<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { socket } from '@/service/socket';
import type { Channel } from '@/store/message';
import { useI18n } from 'vue-i18n';

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
    <div class="modal-header">
      <div class="modal-content">
        {{ useI18n().t('joincreatechannel')
        }}<span class="close" @click="closeCancel()">&times;</span>
      <label>{{ useI18n().t('name') }}</label>
      <input id="mytext" v-model="channelName" class="inputField" type="text" />
      <label>{{ useI18n().t('password') }}</label>
      <input v-model="password" class="inputField" type="password" />
      <br />
      <button class="ok" @click="closeOk()">
        {{ useI18n().t('confirm') }}
      </button>
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
  z-index: 800; /* Sit on top */
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

.inputField {
  font-family: 'Mountains of Christmas', cursive;
  color: black;
  width: 60%;
  border-radius: 5px;
  border-color: transparent;
}

input,
label {
  font-family: 'Mountains of Christmas', cursive;
  margin: 0.4rem 0;
  color: white;
  /* text-align-last: center; */
}

input[type='file']::file-selector-button {
  font-family: 'Mountains of Christmas', cursive;
  opacity: 0;
  width: 0%;
  display: inline-block;
  vertical-align: middle;
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
