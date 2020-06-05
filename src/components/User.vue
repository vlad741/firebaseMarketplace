<template>
  <section class="userSection container" v-if="checkUser">
    <div class="grid-center">
      <div class="photo--user" v-if="userPhoto">
        <img class="center photoImg" :src='userPhoto'>
      </div>
<!--      <div v-else>-->
<!--        <div class="button button&#45;&#45;round button&#45;&#45;large button-primary button&#45;&#45;plain">Pick photo</div>-->
<!--      </div>-->
    </div>
    <br>
    <div>
      <label for="nameField">Name</label>
      <input id="nameField" type="text" placeholder="Your name" v-model="userName">
      <label for="emailField">Email</label>
      <input id="emailField" type="text" placeholder="Your email" v-model="userEmail" readonly>
      <label for="phoneField">Phone</label>
      <input id="phoneField" type="text" placeholder="Your phone" v-model="userPhone">
      <label for="addressField">Delivery Address</label>
      <input id="addressField" type="text" placeholder="Your delivery address" v-model="userAddress">
      <label for="dateOfBirthField" >Date Of Birth</label>
      <datepicker id="dateOfBirthField" placeholder="Select Date" v-model="userDateOfBirth"></datepicker>
      <label for="genderField">Gender</label>
      <select id="genderField" v-model="userGender">
        <option value = 0>Male</option>
        <option value = 1>Female</option>
      </select>
    </div>
    <div class="grid-center">
      <div class="button button--round button-success" @click="updateUserInfo" style="margin-bottom: 16px;">Save</div>
      <br>
      <!-- Wrapper for first message -->
      <div class="ui-messageBox__wrapper " id="messageBoxLogout">
        <div class="ui-messageBox fadeInDown">
          <div class="ui-messageBox__header">
            <span class="messageBox-title">Logout</span>
            <span class="button-close ui-messageBox-close" @click="hideMessageBox"></span>
          </div>
          <div class="ui-messageBox__content"><span>You definitely want to logout?</span></div>
          <div class="ui-messageBox__footer">
            <div class="button button-light ui-messageBox-cancel" id="messageBoxLogoutCancel" @click="hideMessageBox">Cancel</div>
            <div class="button button-primary ui-messageBox-ok" @click="logout">OK</div>
          </div>
        </div>
      </div>
      <!-- Button for first message -->
      <div class="button button--round button-danger ui-messageBox-show" @click="showMessageBox" style="margin-bottom: 16px;">Logout</div>
    </div>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'User',
  components: {
    Datepicker
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    },
    showMessageBox () {
      document.getElementById('messageBoxLogout').style.display = 'flex'
    },
    hideMessageBox () {
      document.getElementById('messageBoxLogout').style.display = 'none'
    },
    updateUserInfo () {
      const user = {
        displayName: this.userName,
        photoURL: this.userPhoto,
        address: this.userAddress,
        dateOfBirth: this.userDateOfBirth,
        gender: this.userGender,
        phone: this.userPhone
      }
      this.$store.dispatch('updateUserInfo', user)
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    userName: {
      get () {
        return this.$store.getters.user.name
      },
      set (value) {
        this.$store.commit('setUserName', value)
      }
    },
    userEmail: {
      get () {
        return this.$store.getters.user.email
      }
    },
    userPhoto: {
      get () {
        return this.$store.getters.user.photoUrl
      }
    },
    userPhone: {
      get () {
        return this.$store.getters.user.phone
      },
      set (value) {
        this.$store.commit('setUserPhone', value)
      }
    },
    userAddress: {
      get () {
        return this.$store.getters.user.address
      },
      set (value) {
        this.$store.commit('setUserAddress', value)
      }
    },
    userDateOfBirth: {
      get () {
        return this.$store.getters.user.dateOfBirth
      },
      set (value) {
        this.$store.commit('setUserDateOfBirth', value)
      }
    },
    userGender: {
      get () {
        return this.$store.getters.user.gender
      },
      set (value) {
        this.$store.commit('setUserGender', value)
      }
    }
  }
}
</script>

<style scoped>
.photo--user{
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin: 16px;
  background-color: #7d87f8;
}
.photo--user img{
  width: auto;
  height: 100%;
}
</style>
