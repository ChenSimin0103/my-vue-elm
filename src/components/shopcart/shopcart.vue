<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}，有{{totalCount}}件</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div
            class="pay"
            :class="payClass"
          >
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span><span class="price-symbol">￥</span>{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
    name: 'shopcart',
    components: {
      cartcontrol
    },
    props: {
      selectFoods: {
        type: Array,
        // 如果default值是数组/对象，则要写成函数形式
        default() {
          return [ {price: 10,count: 0},{price: 15,count: 2} ]
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
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        // 定义购物车是否折叠
        fold: true
      };
    },
    methods: {
      drop(el) {
        console.log('进入shopcart组件')
        console.log(el);
        for(let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            // 设置初始位置
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        // 进行一次浏览器重绘
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,0,0)`;
          el.style.transform = `translate3d(0,0,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(0,0,0)`;
          inner.style.transform = `translate3d(0,0,0)`;
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      // 购物车显示与隐藏切换
      toggleList() {
        console.log("toggleList in")
        // 此处注意先先判断是否有选择商品
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      // 清空购物车
      empty() {
        console.log(this.selectFoods);
//        this.selectFoods.forEach((food) =>{
//          food.count = 0;
//        });
        for (var food of this.selectFoods) {
          food.count = 0;
        }
      },
      // 隐藏蒙版
      hideList() {
        this.fold = true;
      },
      // 点击结算事件
      pay() {
        if (this.totalPrice < this.minPrice)
          return;
        else
          alert(`一共是${this.totalPrice}元`);
      }
    },
    computed: {
      // 计算已选择商品的总价格
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(
          (food) => {
            total += food.price * food.count
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
        if (this.totalPrice === 0)
//          return '￥元'+ this.minPrice +'起送'
          return `￥元${this.minPrice}起送`;
        else if (this.totalPrice<this.minPrice) {
          let diff = this.minPrice - this.totalPrice
//          return '还差￥' + diff + '元起送'
          return `还差￥${diff}元起送`;
        }
        else
          return '去结算'
      },
      // 由已选择的商品来判断 pay 的显示样式
      payClass() {
        if (this.totalPrice < this.minPrice)
          return 'not-enough';
        else
          return 'enough';
      },
      // 购物车列表是否显示
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent,{
                click: true
              });
            }
            else {
              this.scroll.refresh();
            }
          })
        }
        return show;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "shopcart.styl";

</style>
