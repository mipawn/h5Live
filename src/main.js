// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import './assets/css/reset.css'
import './assets/css/index.css'
import './assets/css/iconfont.css'
import JSBridge from './assets/js/SZJSBridge'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import echarts from 'echarts'
import service from '@/utils/request'
import VueAMap from 'vue-amap'

Vue.use(JSBridge)
Vue.use(ElementUI)
Vue.use(VueAMap)
Vue.prototype.$http = service
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts
// fastclick.attach(document.body)
Vue.config.productionTip = false

Vue.prototype.VueAMap = VueAMap.initAMapApiLoader({
  key: 'ed0ea87335cf6512a0dab9f33c007a35',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'Geocoder', 'Geolocation', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
