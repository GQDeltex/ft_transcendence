<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { useErrorStore } from '@/store/error';
import { useUserStore } from '@/store/user';
import type { Item } from '@/store/user';

const props = defineProps<{
  item: Item;
}>();
const paypalButtonId = `paypal-button-${props.item.id}`;

const errorStore = useErrorStore();
const userStore = useUserStore();
const owned = ref(userStore.inventory.includes(props.item.id));

const createOrder = async (
  data: CreateOrderData,
  actions: CreateOrderActions,
) => {
  return actions.order.create({
    purchase_units: [
      {
        reference_id: String(props.item.id),
        custom_id: String(userStore.id),
        amount: {
          value: String(props.item.price),
        },
      },
    ],
  });
};

const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
  return actions.order?.capture().then(async () => {
    owned.value = true;
    await userStore.updateInventory(data.orderID);
  });
};

const onError = () => {
  errorStore.setError('Something went wrong with the payment.');
};

const paypalButton = window.paypal?.Buttons?.({
  style: {
    layout: 'horizontal',
    label: 'buynow',
    tagline: false,
    height: 40,
  },
  createOrder,
  onApprove,
  onError,
});

onMounted(async () => {
  try {
    await paypalButton?.render('#' + paypalButtonId);
  } catch {
    /* ignored */
  }
});

onUnmounted(async () => {
  try {
    await paypalButton?.close();
  } catch {
    /* ignored */
  }
  document.getElementById(paypalButtonId)?.remove();
});

const updateEquip = async () => {
  await userStore.updateEquippedItems(props.item.id);
};
</script>

<template>
  <div v-show="!owned" :id="paypalButtonId" class="paypal-button"></div>
  <button class="button" v-show="owned" @click="updateEquip">
    {{ userStore.isItemEquipped(item.id) ? 'Unequip' : 'Equip' }}
  </button>
</template>

<style scoped>
button {
  /* display: flex; */
  justify-content: center;
  margin: 30px 0;
  text-decoration: none;
  border-radius: 10px;
  color: white;
  /* overflow: hidden; */
  background-color: #c00000;
  padding: 10px;
  align-content: center;
  cursor: pointer;
  /* width:50%; */
  align-items: center;
  border: none;
  font-size: 1.3vw;
  font-weight: bolder;
  text-decoration: none;
}
.paypal-button {
  /* display: flex; */
  justify-content: center;
  margin: 30px 0;
}
</style>
