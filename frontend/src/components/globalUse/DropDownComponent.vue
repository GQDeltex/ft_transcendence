<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  items: string[];
}>();

const isOpen = ref(true);

function close() {
  isOpen.value = false;
}
const itemSelected = (item: string) => {
  console.log('selected item: ', item);
};
</script>

<template>
  <!-- <div class="menuItem">
    <a >{{title}}</a>
  </div> -->

  <div v-if="isOpen" class="subMenu fade">
    <div v-for="(item, i) in items" :key="i" class="menuItem">
      <div class="subItem" @click="itemSelected(item)">{{ item }}</div>
    </div>
  </div>

  <!-- <div v-if="active === true" class="modal">
    <div class="modal-content">
      <span class="close" @click="close()">&times;</span>
      <h1>{{ heading }}</h1>
      <p>{{ text }}</p>
      <button @click="close()">OK</button>
    </div>
  </div> -->
</template>

<style scoped>
.subMenu {
  position: relative;
  z-index: 900; /* Sit on top */
  background-color: white;
  /* top: calc(100% + 15px); */
  /* transform: translateX(-50%); */
  /* width: max-content; */
  left: 0;
  top: 0;
  width: 18vw;
  height: 6vw;
  overflow: auto; /* Enable scroll if needed */
  background-color: whitesmoke;
  /*background-color: rgb(0, 0, 0); /* Fallback color */
  /*background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.menuItem {
  background-color: #fefefe;
  /*margin: 15% auto; /* 15% from the top and centered */
  /* padding: 20px; */
  border: 1px solid #888;
  /*width: 20%; /* Could be more or less, depending on screen size */
  color: black;
  font-size: 1.5vw;
  cursor: pointer;
}

.menuItem.active,
.menuItem:hover {
  background-color: #f8971d;
  color: white;
}
/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}



.subMenu-enter-active,
.subMenu-leave-active {
  transition: all 0.5s ease-out;
}

.subMenu-enter,
.subMenu-leave-to {
  opacity: 0;
}
</style>
