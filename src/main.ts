import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import filters from './filters'
import ElementPlus from 'element-plus'
import EN from 'element-plus/es/locale/lang/en'
import 'element-plus/dist/index.css'
import './styles/tailwindcss.css'

const app = createApp(App)

app.config.globalProperties.$filters = filters
app.provide('route', router)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: EN, size: 'default' })

app.mount('#app')
