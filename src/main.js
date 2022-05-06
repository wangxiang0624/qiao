import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import jsbridge from './util/jsbridge.js'

const app = createApp(App);
app.config.globalProperties.$jsbridge = jsbridge;
window.address_a='测试全局变量'

let src = '//cdn.jsdelivr.net/npm/eruda';
document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');    



app.use(router).mount('#app');
