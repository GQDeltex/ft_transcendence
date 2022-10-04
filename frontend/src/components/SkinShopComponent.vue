<script setup lang="ts">
defineProps<{
  itemImg: string;
  itemName: string;
}>();
</script>

<template>
  <div class="parent">
    <img class="item-pic" :src="itemImg" width="100" height="100" />
    <span class="item-name">{{ itemName }}</span>
    <span class="item-price">7$</span>
    <button>Buy</button>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 10px;
}
.item-name {
  text-decoration: none;
  color: grey;
  width: 50%;
  padding: 10px;
}
.item-price {
  text-decoration: none;
  color: gray;
  width: 20%;
  padding: 10px;
}
button {
  height: 40px;
  width: 150px;
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  padding: 10px;
}
</style>
