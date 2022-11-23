import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { loadScript } from '@paypal/paypal-js';
import { i18n } from './plugin/i18n';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

// Load paypal SDK
loadScript({
  'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: 'EUR',
}).catch((err) => {
  console.log(err);
});

app.mount('#app');
