<script setup lang="ts">
const emits = defineEmits(['close']);

const props = defineProps<{
  items: string[];
  width: string;
  height: string;
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
  background-color: #123;
  width: v-bind(width);
  height: v-bind(height);
  left: inherit;
  top: inherit;
  overflow: auto; /* Enable scroll if needed */
  border: solid #fff6f9 1px;
}

/* Modal Content/Box */
.menuItem {
  color: #c00000;
  font-size: 1.5vw;
  cursor: pointer;
}

.subItem {
  display: flex;
  align-items: center;
  justify-content: center;
}
.menuItem.active,
.menuItem:hover {
  background-color: #c00000;
  color: white;
}
</style>
