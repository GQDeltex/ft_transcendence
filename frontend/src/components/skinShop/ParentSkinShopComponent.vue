<script setup lang="ts">
import PayButtonComponent from '@/components/skinShop/PayPalButtonComponent.vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import type { Item } from '@/store/user';

defineProps<{
  item: Item;
}>();
</script>

<template>
  <div class="parent">
    <RoundPictureComponent
      :picture="item.picture"
      size="100px"
      border-color="transparent"
      class="roundPic"
    />
    <span class="item-name">{{ item.name }}</span>
    <span class="item-price">{{ item.price }}€</span>
    <PayButtonComponent :item="item" class="payPal"/>
  </div>
</template>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  margin-left: 10%;
  margin-right: 10%;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 10px;
  overflow-y: scroll;
}
.roundPic {
  grid-column: 1/2;
}
.item-name {
  text-decoration: none;
  color: white;
  padding: 10px;
  grid-column: 2/3;
  text-align: left;
}

.item-price {
  text-decoration: none;
  color: white;
  padding: 10px;
  grid-column: 3/4;
  text-align: left;
}
.payPal {
  grid-column: 5/6;
}
</style>
