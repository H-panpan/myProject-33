// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Eltree from 'element-tree-grid'
import 'element-ui/lib/theme-chalk/index.css'
import myaxios from '@/assets/js/myaxios.js'
import './assets/css/index.css'

// 定义全局的时间过滤器
// 格式化时间的过滤器
Vue.filter('dateFormat', (originVal) => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const d = dt
    .getDate()
    .toString()
    .padStart(2, '0')

  const hh = dt
    .getHours()
    .toString()
    .padStart(2, '0')
  const mm = dt
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const ss = dt
    .getSeconds()
    .toString()
    .padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(myaxios)
Vue.component(Eltree.name, Eltree)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render: h => h(App`)
})
