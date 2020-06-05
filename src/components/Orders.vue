<template>
  <section class="container order">
    <p class="order">Мои Заказы</p>
    <div class="grid-center" id="orders-list" v-if="getOrders && getOrders.length">
      <div class="center col-xs-12" v-for="order in getOrders" :key="order.id" style="margin-top: 1em">
        <div class="ui-card ui-card--shadow" :key="order.id">
          <p class="ui-title-4" style="margin-top: 1em; text-align: left; font-size: 0.8em">
            Статус заказа: <span v-bind:class="order.status">{{order.status}}</span></p>
          <p class="ui-title-4" style="margin-top: 1em; text-align: left; font-size: 0.7em; color: #2c3e50">{{order.orderDate.toDate().toLocaleDateString('ru')}}</p>
          <p class="ui-title-4" style="margin-top: 1em; text-align: left; font-size: 0.7em">ТТН: <span style="color: #2c3e50;">{{order.waybill}}</span></p>
          <p class="ui-title-4" style="margin-top: 1em; text-align: left; font-size: 0.7em">Delivery address: <span style="color: #2c3e50;">{{order.address}}</span></p>
          <br>
          <div class="row grid-center">
            <div class="center col-xs-12 col-md-4" id="products-list" v-for="product in order.products" :key="product.id">
              <router-link :to="{ name: 'product', params: { productId: product.id}}">
              <div class="category-item__photo ui-card">
                <img v-bind:src="product.photos[0]" style="max-height: 144pt">
                <p class="ui-title-4" style="margin-top: 1em; text-align: left; font-size: 1em; color: darkcyan">{{product.name}}</p>
                <span class="inline_span left_align">{{product.price + ' грн.'}}</span>
                <span class="inline_span right_align">{{product.count + ' шт.'}}</span>
              </div>
              </router-link>
            </div>
          </div>
          <br>
          <div class="order details">
            <div v-if="order.deliveryPrice">
              <p class="ui-title-4" style="margin-top: 1em; text-align: left; color: #2c3e50; font-size: 0.7em">Доставка {{order.deliveryPrice + ' грн.'}}</p>
              <p class="ui-title-4" style="margin-top: 0.1em; text-align: left; color: #2c3e50; font-size: 0.7em">Итого к оплате {{(order.amount+order.deliveryPrice) + ' грн.'}}</p>
            </div>
            <div v-else>
              <p class="ui-title-4" style="margin-top: 0.1em; text-align: left; color: #2c3e50; font-size: 0.7em">Сумма {{order.amount + ' грн.'}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-link to="/categories">
        <img src="../assets/img_no_orderitems.png">
        <p class="ui-title-4">Вы еще не делали заказов</p>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Orders',
  created () {
    this.$store.dispatch('loadOrders', this.$route.params.ordersId)
  },
  computed: {
    getOrders () {
      return this.$store.getters.orders
    }
  }
}
</script>

<style scoped>
  .order {
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
  .quantity {
    max-width: 150px;
    width: 100%;
    text-align: center;
    align-items: left;
  }
  .Delivered {
    color: green
  }
  .inline_span {
    font-size: 0.7em;
    display: inline
  }
  .left_align {
    float: left;
  }
  .right_align {
    float: right;
  }
</style>
