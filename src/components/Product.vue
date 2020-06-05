<template>
  <section class="section product">
    <div class="container" id="product">
      <div style="width:80%;margin:20px auto;height:400px">
        <!-- Using the slider component -->
        <slider ref="slider" :options="options">
          <!-- slideritem wrapped package with the components you need -->
          <slideritem v-for="(item,index) in product.photos" :key="index" :style=itemStyle>
            <img v-bind:src="item">
          </slideritem>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
        </slider>
      </div>
      <h1 id="product_price" style="margin-bottom: .5em;font-size: 22px;line-height: 1.75em;">{{product.price + " грн."}}</h1>
      <h1 id="product_name" style="margin-bottom: .5em;font-size: 40px;line-height: 1.75em; font-weight: bold">{{product.name}}</h1>
      <p>{{product.description}}</p>
      <div class="row" id="buttons" v-if="checkUser">
        <div class="button button--round button-primary" v-if="isInCart" v-on:click="delProductFromCart" style="margin: 14pt">Уже в корзине 🛒</div>
        <div class="button button--round button-primary button--plain" v-else  v-on:click="addProductToCart" style="margin: 14pt">Добавить в корзину 🛒</div>
        <router-link :to="{ name: 'cart', params: { cartId: getUser.id}}">
        <div class="button button--round button-success" v-on:click="addProductToCart" style="margin: 14pt">Купить сейчас</div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { slider, slideritem } from 'vue-concise-slider'

export default {
  name: 'Product',
  components: {
    slider,
    slideritem
  },
  data () {
    return {
      itemStyle: {
        'width': '30.5%',
        'margin-right': '2%'
      }
    }
  },
  created () {
    this.$store.dispatch('loadProduct', this.$route.params.productId)
    this.$store.dispatch('loadCart', this.$store.getters.user.id)
  },
  methods: {
    addProductToCart () {
      var products = this.$store.getters.cart.products
      var amount = this.$store.getters.cart.amount + this.$store.getters.getProductThatLoadedById.price
      const productPath = this.$store.getters.getProductThatLoadedById.path
      if (products !== undefined) {
        products[productPath] = 1
      } else {
        products = {}
        products[productPath] = 1
      }
      var cartObj = {
        userId: this.$store.getters.user.id,
        amount: amount,
        products: products
      }
      this.$store.dispatch('updateCart', cartObj)
      this.$store.dispatch('loadCart', this.$store.getters.user.id)
    },
    delProductFromCart () {
      var products = this.$store.getters.cart.products
      var amount = this.$store.getters.cart.amount + this.$store.getters.getProductThatLoadedById.price
      var productPath = this.$store.getters.getProductThatLoadedById.path
      delete products[productPath]
      var cartObj = {
        userId: this.$store.getters.user.id,
        amount: amount,
        products: products
      }
      this.$store.dispatch('updateCart', cartObj)
      this.$store.dispatch('loadCart', this.$store.getters.user.id)
    }
  },
  computed: {
    product () {
      return this.$store.getters.getProductThatLoadedById
    },
    checkUser () {
      return this.$store.getters.checkUser
    },
    getUser () {
      return this.$store.getters.user
    },
    getCart () {
      return this.$store.getters.cart
    },
    isInCart () {
      if (this.$store.getters.cart.products !== undefined) {
        return this.$store.getters.cart.products.hasOwnProperty(this.$store.getters.getProductThatLoadedById.path)
      } else { return false }
    },
    getProductPath () {
      return this.$store.getters.getProductThatLoadedById.path
    },
    options () {
      return {
        currentPage: 0,
        tracking: true,
        thresholdDistance: 0,
        thresholdTime: 0,
        infinite: 1,
        slidesToScroll: 1,
        loop: true,
        speed: 500,
        autoplay: '1700',
        timingFunction: 'ease'
      }
    }
  }
}
</script>

<style scoped>
  .product {
    display: flex;
    align-items: flex-start;
    flex-grow: 1;
    flex-shrink: 0;
    padding: 3rem 1.5rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .hooper-slide {
    height: 140px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border: 2px solid #fff;
    font-size: 30px;
    border-radius: 10px;
  }
  p {
    margin-bottom: .5em;
    font-size: 16px;
    color: #2c3e50;
  }
  .btn-link-i {
    display: inline-block;
    position: relative;
    border: 0;
    outline: 0;
    border-radius: 4px;
    vertical-align: middle;
    background-clip: padding-box;
    margin-top: 2em;
    cursor: pointer;
  }
  .btn-link-i-aqua {
    background: darkcyan
  }
  .btn-link-i-gray {
    background: darkgray;
    margin-right: 2em
  }
</style>
