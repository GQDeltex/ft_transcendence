<script setup lang="ts">
import SkinShopComponent from '../components/skinShop/ParentSkinShopComponent.vue';
import type { Item } from '@/store/user';
import { onMounted, ref } from 'vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import { useI18n } from 'vue-i18n';

const errorStore = useErrorStore();
const items = ref<Item[]>([]);

onMounted(async () => {
  try {
    items.value = await UserService.getItems();
  } catch (error) {
    errorStore.setError((error as Error).message);
  }
});
</script>

<template>
  <div class="header">
    <button class="button">{{ useI18n().t('profilepictures') }}</button>
    <button class="button button-wide">{{ useI18n().t('maps') }}</button>
    <button class="button">{{ useI18n().t('sounds') }}</button>
  </div>
  <template v-for="item in items" :key="item.id">
    <SkinShopComponent :item="item" />
  </template>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
}

.button {
  height: 40px;
  width: 25%;
  text-decoration: none;
  border-radius: 5px;
  border-color: black;
  color: black;
  background-color: red;
  padding: 10px;
  margin: 20px;
}

.button-wide {
  width: 40%;
}
</style>
