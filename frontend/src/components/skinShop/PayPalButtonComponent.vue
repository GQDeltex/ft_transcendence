<template>
  <div v-if="!paid" :id="id" class="paypal-button"></div>
  <div v-else class="confirmation">Order complete!</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';

const props = defineProps({
  price: {
    type: String,
    default: '0.69',
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const paid = ref(false);

const paypalButton = window.paypal?.Buttons?.({
  style: {
    layout: 'horizontal',
    label: 'buynow',
    tagline: false,
    height: 40,
  },
  createOrder: createOrder,
  onApprove: onApprove,
});

async function createOrder(
  data: CreateOrderData,
  actions: CreateOrderActions,
): Promise<string> {
  console.log('Creating order...');
  return actions.order.create({
    purchase_units: [
      {
        reference_id: '1',
        amount: {
          value: props.price,
        },
      },
    ],
  });
}

async function onApprove(
  data: OnApproveData,
  actions: OnApproveActions,
): Promise<void> {
  console.log('Order approved...');
  return actions.order?.capture().then(() => {
    paid.value = true;
    console.log('Order complete!');
  });
}

onMounted(() => {
  paypalButton?.render('#' + props.id).catch((err) => {
    console.log(err);
  });
});

onUnmounted(() => {
  paypalButton?.close().catch((err) => {
    console.log(err);
  });
});
</script>

<style scoped>
.paypal-button {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
.confirmation {
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 1em;
  font-size: 2em;
}
</style>
