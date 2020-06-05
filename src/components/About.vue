<template>
  <section class="section about">
    <div class="container" id = "about">
      <header class="title-page">
        <h1 id = "o_nas" style="margin-bottom: .5em;font-size: 30px;line-height: 1.75em;">О нас</h1>
      </header>
      <div class="text-page">
        <h3>Market-place Dmarket&trade; — украинский набирающий популярность market-place.</h3>
        <p class="responsive-img" alignment="center">
          <img src="https://i2.rozetka.ua/pages/479/479703.jpg" title="DMarket" alt="DMarket" border="0px">
        </p>
        <h3>Поможем выбрать, не дадим скучать!</h3>
        <p>Наша задача состоит не только в том, чтобы просто продать нужный товар, но и в том, чтобы информировать и просвещать покупателя.</p>
        <h3>Нам доверяют</h3>
        <p>Нашей главной целью и основополагающим принципом в работе является удовлетворенность клиентов — как розничных покупателей, так и организаций. При решении любых вопросов мы всегда на вашей стороне, потому что понимаем — наше будущее на 100% в ваших руках.</p>
        <h3>Для удобства выбора</h3>
        <p>Мы стремимся предоставить максимум полезной информации о продаваемых товарах. Сайт DMarket снабжен простыми и эффективными инструментами подбора товаров.</p>
        <h3>Адрес</h3>
        <p>Будем рады видеть Вас по&nbsp;адресу: г. Чернигов, ул. Шевченко, 95.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
  .about {
    display: flex;
    align-items: flex-start;
    flex-grow: 1;
    flex-shrink: 0;
    padding: 3rem 1.5rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h3 {
    margin-bottom: .5em;
    font-size: 20px;
    line-height: 1.45em;
  }
  p {
    margin-bottom: .5em;
    font-size: 16px;
    color: #2c3e50;
  }
  img {
    margin-bottom: 1rem;
    margin-top: 1rem;
    border: 0;
    vertical-align: middle;
    -ms-interpolation-mode: bicubic;
  }
  .responsive-img img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
</style>
