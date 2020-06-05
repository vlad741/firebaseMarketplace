import firebase from 'firebase'

import User from '@/store/user/user_help'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserName (state, userName) {
      state.user.name = userName
    },
    setUserPhone (state, phone) {
      state.user.phone = phone
    },
    setUserAddress (state, address) {
      state.user.address = address
    },
    setUserDateOfBirth (state, dateOfBirth) {
      state.user.dateOfBirth = dateOfBirth
    },
    setUserGender (state, gender) {
      state.user.gender = gender
    }
  },
  actions: {
    // Registration page
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // logic
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        // Because The Web client library does not support custom objects instantiated with new...()
        var userInfo = {
          info: {
            id: user.user.uid,
            address: '',
            dateOfBirth: new Date(),
            gender: 0,
            phone: ''
          }
        }
        commit('setUser', new User(user.user.uid, user.user.displayName, user.user.email, user.user.photoURL,
          userInfo.address, userInfo.dateOfBirth, userInfo.gender, userInfo.phone))
        await firebase.firestore().collection('users').doc(user.user.uid).set(userInfo)
          .then(function () {
            console.log('Document successfully written!')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
        await firebase.firestore().collection('cart').doc(user.user.uid).set({})
          .then(function () {
            console.log('Document successfully written!')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })

        await firebase.firestore().collection('orders').doc(user.user.uid).collection('orders').doc().set({})
          .then(function () {
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
    // Login page
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // logic
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        await firebase.firestore().collection('users').doc(user.user.uid).get().then(function (doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data())
            var data = doc.data()
            commit('setUser', new User(user.user.uid, user.user.displayName, user.user.email, user.user.photoURL,
              data.info.address, data.info.dateOfBirth.toDate(), data.info.gender, data.info.phone))
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
    },
    // Logged
    async loggedUser ({commit}, payload) {
      await firebase.firestore().collection('users').doc(payload.uid).get().then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data())
          var data = doc.data()
          commit('setUser', new User(payload.uid, payload.displayName, payload.email, payload.photoURL,
            data.info.address, data.info.dateOfBirth.toDate(), data.info.gender, data.info.phone))
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      }).catch(function (error) {
        console.log('Error getting document:', error)
      })
    },
    // Logout
    logoutUser ({commit}) {
      firebase.auth().signOut()
      // Send mutation null
      commit('setUser', null)
    },
    async updateUserInfo ({commit}, {displayName, photoURL, address, dateOfBirth, gender, phone}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        var user = await firebase.auth().currentUser

        await user.updateProfile({
          displayName: displayName,
          photoURL: photoURL
        }).then(function () {
          console.log('Update successful.')
          // Update successful.
        }).catch(function (error) {
          console.log('Update user An error happened..' + error)
        })

        var userInfo = {
          info: {
            id: user.uid,
            address: address,
            dateOfBirth: dateOfBirth,
            gender: parseInt(gender, 0),
            phone: phone
          }
        }
        commit('setUser', new User(user.uid, displayName, user.email, photoURL,
          address, dateOfBirth, gender, phone))
        await firebase.firestore().collection('users').doc(user.uid).set(userInfo)
          .then(function () {
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
    }
  },
  getters: {
    // Return user (for get id)
    user (state) {
      return state.user
    },
    // Check User (for logged)
    checkUser (state) {
      return state.user !== null
    }
  }
}
