<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/user';

const emits = defineEmits(['close']);

const userStore = useUserStore();

const file = ref<HTMLInputElement | null>(null);

async function uploadPicture() {
  if (file.value?.files) {
    await userStore.uploadPicture(file.value.files[0]);
    emits('close');
  }
}

async function resetPicture() {
  await userStore.resetPicture();
  emits('close');
}

function closeCancel() {
  emits('close');
}
</script>

<template>
  <div class="modal" @keyup.enter="uploadPicture">
    <div class="modal-dialog">

    <div class="modal-content">
      <span class="modal-header">
        Change Profile Picture
        <span class="close" @click="closeCancel">&times;</span>
      </span>

      <div>
        <label class="buttonLabel" for="picUpload"
          >Click here to choose file</label
        >
        <br />
        <input
          id="picUpload"
          ref="file"
          class="fileSelect"
          name="picture"
          type="file"
          accept="image/*"
        />
      </div>
      <button class="ok" @click="uploadPicture">Upload picture</button>
      <br />
      <button class="ok" @click="resetPicture">Reset picture</button>
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
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
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
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 850px) {
  .modal-content {
    width: 100%;
    /* padding-top: 20%; */
    padding-left: 30%;
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
  right: 27vw;
  top: 26.5vw;
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

input, label {
  font-family: 'Mountains of Christmas', cursive;
  margin: 0.4rem 0;
  color: white;
  /* text-align-last: center; */
}

input[type="file"]::file-selector-button{
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
  width: 60%;
  color: #c00000;
  background-color: white;
  cursor: pointer;
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
