<script setup lang="ts">
import { useI18n } from 'vue-i18n';
defineProps<{
  clientId: number;
  sender: string;
  request: string;
  target: string;
}>();

const acceptButton = async () => {
  console.log('accept button pressed');
};

const declineButton = async () => {
  console.log('decline button pressed');
};
</script>

<template>
  <div class="requestParent">
    <div class="infoBox">
      <span class="sender">
        {{ sender }}
        <span class="requestText">{{ request }}</span>
        {{ target }}
      </span>
    </div>
    <div class="buttonBox">
      <button class="acceptButton" @click="acceptButton">
        {{ useI18n().t('accept') }}
      </button>
      <button class="declineButton" @click="declineButton">
        {{ useI18n().t('decline') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.requestParent {
  display: flex;
  flex-direction: column;
  padding-top: 1%;
}
.infoBox {
  display: flex;
  font-size: 0.8vw;
}
.sender {
  color: white;
}

.requestText {
  color: grey;
  font-stretch: expanded;
}

.buttonBox {
  display: flex;
  padding: 0.2vw 0.2vw 0.5vw;
}

.acceptButton {
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent;
  margin-right: 1vw;
}

.declineButton {
  text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: #202020;
  cursor: pointer;
  font-size: 0.8vw;
  border-color: transparent;
  margin-left: 1vw;
}
</style>
