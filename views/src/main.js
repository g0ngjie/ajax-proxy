import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import "./index.scss"
Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
