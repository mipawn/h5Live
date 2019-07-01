import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/pages/home'
import live from '@/pages/components/live'
import chat from '@/pages/components/chat'
import intro from '@/pages/components/intro'
import ago from '@/pages/components/ago'
import index from '@/pages/index'
import video from '@/pages/video'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/live',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/home',
      name: 'home',
      component: homepage,
      children: [
        {
          path: 'live',
          name: 'live',
          component: live
        },
        {
          path: 'chat',
          name: 'chat',
          component: chat
        },
        {
          path: 'intro',
          name: 'intro',
          component: intro
        },
        {
          path: 'ago',
          name: 'ago',
          component: ago
        }
      ]
    }
  ]
})
