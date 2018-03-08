<template>
    <div class="ratingselect">
      <div class="rating-type border-1px">
        <span
          class="block positive"
          :class="{'active': selectType===2}"
          @click="select(2,$event)"
        >{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span
          class="block positive"
          :class="{'active': selectType===0}"
          @click="select(0,$event)"
        >{{desc.positive}}<span class="count">{{positiveRatings.length}}</span></span>
        <span
          class="block negative"
          :class="{'active': selectType===1}"
          @click="select(1,$event)"
        >{{desc.negative}}<span class="count">{{negativeRatings.length}}</span></span>
      </div>
      <div
        class="switch"
        :class="{'on': onlyContent}"
        @click="toggleContent($event)"
      >
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  // 预定义 全部，推荐及吐槽的值，便于维护
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    components: {},
    props: {
      // 拿到的数据
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      // 已点选的类型
      selectType: {
        type: Number,
        default: ALL
      },
      // 是否只看有内容的评论
      onlyContent: {
        type: Boolean,
        default: false
      },
      // 描述
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data () {
      return {
//        ratings: [],
//        selectType: ALL
//        onlyContent: false,
//        desc: {}
      }
    },
    computed: {
      positiveRatings() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negativeRatings() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit('select', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('toggle',this.onlyContent)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "ratingselect.styl";

</style>
