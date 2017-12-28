<template>
    <div class="star" :class="starType">
        <span
          v-for="(itemClass,index) in itemClasses"
          :key="index"
          :class="itemClass"
          class="star-item"
        >233</span>
    </div>
</template>

<script type="text/ecmascript-6">
  // 此处将可配置项提出来，方便修改
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    name: 'star',
    components: {},
    // 外部传入的数据来决定显示样式（size决定星星的大小，评分score决定星星的个数）
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data () {
      return {

      }
    },
    computed: {
      starType(){
        return  'star-' + this.size
      },
      itemClasses() {
          let result = []
          let score = Math.floor(this.score * 2) / 2
          let hasDecimal = ( score % 1 !== 0 )
          let integer = Math.floor(score)
          for (let i=0;i<integer;i++) {
            result.push(CLS_ON)
          }
          if (hasDecimal) {
            result.push(CLS_HALF)
          }
          while (result.length < LENGTH)
            result.push(CLS_OFF)
          return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./star.styl"
  @import '../../common/stylus/mixin.styl'

</style>
