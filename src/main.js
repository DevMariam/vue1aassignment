// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Adjust the path as necessary

createApp(App)
  .use(router)
  .mount('#app');
