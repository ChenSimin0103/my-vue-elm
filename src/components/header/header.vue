<template>
    <div class="header">
      <div class="content-warpper">
        <div class="avatar">
          <img v-bind:src="seller.avatar">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="support" v-if="seller.supports" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text" >{{item.type}}{{seller.supports[index].description}}</span>
          </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">233{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img  :src="seller.avatar">
      </div>
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>

            <star :size="48" :score="seller.score"></star>

          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close"></i>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'

  export default {
    name: 'header',
    components: {
      star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      }
    },
    created () {
      this.classMap = ['decrease','discount','special','invoice','guarantee']

    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import "../../common/stylus/mixin.styl";
  /*@import "../../common/stylus/icon.styl";*/
  .header {
    position: relative;
    /*此句使得超出范围的背景图片隐藏，因使用filter模糊图片使得背景超出容器*/
    overflow: hidden;
    color: #fff;
    background-color: rgba(7,17,27,0.5);
    /*background-color: green*/
  }

  .header .content-warpper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0
  }
  .header .content-warpper .avatar {
    display: inline-block;
    vertical-align: top;
  }
  .header .content-warpper .avatar img {
    width: 64px;
    height: 64px;
    border-radius: 10px;
  }
  .header .content-warpper .content {
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
  }
  .header .content-warpper .content .title {
    margin: 2px 0 8px 0
  }
  .header .content-warpper .content .title .brand {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    /*background-image: url("brand@2x.png")*/
    /*此处内容写在mixin.styl中*/
    bg-image('brand');
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  .header .content-warpper .content .title .name {
    margin-left: 6px;
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
  }
  .header .content-warpper .content .description {
    margin: 8px 0 10px 0;
    line-height: 12px;
    font-size: 12px;
  }
  .header .content-warpper .content .support {

  }
  .header .content-warpper .content .support .icon {
    display: inline-block;
    vertical-align: bottom;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .decrease {
    bg-image('decrease_1');
  }
  .discount {
    bg-image('discount_1');
  }
  .special {
    bg-image('special_1');
  }
  .invoice {
    bg-image('invoice_1');
  }
  .guarantee {
    bg-image('guarantee_1');
  }
  .header .content-warpper .content .support .text {
    line-height: 12px;
    font-size: 10px;
  }
  .content-warpper .support-count {
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 0 8px;
    /*width:; 48px;*/
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0,0,0,0.2);
    text-align: center;
  }
  .content-warpper .support-count .count {
    vertical-align: top;
    font-size: 10px;
  }
  .content-warpper .support-count .icon-keyboard_arrow_right {
    line-height: 24px;
    font-size: 10px;
    margin-left: 2px;
  }

  .header .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    /*此处设置使得隐藏超出范围文字并显示冒号*/
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    background-color: rgba(7,17,27,0.2);
  }
  .bulletin-wrapper .bulletin-title {
    display: inline-block;
    width: 24px;
    height: 14px;
    bg-image('bulletin');
    background-size: 24px 14px;
    background-repeat: no-repeat;
  }
  .bulletin-wrapper .bulletin-text {
    vertical-align: top;
    font-size: 10px;
  }
  .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 10px;

  }

  .header .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .header .background img{
    width: 100%;
    height: 100%;
  }

  .header .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
  }
  .header .detail .detail-wrapper {
    width: 100%;
    min-height: 100%;
  }
  .header .detail .detail-wrapper .detail-main {
    margin-top: 64px;
    /*此句完成了内容不和底部detail-close盒子重合的效果*/
    padding-bottom: 64px;
  }
  .header .detail .detail-wrapper .detail-main .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .header .detail .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }

</style>
