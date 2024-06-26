import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import VueApexCharts from "vue3-apexcharts";
import '../styles.css'
import router from './router';

//Ant Design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

import App from './App.vue'

createApp(App).use(router).use(Antd).use(vuetify).use(VueApexCharts).mount('#app')
