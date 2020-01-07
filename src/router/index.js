import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Bazi from '@/views/bazi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/bazi',
      name: 'bazi',
      component: Bazi
    }
  ]
})
