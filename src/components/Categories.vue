<template>
  <section class="container categories">
  <div class="row grid-center">
    <div class="center col-xs-12 col-md-4" v-for="category in categories" :key="category.id">
      <router-link :to="{ name: 'category', params: { categoryId: category.category , categoryName: category.name}}">
        <div class="ui-card ui-card--shadow">
          <div class="category-item__photo">
            <img v-bind:src="category.photo" style="max-height: 144pt">
          </div>
          <p class="ui-title-3 center">{{category.name}}</p>
        </div>
      </router-link>
    </div>
  </div>
  </section>
</template>

<script>
import 'firebase/firestore'

export default {
  name: 'Categories',
  created () {
    this.$store.dispatch('loadCategories')
  },
  computed: {
    categories () {
      return this.$store.getters.categories
    }
  }
}
</script>
