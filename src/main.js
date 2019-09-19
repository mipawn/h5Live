// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import JSBridge from './assets/js/SZJSBridge'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { ImagePreview } from 'vant'
import 'vant/lib/index.css'

import qs from 'qs'

Vue.use(JSBridge)
Vue.use(ElementUI)
Vue.use(ImagePreview)
const baseUrl = 'http://admin.wisexs.com/'
Vue.prototype.baseUrl = baseUrl
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
