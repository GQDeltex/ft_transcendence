<script setup lang="ts">
import PayButtonComponent from '@/components/skinShop/PayPalButtonComponent.vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import type { Item } from '@/store/user';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const props = defineProps<{
  item: Item;
}>();

const itemNameText = computed(() => {
  switch (props.item.name) {
    case 'Christmas map':
      return useI18n().t('christmasmap');
    case 'Red map':
      return useI18n().t('redmap');
    case 'Yellow map':
      return useI18n().t('yellowmap');
    case 'Blue ball':
      return useI18n().t('blueball');
    case 'Christmas ball':
      return useI18n().t('christmasball');
    case 'Yellow ball':
      return useI18n().t('yellowball');
    case 'Sugar Cane':
      return useI18n().t('sugarcane');
    default:
      return props.item.name;
  }
});
</script>

<template>
  <div class="parent">
    <RoundPictureComponent
      :picture="item.picture"
      size="100px"
      border-color="transparent"
      class="roundPic"
    />
    <span class="item-name">{{ itemNameText }}</span>
    <span class="item-price">{{ item.price }}€</span>
    <PayButtonComponent :item="item" class="payPal" />
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
