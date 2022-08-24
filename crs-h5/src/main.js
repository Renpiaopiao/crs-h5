import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import EelementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  //element-ui
import Vant from 'vant' //vant
import 'vant/lib/index.css';
import less from 'less'
import store from '@/store'

Vue.use(EelementUI)
Vue.use(Vant)
Vue.use(less)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
