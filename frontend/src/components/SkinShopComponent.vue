<script setup lang="ts">
defineProps<{
  itemName: string;
}>();
</script>

<template>
  <div>
    <ul>
      <li>
        <img
          class="item-pic"
          src="@/assets/sexy-guy-001-modified.png"
          width="100"
          height="100"
        />
      </li>
      <li>
        <span class="item-name">{{ itemName }}</span>
      </li>
      <li><span class="item-price">7$</span></li>
      <li><button>Buy</button></li>
    </ul>
  </div>
</template>

<style scoped>
div {
  border-top: 1px solid grey;
  border-bottom: 1px solid gray;
}
.item-price {
  text-decoration: none;
  color: gray;
  padding: 10px;
  margin: 10px;
}
.item-name {
  padding: 20px;
  text-decoration: none;
  color: grey;
}
button {
  height: 40px;
  width: 150px;
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  padding: 10px;
  margin: 10px;
}
li {
  display: inline;
}
</style>
