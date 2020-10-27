import Vue from 'vue'
import App from './App.vue'
import router from './router'
import WebIM from './utils/WebIM'
import store from './store'
import vantConfig from './vant.config.js'
Vue.prototype.WebIM = WebIM

// 使用Vue 插件语法将按需引入的Vant组件全局注册到Vue中
Vue.use(vantConfig)

Vue.config.productionTip = false

window.Vue = new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 自动登录
    
    let userInfo = localStorage.getItem('userInfo')
    // console.log(userInfo);
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      // console.log(userInfo);
      // 自动登录
      // console.log('自动登录')

      store.dispatch('onAutoLoginUser', userInfo)
    }
    
  }
}).$mount('#app')



router.beforeEach((to, from, next) => {
  // 登录验证
  // 先判断用户是否已经登录

  if(to.path==='/nearby'||to.path==='/login'||store.state.login.username){
    next()
  }else{
    next('/login')
  }
})

// router.push('/login')


