// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
// import 'https://g.alicdn.com/de/prismplayer/2.7.2/aliplayer-h5-min.js'
// import 'https://g.alicdn.com/de/prismplayer/2.7.2/skins/default/aliplayer-min.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
