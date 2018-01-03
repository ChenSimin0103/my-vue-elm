<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods"
              class="menu-item"
              :class="{'current':currentIndex===(index)}"

              @click="selectMenu(index,$event)"
              ref="menuList" >
            <span class="text" >
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list" ref="foodList" v-for="item in goods">
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
                    <span class="extra-sell">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new-price"><span class="price-icon">￥</span>{{food.price}}</span>
                    <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart"></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">

  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'

  const ERR_OK = 0

  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      shopcart
    },
    data () {
      return {
        goods: {},
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex() {
        // 用来测试问题
//        let num = Math.round(this.scrollY/400)
//        return num
        for (let i=0;i<this.listHeight.length;i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
            console.log('currentIndex：' + i)
          }
        }
        return 0
      }
    },
    methods: {
      selectMenu(index,event) {
        // console.log(index)
        if (!event._constructed) {
          return;
        }
        console.log('菜单栏点击的序号' + index)
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          // 初始化BScroll时给click属性才能实现移动设备点击（其实是滑动触摸），否则只能响应原生点击事件
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
          // 此处需要先取整在变正数
          // this.scrollY = Math.round(pos.y)
          // this.scrollY = pos.y
          console.log(this.scrollY)
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height);
        for (let i = 0; i<foodList.length; i++){
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
          console.log('foodList高度是：' + this.listHeight)
        }
      }

    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee'],
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          // 不使用 $nextTick()，this._initScroll()正常，this._calculateHeight()显示未定义的对象
          // $nextTick() 这个回调函数之后DOM才会发生改变，故与DOM属性相关的操作应当放在里面
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
          // console.log(this.goods)
        }
      })
        // 因为传入了seller,其中的classMap还需再定义一次

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goods.styl";
</style>
