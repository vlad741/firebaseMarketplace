import firebase from 'firebase'

import Order from '@/store/order/order_help'
import Product from '@/store/product/product_help'

export default {
  state: {
    orders: undefined
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    // Load orders by user Id
    async loadOrders ({commit}, userId) {
      commit('clearError')
      commit('setLoading', true)
      commit('loadOrders', undefined)
      try {
        // New array
        const ordersArray = []
        // Get orders
        await firebase.firestore().collection('orders').doc(userId).collection('orders')
          .orderBy('orderDate', 'desc')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              var data = doc.data()
              var orderObj =
                new Order(
                  doc.id,
                  data.address,
                  data.amount,
                  data.name,
                  data.orderDate,
                  data.phone,
                  data.products,
                  data.status,
                  data.userId,
                  data.waybill,
                  data.deliveryPrice
                )
              // Substitute real products from order.products (Product looks like productPath:countOfProducts)
              const productsArray = []
              for (var productPath in orderObj.products) {
                const productCount = orderObj.products[productPath]
                console.log(' name=' + productPath + ' value=' + productCount)
                var productObj
                // Get products
                firebase.firestore().doc(productPath)
                  .get().then(function (doc) {
                    if (doc.exists) {
                      var data = doc.data()
                      productObj =
                      new Product(
                        doc.id,
                        data.category,
                        data.description,
                        data.name,
                        data.path,
                        data.photos,
                        data.price,
                        productCount
                      )
                      productsArray.push(productObj)
                      console.log('Document data product:', doc.data())
                    } else {
                    // doc.data() will be undefined in this case
                      console.log('No such document product!')
                    }
                  }).catch(function (error) {
                    console.log('Error getting document orders:', error)
                  })
              }
              orderObj.products = productsArray
              ordersArray.push(orderObj)
              // Send mutation
              commit('loadOrders', ordersArray)
            })
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error)
          })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    // Get orders
    orders (state) {
      return state.orders
    }
  }
}
