import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

// 1.引入axios，全局中使用
import axios from 'axios'
Vue.prototype.axios = axios

// 2.过滤器
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
});

// 3.全局的better-scroll
import Scroller from '@components/Scroller'
Vue.component("Scroller",Scroller);

// 4.Loading组件
import Loading from '@components/Loading'
Vue.component("Loading",Loading);



Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
