import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:7231';
axios.interceptors.response.use(response => response.data)

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
