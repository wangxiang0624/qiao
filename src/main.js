import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import jsbridge from './util/jsbridge.js'

const app = createApp(App);
app.config.globalProperties.$jsbridge = jsbridge;

app.use(router).mount('#app');
