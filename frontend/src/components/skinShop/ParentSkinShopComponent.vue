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
    />
    <span class="item-name">{{ item.name }}</span>
    <span class="item-price">{{ item.price }}€</span>
    <PayButtonComponent :item="item" />
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--main-3-color);
  padding: 10px;
}

.item-name {
  text-decoration: none;
  color: var(--main-3-color);
  width: 50%;
  padding: 10px;
}

.item-price {
  text-decoration: none;
  color: var(--main-3-color);
  width: 20%;
  padding: 10px;
}
</style>
