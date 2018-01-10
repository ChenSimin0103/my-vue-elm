<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}，有{{totalCount}}件</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div
            class="pay"
            :class="payClass"
          >
            ￥{{payDesc}}
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'shopcart',
    components: {},
    props: {
      selectFoods: {
        type: Array,
        // 如果default值是数组/对象，则要写成函数形式
        default() {
          return [ {price: 10,count: 1},{price: 15,count: 6} ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    methods: {},
    computed: {
      // 计算已选择商品的总价格
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(
          (food) => {
            total += food.price*food.count
          })
        return total
      },
      // 计算已选择的商品数
      totalCount() {
        let count = 0
        this.selectFoods.forEach(
          (food) => {
            count += food.count
          })
        return count
      },
      // 由已选择的商品来判断 pay 中的显示内容
      payDesc() {
        if (this.totalPrice===0)
          return '￥元'+ this.minPrice +'起送'
        else if (this.totalPrice<this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return '还差￥' + diff + '元起送'
        }
        else
          return '去结算'
      },
      // 由已选择的商品来判断 pay 的显示样式
      payClass() {

      },
      // 购物车列表是否显示
      listShow() {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "shopcart.styl"

</style>
