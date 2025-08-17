import Vue from "vue";
import App from "./App.vue";
import TDesign from 'tdesign-vue';

// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';

import router from '@/router/index.js'

Vue.use(TDesign);

new Vue({ router: router, render: (h) => h(App) }).$mount("#app")