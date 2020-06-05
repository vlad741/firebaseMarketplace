import firebase from 'firebase'

import Cart from '@/store/cart/cart_help'
import Product from '@/store/product/product_help'
import Order from '@/store/order/order_help'

export default {
  state: {
    cart: undefined,
    productsInCart: undefined,
    orderToSend: undefined
  },
  mutations: {
    loadCart (state, payload) {
      state.cart = payload
    },
    loadProductsCart (state, payload) {
      state.productsInCart = payload
    },
    sendOrder (state, payload) {
      state.orderToSend = payload
    },
    setOrderUserName (state, userName) {
      state.orderToSend.name = userName
    },
    setOrderUserPhone (state, phone) {
      state.orderToSend.phone = phone
    },
    setOrderUserAddress (state, address) {
      state.orderToSend.address = address
    },
    setOrderAmount (state, amount) {
      state.orderToSend.amount = amount
    }
  },
  actions: {
    // Load cart by user Id
    async loadCart ({commit}, userId) {
      commit('clearError')
      commit('setLoading', true)
      try {
        var cartObj
        // Get cart
        await firebase.firestore().collection('cart').doc(userId)
          .get().then(function (doc) {
            if (doc.exists) {
              var data = doc.data()
              cartObj =
                new Cart(
                  doc.id,
                  data.amount,
                  data.products
                )
              // Create order to send
              var orderObj = new Order(
                '', // id
                '', // address
                data.amount,
                '', // name
                new Date(),
                '', // phone
                data.products,
                'New order',
                userId,
                '', // waybill
                0 // delivery price
              )
              // Send mutation
              commit('sendOrder', orderObj)
              // New array
              const productsArray = []
              for (var productPath in cartObj.products) {
                const productCount = cartObj.products[productPath]
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
                    console.log('Error getting document product:', error)
                  })
              }
              // Send mutation
              commit('loadCart', cartObj)
              commit('loadProductsCart', productsArray)
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document cart!')
            }
          }).catch(function (error) {
            console.log('Error getting document cart:', error)
          })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // Load product in productsInCart by Path
    async loadProductsFromCart ({commit}, cartObj) {
      commit('clearError')
      commit('setLoading', true)
      commit('loadProduct', undefined)
      try {
        // New array
        const productsArray = []
        for (var productPath in cartObj.products) {
          console.log(' name=' + productPath + ' value=' + cartObj.products[productPath])
          var productObj
          // Get products
          await firebase.firestore().doc(productPath)
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
                    data.price
                  )
                productsArray.push(productObj)
                console.log('Document data:', doc.data())
              } else {
                // doc.data() will be undefined in this case
                console.log('No such document!')
              }
            }).catch(function (error) {
              console.log('Error getting document:', error)
            })
        }
        // Send mutation
        commit('loadProductCart', productsArray)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async sendOrder ({commit}, {documentId, address, amount, name, orderDate, phone,
      products, status, userId, waybill, deliveryPrice}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        var orderObj = {
          documentId: documentId,
          address: address,
          amount: amount,
          name: name,
          orderDate: orderDate,
          phone: phone,
          products: products,
          status: status,
          userId: userId,
          waybill: waybill,
          deliveryPrice: deliveryPrice
        }
        await firebase.firestore().collection('orders').doc(userId).collection('orders').doc().set(orderObj)
          .then(function () {
            console.log('Document successfully written!')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
        await firebase.firestore().collection('cart').doc(userId).set({})
          .then(function () {
            commit('loadCart', undefined)
            commit('loadProductsCart', undefined)
            console.log('Document successfully written!')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async updateCart ({commit}, {userId, amount, products}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        var cartObj = {
          amount: amount,
          products: products
        }
        await firebase.firestore().collection('cart').doc(userId).set(cartObj)
          .then(function () {
            console.log('Cart successfully written!')
          })
          .catch(function (error) {
            console.error('Error writing document cart: ', error)
          })
        // await firebase.firestore().collection('cart').doc(userId).set({})
        //   .then(function () {
        //     commit('loadCart', undefined)
        //     commit('loadProductsCart', undefined)
        //     console.log('Document successfully written!')
        //   })
        //   .catch(function (error) {
        //     console.error('Error writing document: ', error)
        //   })
        //
        // commit('loadProductsCart', productsArray)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    // Get cart
    cart (state) {
      return state.cart
    },
    // Get products from cart
    productsInCart (state) {
      return state.productsInCart
    },
    orderToSend (state) {
      return state.orderToSend
    },
    amount (state) {
      var amount = 0
      state.productsInCart.forEach(function (product, index, arr) {
        amount += product.price * product.count
      })
      state.orderToSend.amount = parseInt(amount)
      return state.orderToSend.amount
    },
    countProductsInCart (state) {
      var count = 0
      state.cart.products.forEach(function (product, index, arr) {
        count++
      })
      return count
    }
  }
}
