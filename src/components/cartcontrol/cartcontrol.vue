<template>
    <div class="cartcontrol">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    name: '',
    components: {},
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      addCart() {
        console.log('had click')
        if (!this.food.count)
//          this.food.count = 1;
          Vue.set(this.food, 'count', 1);
        else
          this.food.count++;
      },
      decreaseCart() {
        if (this.food.count)
          this.food.count--;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "cartcontrol.styl";

</style>
