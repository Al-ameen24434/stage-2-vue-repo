import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/main.css';
import App from './App.vue';
import router from './router';
import { initializeTestData } from './lib/initTestData';

// Initialize test data
initializeTestData();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast);

app.mount('#app');
