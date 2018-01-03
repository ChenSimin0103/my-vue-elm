<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="price">￥{{totalPrice}}</div>
            <div class="desc">另需配送费￥{{deliverPrice}}元</div>
          </div>
        </div>
        <div class="content-right"></div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'shopcart',
    components: {},
    props: {},
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "shopcart.styl"

</style>
