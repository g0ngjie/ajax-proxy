import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import '@/common/element-plugin'
import i18n from "@/lang/index";

Vue.prototype.$ELEMENT = { size: 'mini' };
import "./index.scss"

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
