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
  margin-left: 10%;
  margin-right: 10%;
  /* justify-content: space-between; */
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 10px;
  overflow-y: scroll;
}

.item-name {
  text-decoration: none;
  color: grey;
  width: 20%;
  padding: 10px;
  grid-column: 2/3;
}

.item-price {
  text-decoration: none;
  color: gray;
  width: 50%;
  padding: 10px;
  grid-column: 3/4;
}

.roundPic {
  grid-column: 1/2;
}

.payPal {
  grid-column: 4/5;
}
</style>
