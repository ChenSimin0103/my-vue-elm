import Vue from 'vue'
import Router from 'vue-router'

import goods from '../components/goods/goods.vue'
import seller from '../components/seller/seller.vue'
import ratings from  '../components/ratings/ratings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    }
  ]
})
