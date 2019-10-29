import Vue from 'vue'
import Router from 'vue-router'

import star from '@/pages/star'
import video from '@/pages/video'
import service from '@/pages/service'
import list from '@/pages/list'
import details from '@/pages/details'
import hall from '@/pages/hall'
import dynamic from '@/pages/dynamic'
import regiment from '@/pages/regiment'
import hallList from '@/pages/hallList'
import map from '@/pages/map'
import news from '@/pages/news'
import classroom from '@/pages/classroom'
import home from '@/pages/home'
import hot from '@/pages/hot'
import last from '@/pages/last'
import more from '@/pages/more'
import detail from '@/pages/detail'
import other from '@/pages/other'
import house from '@/pages/house'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/',
  routes: [
    {
      path: '/star',
      name: 'star',
      component: star
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/service',
      name: 'service',
      component: service
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/hall',
      name: 'hall',
      component: hall
    },
    {
      path: '/hallList',
      name: 'hallList',
      component: hallList
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: dynamic
    },
    {
      path: '/regiment',
      name: 'regiment',
      component: regiment
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: classroom
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: 'home/hot',
      children: [
        {
          path: 'hot',
          component: hot
        },
        {
          path: 'last',
          component: last
        },
        {
          path: 'more',
          component: more
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/other',
      name: 'other',
      component: other
    },
    {
      path: '/house',
      name: 'house',
      component: house
    },
    {
      path: '/live',
      name: 'live',
      component: () => import('@/pages/live.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/pages/shop.vue')
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/pages/report.vue')
    },
    {
      path: '/booklist',
      name: 'bookList',
      component: () => import('../pages/booklist.vue')
    }
  ]
})
