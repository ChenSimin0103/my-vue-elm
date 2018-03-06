<template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="text">综合评分</div>
            <div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="showScore">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">好吃程度</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="showScore">{{seller.foodScore}}</span>
            </div>
            <div class="delivery">
              <span class="title">送达时间</span>
              <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect
          :select-type="selectType"
          :only-content="onlyContent"
          :desc="desc"
          :ratings="ratings"
          @select="selectRating"
          @toggle="toggleContent"
        ></ratingselect>
        <div class="ratings-wrapper">
          <ul>
            <li class="rating-item" v-for="rating in ratings">
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="item in rating.recommend">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from '../../components/star/star';
  import split from '../../components/split/split';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import {formatDateUsual} from '../../common/js/date.js';

  // 选择全部评论的值
  const ALL = 2;
  const ERR_OK = 0;

  export default {
    name: 'ratings',
    components: {
      star,
      split,
      ratingselect
    },
    props:{
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    computed: {},
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDateUsual(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {

    },
    // 在组件创建之初就拿到ratings数组
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno ===  ERR_OK)
          this.ratings = response.data;
//          console.log(response.data)
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings,{
            click: true
          })
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "ratings.styl";
</style>
