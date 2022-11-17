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
    <div class="modal-content">
      <h1>
        Change Profile Picture
        <span class="close" @click="closeCancel">&times;</span>
      </h1>
      <div>
        <label class="picLabel" for="picUpload"
          >Click here to choose file</label
        >
        <input
          id="picUpload"
          ref="file"
          class="fileSelect"
          name="picture"
          type="file"
          accept="image/*"
        />
      </div>
      <!-- <div class="preview">
    <p>No files currently selected for upload</p>
  </div> -->
      <button class="ok" @click="uploadPicture">upload picture</button>
      <br />
      <button class="ok" @click="resetPicture">reset picture</button>
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
  background-image: url('@/assets/frosty_bg_frame.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: left;
  background-position-y: top;
  display: flex;
  flex-direction: column;
  justify-content: right;
  background-color: #112;
  margin: 25% auto; /* 15% from the top and centered */
  padding: 1vw;
  /* border: 1px solid grey; */
  width: 500px;
  height: 350px;
  /* Could be more or less, depending on screen size */
  color: #c00000;
  opacity: 80%;
}
.modal-content label {
  padding-top: 10%;
  padding-bottom: 5%;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
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
  width: 30%;
}

.fileSelect {
  font-family: 'Mountains of Christmas', cursive;
  opacity: 0;
  width: 0%;
}
.picLabel {
  font-family: 'Mountains of Christmas', cursive;
  display: inline-block;
  /* line-height: 2.2em; */
  padding: 0 0.62em;
  /* border: 1px solid #666; */
  border-radius: 5px;
  height: 20%;
  width: 30%;

  /* text-decoration: none; */
  /* border-radius: 3px; */
  color: white;
  background-color: #c00000;
  cursor: pointer;
  /* font-size: 0.5vw; */
  border-color: transparent;
  /* margin-top: 1px; */
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
