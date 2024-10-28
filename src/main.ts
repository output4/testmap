import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import App from './App';
import router from './router';
import i18n from '@/langs/locale';
const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(createVuetify());
app.use(router);

app.mount('#app');
