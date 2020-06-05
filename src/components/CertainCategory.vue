<template>
  <section class="container category">
  <p class="ui-title-1 center">{{this.$route.params.categoryName}}</p>
  <div class="row grid-center">
    <div class="center col-xs-12 col-md-4" v-for="product in products" :key="product.id">
      <router-link :to="{ name: 'product', params: { productId: product.id}}">
        <div class="ui-card ui-card--shadow">
          <div class="category-item__photo">
            <img v-bind:src="product.photos[0]" style="max-height: 144pt">
          </div>
          <p class="ui-title-4 center">{{product.name}}</p>
          <p class="ui-title-2">{{product.price}} грн</p>
        </div>
      </router-link>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  name: 'CertainCategory',
  created () {
    this.$store.dispatch('loadProducts')
  },
  computed: {
    products () {
      return this.$store.getters.getProductsByCategory(this.$route.params.categoryId)
    }
  }
}
</script>
