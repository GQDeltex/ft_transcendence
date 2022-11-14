<script setup lang="ts">
const emits = defineEmits(['close']);

const props = defineProps<{
  items: string[];
}>();

const itemSelected = (item: string) => {
  // console.log('selected item: ', item);
  emits('close', item);
};
</script>

<template>
  <div class="subMenu fade">
    <div v-for="(item, i) in props.items" :key="i" class="menuItem">
      <div class="subItem" @click="itemSelected(item)">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.subMenu {
  position: fixed;
  z-index: 800; /* Sit on top */
  background-color: white;
  left: inherit;
  top: inherit;
  width: 18vw;
  height: 6vw;
  overflow: auto; /* Enable scroll if needed */
  background-color: whitesmoke;
}

/* Modal Content/Box */
.menuItem {
  background-color: #fefefe;
  color: black;
  font-size: 1.5vw;
  cursor: pointer;
}

.menuItem.active,
.menuItem:hover {
  background-color: #f8971d;
  color: white;
}
</style>
