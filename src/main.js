// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import swiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/iconfont.css'

Vue.config.productionTip = false
Vue.use(swiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
