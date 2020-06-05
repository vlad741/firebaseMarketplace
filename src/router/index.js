import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import About from '@/components/About'
import Categories from '@/components/Categories'
import Cart from '@/components/Cart'
import CertainCategory from '@/components/CertainCategory'
import Product from '@/components/Product'
import User from '@/components/User'
import Orders from '@/components/Orders'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/cart/:userCartId',
      name: 'cart',
      component: Cart
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next('/categories') : next()
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next('/categories') : next()
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/', redirect: '/categories'
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/category/:categoryId/:categoryName',
      name: 'category',
      component: CertainCategory
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: Product
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    },
    {
      path: '/orders/:ordersId',
      name: 'Orders',
      component: Orders
    }
  ]
})
