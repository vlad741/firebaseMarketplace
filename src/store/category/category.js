import firebase from 'firebase'

import Category from '@/store/category/category_help'

export default {
  state: {
    categories: []
  },
  mutations: {
    loadCategories (state, payload) {
      state.categories = payload
    }
  },
  actions: {
    // Load all Categories
    async loadCategories ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // New array
        const categoriesArray = []
        // Get category
        await firebase.firestore().collection('categories')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              var data = doc.data()
              categoriesArray.push(
                new Category(
                  data.category,
                  data.name,
                  data.photo
                )
              )
              console.log(doc.id, ' => ', data)
            })
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error)
          })
        // Send mutation
        commit('loadCategories', categoriesArray)

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    // Get All Categories
    categories (state) {
      return state.categories
    }
  }
}
