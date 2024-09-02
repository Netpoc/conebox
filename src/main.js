import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import VueApexCharts from "vue3-apexcharts";
import '../styles.css'
import router from './router';
import store from './store';

import { registerLicense } from '@syncfusion/ej2-base';
registerLicense("ORg4AjUWIQA/Gnt2UVhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5UdEdiXX1dc3NWRGlU");

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

createApp(App).use(router).use(Antd).use(vuetify).use(VueApexCharts).use(store).mount('#app')
