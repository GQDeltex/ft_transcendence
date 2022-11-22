<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user';

const emits = defineEmits(['close']);
const qrCode = ref('');
const code = ref('');
const userStore = useUserStore();

const submit = async () => {
  if (await userStore.enable2FA(code.value)) {
    emits('close');
  }
};

onMounted(async () => {
  qrCode.value = await userStore.generate2FA();
});

function closeCancel() {
  emits('close');
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <span class="modal-header">
        2 Factor Authentication
        <span class="close" @click="closeCancel">&times;</span>
      </span>
      <div class="qrCode">
        <img :src="qrCode" alt="qrCode" class="qrImage" />
      </div>
      <div class="input">
        <span>Please enter your 2FA code</span>
        <br />
        <input
          v-model="code"
          class="inputField"
          type="text"
          @keyup.enter="submit"
        /><br />
        <button class="ok" @click="submit">Submit</button>
      </div>
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
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
}

/* Modal Content/Box */
.qrImage {
  width: 50%;
  aspect-ratio: 1/1;
}
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
  width: 50%;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  cursor: pointer;
  border-color: transparent;
  margin-bottom: 1%;
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

.buttonLabel {
  font-family: 'Mountains of Christmas', cursive;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding-top: 2%;
  padding-bottom: 8%;
  padding-left: 2%;
  padding-right: 2%;
  border-radius: 5px;
  height: 10%;
  width: 50%;
  color: #c00000;
  background-color: white;
  cursor: pointer;
  border-color: transparent;
}

.inputField {
  font-family: 'Mountains of Christmas', cursive;
  color: black;
  width: 50%;
  border-radius: 5px;
  border-color: transparent;
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
