<template>
  <section class="container cart">
    <p class="cart">Моя Корзина</p>
    <div v-if="getProductsFromCart && getProductsFromCart.length">
      <div class="row grid-center" id="products-list">
        <div class="center col-xs-12 col-md-4" v-for="(product) in getProductsFromCart" :key="product.id" style="margin-top: 1em">
          <div class="ui-card ui-card--shadow" :key="product.id">
            <router-link :to="{ name: 'product', params: { productId: product.id}}">
              <div class="category-item__photo">
                <img v-bind:src="product.photos[0]" style="max-height: 144pt">
              </div>
              <p class="ui-title-4" style="margin-top: 1em; text-align: left">{{product.name}}</p>
              <p class="ui-title-4" style="margin-top: 1em; text-align: left">{{product.price + ' грн.'}}</p>
            </router-link>
            <button class="counter" v-on:click="getCart.products['/products/'+product.id] -= 1; product.count-= 1" v-if="product.count-1">-</button>
            <span id="el" style="font-size: .7em">{{getCart.products['/products/'+product.id]}}</span>
            <button class="counter" v-on:click="getCart.products['/products/'+product.id] += 1; product.count+= 1">+</button>
          </div>
        </div>
      </div>
      <div class="grid-center margin-div">
        <form>
          <label for="nameField" class="grid-start">Name</label>
          <input id="nameField" type="text" placeholder="Your name" v-model="userName">
          <label for="phoneField" class="grid-start">Phone</label>
          <input id="phoneField" type="text" placeholder="Your phone" v-model="userPhone">
          <label for="addressField" class="grid-start">Delivery Address</label>
          <input id="addressField" type="text" placeholder="Your delivery address" v-model="userAddress">
        </form>
        <p class="ui-title-4" style="margin-top: 0.1em; text-align: left; color: #2c3e50;">Сумма: {{orderAmount + ' грн.'}}</p>
        <button class="btn-link-i btn-link-i-aqua" @click="sendOrder">Order</button>
      </div>
    </div>
    <div v-else>
      <router-link to="/categories">
        <img src="../assets/img_no_cartitems.png">
        <p class="ui-title-4">Ваша корзина пуста</p>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Cart',
  created () {
    this.$store.dispatch('loadCart', this.$route.params.userCartId)
  },
  methods: {
    sendOrder () {
      this.$store.dispatch('sendOrder', this.$store.getters.orderToSend)
      this.$router.push({ path: `/orders/${this.$route.params.userCartId}` })
    }
  },
  computed: {
    getUser () {
      return this.$store.getters.user
    },
    getCart () {
      return this.$store.getters.cart
    },
    getProductsFromCart () {
      return this.$store.getters.productsInCart
    },
    getOrderToSend () {
      return this.$store.getters.orderToSend
    },
    userName: {
      get () {
        return this.$store.getters.orderToSend.name
      },
      set (value) {
        this.$store.commit('setOrderUserName', value)
      }
    },
    userPhone: {
      get () {
        return this.$store.getters.orderToSend.phone
      },
      set (value) {
        this.$store.commit('setOrderUserPhone', value)
      }
    },
    userAddress: {
      get () {
        return this.$store.getters.orderToSend.address
      },
      set (value) {
        this.$store.commit('setOrderUserAddress', value)
      }
    },
    orderAmount: {
      get () {
        return this.$store.getters.amount
      }
    }
  }
}
</script>

<style scoped>
  .cart {
    margin-bottom: .7em;
    margin-top: .7em;
    font-size: 1.2em;
    text-align: center;
    color: #2c3e50;
  }
  .margin-div {
    margin-bottom: 2.2em;
    margin-top: 2.2em;
  }
  .btn-link-i {
    display: inline-block;
    position: relative;
    border: 0;
    outline: 0;
    border-radius: .25em;
    vertical-align: middle;
    background-clip: padding-box;
    margin-top: 1.4em;
    cursor: pointer;
  }
  .btn-link-i-aqua {
    background: darkcyan
  }
  .quantity input {
    text-align: center;
  }
  .counter {
    display: inline-block;
    width: 2.3em;
    height: 2.3em;
    background-color: orangered;
    color: #fff;
    font-size: .7em;
    border-radius: 1.15em;
  }
  .quantity {
    text-align: center;
    align-items: left;
  }
</style>
