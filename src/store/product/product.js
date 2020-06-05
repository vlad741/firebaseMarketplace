import firebase from 'firebase'

import Product from '@/store/product/product_help'

export default {
  state: {
    products: [],
    product: undefined
  },
  mutations: {
    loadProducts (state, payload) {
      state.products = payload
    },
    loadProductsCart (state, payload) {
      state.productsInCart = payload
    },
    loadProduct (state, payload) {
      state.product = payload
    }
  },
  actions: {
    // Load all Products
    async loadProducts ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // New array
        const productsArray = []
        // Get products
        await firebase.firestore().collection('products')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              var data = doc.data()
              productsArray.push(
                new Product(
                  doc.id,
                  data.category,
                  data.description,
                  data.name,
                  data.path,
                  data.photos,
                  data.price
                )
              )
              console.log(doc.id, ' => ', data)
            })
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error)
          })
        // Send mutation
        commit('loadProducts', productsArray)

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // Load product by Id
    async loadProduct ({commit}, productId) {
      commit('clearError')
      commit('setLoading', true)
      commit('loadProduct', undefined)
      try {
        // New array
        var productObj
        // Get products
        await firebase.firestore().collection('products').doc(productId)
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
              // Send mutation
              commit('loadProduct', productObj)
              console.log('Document data:', doc.data())
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!')
            }
          }).catch(function (error) {
            console.log('Error getting document:', error)
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
    // Get All Products
    products (state) {
      return state.products
    },
    getProductThatLoadedById (state) {
      return state.product
    },
    // Get products by category
    getProductsByCategory: state => category => {
      return state.products.filter(product => product.category === category)
    }
  }
}
