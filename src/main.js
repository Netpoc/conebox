import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import '../styles.css'

//Ant Deesign
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
  })

import router from './router'

createApp(App).use(router).use(Antd).use(vuetify).mount('#app')
