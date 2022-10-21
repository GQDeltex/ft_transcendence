<script setup lang="ts">
import PayButtonComponent from '@/components/skinShop/PayPalButtonComponent.vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';

defineProps<{
  itemId: string;
  itemImg: string;
  itemName: string;
}>();
</script>

<template>
  <div class="parent">
    <RoundPictureComponent
      :picture="itemImg"
      size="100px"
      border-color="transparent"
    />
    <span class="item-name">{{ itemName }}</span>
    <span class="item-price">7$</span>
    <PayButtonComponent :id="itemId" price="7" />
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
</style>
