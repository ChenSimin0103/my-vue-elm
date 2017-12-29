<template>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="item in goods">
            <span class="text border-1px" >
              <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0

  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    components: {},
    data () {
      return {
        goods: {}
      }
    },
    methods: {

    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee'],
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods)
        }
      })
        // 因为传入了seller,其中的classMap还需再定义一次

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goods.styl";
</style>
