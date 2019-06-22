import Vue from 'vue'
import Router from 'vue-router'

import UseElement from '../components/useElementUi/useElement.vue'
import Login from '../components/login/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/useElement', name: 'useElement', component: UseElement},
    {path: '/login', name: 'login', component: Login}
  ]
})
