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
      <div class="qrCode">
        <img :src="qrCode" alt="qrCode" />
        <span class="button cancel" @click="closeCancel">&times;</span>
      </div>
      <div class="input">
        <span>Please enter your 2FA code</span>
        <br />
        <input v-model="code" type="text" @keyup.enter="submit" />
        <br />
        <button class="button" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 40%; /* Could be more or less, depending on screen size */
  color: black;
  text-align: center;
}

/* .button {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  margin: 10px;
} */

.button:hover,
.button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.cancel {
  float: right;
  margin: 0;
}
</style>
