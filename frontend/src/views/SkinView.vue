<script setup lang="ts">
import SkinShopComponent from '../components/skinShop/ParentSkinShopComponent.vue';
import type { Item } from '@/store/user';
import { onMounted, ref } from 'vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';

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
  <!-- <div class="header">
    <button class="button">Profile Pictures</button>
    <button class="button button-wide">Maps</button>
    <button class="button">Sounds</button>
  </div> -->
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
  color: white;
  background-color: #c00000;
  padding: 10px;
  margin: 20px;
  border: none;
  font-weight: bolder;
}

.button-wide {
  width: 40%;
}
</style>
