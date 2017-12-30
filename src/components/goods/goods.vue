<template>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="item in goods">
            <span class="text" >
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li class="food-list" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-for="food in item.foods">
                <div class="icon">
                  <img :src="food.icon" width="57px" height="57px">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span><span>￥</span>{{food.price}}</span>
                    <span class="old-price" v-show="food.oldPrice"><span>￥</span>{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0

  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    components: {},
    data () {
      return {
        goods: {}
      }
    },
    methods: {

    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee'],
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods)
        }
      })
        // 因为传入了seller,其中的classMap还需再定义一次

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goods.styl";
</style>
