<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
          <div class="food-content">
            <div class="image-header">
              <img :src="food.image">
              <div class="back" @click="hide">
                <i class="icon-arrow_lift"></i>
              </div>
            </div>
            <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol @add="addFood" :food="food"></cartcontrol>
              </div>
              <transition name="buy">
                <div class="buy" @click.stop.prevent="addFirst(food,$event)" v-show="!food.count || food.conut===0">加入购物车</div>
              </transition>
            </div>
            <split v-show="food.info"></split>
            <div class="info" v-show="food.info">
              <h1 class="title">商品信息</h1>
              <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
              <h1 class="title">商品评价</h1>
              <ratingselect
                :select-type="selectType"
                :only-content="onlyContent"
                :desc="desc"
                :ratings="food.ratings"
              ></ratingselect>
            </div>

            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li class="rating-item" v-for="rating in food.ratings">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime}}</div>
                  <p class="text">
                    <span class="thumb" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
            </div>

          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect
          :select-type="selectType"
          :only-content="onlyContent"
          :desc="desc"
          :ratings="food.ratings"
          
          ></ratingselect>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import Vue from 'vue';
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'

  // 预定义 全部，推荐及吐槽的值，便于维护
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        // 父组件使用子组件，一些设置单拿出来维护，变量跟踪，，子组件可变配置项？
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      // 隐藏及显示food组件，简单好用的写法
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        // 必须在下一个事件循环内计算与DOM相关的属性，否则可能会因为还未渲染而计算错误
        this.$nextTick(() => {
          // 因需要多次渲染，故判断是否存在，存在直接刷新，不存在要先new一个
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              // 设定屏幕是否响应点击事件
              click: true
            });
          }
          else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(food,event) {
        // 给cartcontrol添加一个当前food，并把“加入购物车”隐藏起来
        // 注意还要添加food减至0时显示“加入购物车”
        if (!event._constructed)
          return;
        // 向父组件派发add事件，用于传给good组件触发小球事件
        this.$emit('add', event.target);
        // 这是否是全局设置任意变量属性的方法？？
        Vue.set(this.food, 'count', 1)
      },
      // 因为这里是food组件里的cartfood向父组件派发add时间，没有冒泡？？,故在这里接受并继续向父组件good组件传递
      addFood(target) {
        this.$emit('add', target)
      }
    },
    computed:{

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "food.styl";

</style>
