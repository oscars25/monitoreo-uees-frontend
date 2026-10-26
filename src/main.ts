import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'      // ⚠️ Cambiar /src/App.vue → ./App.vue
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')