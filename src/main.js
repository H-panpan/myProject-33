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
