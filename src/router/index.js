import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/pages/home'
// import university from '@/pages/components/university'
// import treatment from '@/pages/components/treatment'
// import rest from '@/pages/components/rest'
// import award from '@/pages/components/award'
// import stage from '@/pages/components/stage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: homepage,
      children: [
        // {
        //   path: 'university',
        //   component: university
        // },
        // {
        //   path: 'treatment',
        //   component: treatment
        // },
        // {
        //   path: 'rest',
        //   component: rest
        // },
        // {
        //   path: 'award',
        //   component: award
        // },
        // {
        //   path: 'stage',
        //   component: stage
        // }
      ]
    }
  ]
})
