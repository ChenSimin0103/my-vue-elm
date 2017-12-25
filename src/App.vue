<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">to goods</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">to ratings</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">to seller</router-link>
      </div>
    </div>
    <img class="vueimg" src="./assets/logo.png">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from 'components/header/header'
  export default {
  name: 'app',
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

  /*#app .tab{*/
    /*display: flex;*/
    /*text-align: center;*/
  /*}*/
  #app
    .tab
      display:flex
      width: 100%
      height: 40px
      /*添加line-height=height后才能在之后做到垂直居中*/
      line-height: 40px
      border-bottom: 1px solid rgba(1,12,24,0.2)
      .tab-item
        flex: 1
        text-align: center
        .tab-item-a
          display: block
          font-size: 50px


    .vueimg
      width: 15px
      height: 30px
      float: right

</style>
