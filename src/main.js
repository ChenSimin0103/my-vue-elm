// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import VueResource from 'vue-resource'

// 在这里引入全局通用的样式（字符字体，1像素边框，适用整体的媒体查询）
import './common/stylus/index.styl'

//import styl from './common/stylus/index.js'

Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
