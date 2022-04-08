import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

let app = createApp(App)
app.use(store)
app.use(router)
//全局绑定函数
app.config.globalProperties.$moment = moment;

app.mount('#app')
