import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/pages/home'
import live from '@/pages/components/live'
import chat from '@/pages/components/chat'
import intro from '@/pages/components/intro'
import ago from '@/pages/components/ago'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homepage,
      children: [
        {
          path: 'live',
          component: live
        },
        {
          path: 'chat',
          component: chat
        },
        {
          path: 'intro',
          component: intro
        },
        {
          path: 'ago',
          component: ago
        }
      ]
    }
  ]
})
