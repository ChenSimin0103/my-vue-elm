<template>
    <div v-show="showFlag" class="food">

    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    components: {},
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {}
    },
    methods: {

    },
    computed:{

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "food.styl";

</style>
