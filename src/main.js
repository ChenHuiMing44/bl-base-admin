/* eslint-disable no-empty-label,no-mixed-spaces-and-tabs */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/bee.min'
import './script/filters'
import $ajax from './script/ajax'
Vue.use(ElementUI)
Vue.prototype.$ajax = $ajax
//导入样式
import './styles/common.css'
import './assets/font/iconfont.css'
import './styles/element-reset.css'
Vue.config.productionTip = false
import Env from './utils/env'

console.log(
  'dev:',
  Env.isDev(),
  'test:',
  Env.isTest(),
  'pro:',
  Env.isPro(),
  'mock',
  Env.isMock()
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
