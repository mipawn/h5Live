// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/js/rem.js'

// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import { Toast, Icon } from 'vant'
import 'vant/lib/index.css'

// require styles
import 'swiper/dist/css/swiper.css'

import service from '@/utils/request'

// Vue.use(ElementUI)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$http = service

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
