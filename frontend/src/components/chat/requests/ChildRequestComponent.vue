<script setup lang="ts">
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
      <button class="acceptButton" @click="acceptButton">Accept</button>
      <button class="declineButton" @click="declineButton">Decline</button>
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
  color: var(--main-2-color);
}

.requestText {
  color: var(--main-3-color);
  font-stretch: expanded;
}

.buttonBox {
  display: flex;
  padding: 0.2vw 0.2vw 0.5vw;
}

.acceptButton {
  text-decoration: none;
  border-radius: 5px;
  color: var(--main-bg-color);
  background-color: var(--main-1-color);
  cursor: pointer;
  font-size: var(--main-small-font-size);
  border-color: transparent;
  margin-right: 1vw;
}

.declineButton {
  text-decoration: none;
  border-radius: 5px;
  color: var(--main-2-color);
  background-color: var(--main-4-color);
  cursor: pointer;
  font-size: var(--main-small-font-size);
  border-color: transparent;
  margin-left: 1vw;
}
</style>
