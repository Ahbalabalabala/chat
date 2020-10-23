import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vantConfig from './vant.config.js'
import WebIM from './utils/WebIM'
Vue.prototype.WebIM = WebIM

// 使用Vue 插件语法将按需引入的Vant组件全局注册到Vue中
Vue.use(vantConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
