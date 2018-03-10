<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header';
  import {urlParse} from './common/js/util';

  const ERR_OK = 0;

  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {
          // 用一个立即执行函数从url中拿到商家id
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam)
            return queryParam.id;
          })()
        }
      }
    },
    // 此处使用生命周期钩子函数created()
    // 来在实例创建完成后立即调用此函数
    created() {
      this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
//          this.seller = response.data;
//          console.log(this.seller.id)
          this.seller = Object.assign({},this.seller,response.data)
//          console.log(this.seller)
        }
      });
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  /*#app .tab{*/
    /*display: flex;*/
    /*text-align: center;*/
  /*}*/

    .tab
      display:flex
      width: 100%
      height: 40px
      /*添加line-height=height后才能在之后做到垂直居中*/
      line-height: 40px
      /*border-bottom: 10px solid rgba(1,12,24,0.2)*/
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          /*此处将子组件充满父容器，使得可点击范围变为父容器的大小*/
          display: block
          font-size: 14px
          color: rgb(77,85,93)
          /*此处的active在index.js中通过linkActiveClass定义*/
          &.active
            color: rgb(240,20,20)


</style>
