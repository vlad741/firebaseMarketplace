<template>
  <div class="wrapper">
    <header>
      <div class="navbar navbar--fixed">
        <div class="container">
          <div class="navbar-content">
            <router-link class="header-logo" to="/categories"><img src="./assets/dmarket_horizontal.png" width="130" /></router-link>
            <div class="button-burger" @click="menuShow = !menuShow" :class="{ active: menuShow }">
              <span class="line line-1"></span>
              <span class="line line-2"></span>
              <span class="line line-3"></span>
            </div>
            <div class="navbar-list__wrapper" :class="{ active: menuShow }">
              <ul class="navbar-list">
                <router-link class="navbar-link" v-if="checkUser" :to="{ name: 'user', params: { userId: getUser.id}}">
                  <div class="navbar-item button button--round button-default" @click="menuShow = false">
                    <div class="photoUser">
                      <img class="center" :src='getUser.photoUrl'>
                    </div>
                    <div class="nameEmail">
                      <p class="ui-text-small">{{getUser.name}}<br/></p>
                      <p class="ui-text-smaller">{{getUser.email}}</p>
                    </div>
                  </div>
                </router-link>
                <li class="navbar-item" v-for="link in links" :key="link.title" @click="menuShow = false">
                  <router-link class="navbar-link" :to="`${link.url}`">{{ link.title }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view :class="{blur: loading}"></router-view>
    <div class="preloader__wrapper" v-if="loading">
      <div class="preloader1"></div>
      <div class="preloader2"></div>
      <div class="preloader3"></div>
    </div>
    <div class="ui-message" v-if="messageShow" :class="[{ 'ui-message--success': messageContext === 'success' }, { 'ui-message--danger': messageContext === 'error' }]">
      <span class="message-title">{{ messageTitle }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    links () {
      if (this.checkUser) {
        return [
          {title: 'Home', url: '/categories'},
          {title: 'My Cart', url: '/cart/' + this.getUser.id},
          {title: 'My Orders', url: '/orders/' + this.getUser.id},
          {title: 'About us', url: '/about'}
        ]
      }
      return [
        {title: 'Home', url: '/categories'},
        {title: 'Sign in/Sign up', url: '/login'},
        {title: 'About us', url: '/about'}
      ]
    },
    getUser () {
      return this.$store.getters.user
    },
    // Show loading status
    loading () {
      return this.$store.getters.loading
    },
    messageShow () {
      return this.$store.getters.message.show
    },
    messageTitle () {
      return this.$store.getters.message.title
    },
    messageContext () {
      return this.$store.getters.message.context
    }
  }
}
</script>

<style lang="stylus">
  @import './assets/stylus/main.styl'
  .photoUser {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    float: left;
    margin-right: 8px;
    display: inline-block;
    position: relative;
    overflow: hidden;
  }
  .photoUser img{
    width: auto;
    height: 100%;
  }
  .nameEmail {
    height: 40px;
    float: right;
  }
</style>
