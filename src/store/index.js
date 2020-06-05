import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import message from './message'
import user from './user/user'
import category from '@/store/category/category'
import product from '@/store/product/product'
import cart from '@/store/cart/cart'
import order from '@/store/order/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    message,
    user,
    category,
    product,
    cart,
    order
  }
})
