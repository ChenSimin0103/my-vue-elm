<template>
    <div class="ratingselect">
<<<<<<< HEAD
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
=======
      <div class="rating-type">
        <span
          class="block positive"
          :class="{'active':selectType===2}"
          @click="select(2,$event)"
        >{{desc.all}}<span class="count">123</span></span>
        <span
          class="block positive"
          :class="{'active':selectType===1}"
          @click="select(1,$event)"
        >{{desc.positive}}<span class="count">223</span></span>
        <span
          class="block negative"
          :class="{'active':selectType===0}"
          @click="select(0,$event)"
        >{{desc.negative}}<span class="count">1323</span></span>
      </div>
      <div class="switch" @click="toggleContent">
        <span class="icon-check_circle" :class="{'on':onlyContent}"></span>
>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
<<<<<<< HEAD

=======
  // 预定义 全部，推荐及吐槽的值，便于维护
>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
<<<<<<< HEAD
    name: '',
    components: {},
    props: {
      ratings: {
=======
    components: {},
    props: {
      // 拿到的数据
      rating: {
>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
        type: Array,
        default() {
          return [];
        }
      },
<<<<<<< HEAD
=======
      // 已点选的类型
>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
      selectType: {
        type: Number,
        default: ALL
      },
<<<<<<< HEAD
=======
      // 是否只看有内容的评论
>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
      onlyContent: {
        type: Boolean,
        default: false
      },
<<<<<<< HEAD
=======
      // 描述
>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
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
      return {}
    },
<<<<<<< HEAD
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
=======
    methods: {
      select (type,event) {
        if(!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit('ratingtype.select',type)
>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
<<<<<<< HEAD

  @import "ratingselect.styl";


=======
  @import "ratingselect.styl";

>>>>>>> 42aa8e5e97234bd6837da72d881b8969f248ba58
</style>
