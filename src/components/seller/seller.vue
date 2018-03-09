<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>
                元
              </div>
            </li>
            <span class="line"></span>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>
                元
              </div>
            </li>
            <span class="line"></span>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>
                分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text" >{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">商家实景1</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="seller.avatar" height="90" width="120" backgroundColor="greenYellow">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="infos">
          <h1 class="title">商家信息</h1>
          <ul class="infos-content">
            <li class="infos-item" v-for="info in seller.infos">
              {{info}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import {saveToLocal,loadFromLocal} from '../../common/js/store'

  export default {
    name: 'seller',
    components: {
      star,
      split
    },
    props: {
      seller: {
        type :Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite')
        })()
      }
    },
    computed: {
      favoriteText() {
        return this.favorite?'已收藏':'未收藏';
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee'];
//      this.$nextTick(() => {
//        this.scroll = new BScroll(this.$refs.seller,{
//          click: true
//        });
//      })
    },
    watch: {
      // 因一开始seller没有被拿到时已经开始生成结构，而此时生成结构没有宽度导致之后不能使用滑动插件，故检测到seller变化之后再初始化一遍结构
      'seller'() {
        this._initScroll();
        this._initPics();
      }
    },
    ready() {
      this._initScroll();
      this._initPics();
    },
    methods: {
      _initScroll() {
        if (!this.scroll){
          this.scroll = new BScroll(this.$refs.seller,{
            click: true
          });
        }
        else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        // 在此计算wrapper里图片的实际宽度，因实际宽度大于视口(wrapper)时，better-scroll才能生效
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          // 在此手动拿到ul的宽度并进行修改
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                // 此表示横向滚动
                scrollX: true,
                // 还不是很明白这个属性的作用
                eventPassthrough: 'vertical'
              })
            }
            else {
                this.scroll.refresh();
              }
            })
          }
        },
      toggleFavorite() {
          this.favorite = !this.favorite;
          // 传入参数：id,key,value
          saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "seller.styl";
</style>
