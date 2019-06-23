import Vue from 'vue'
import Router from 'vue-router'

import UseElement from '../components/useElementUi/useElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/useElement', name: 'useElement', component: UseElement},
    {path: '/login', name: 'login', component: Login},
    {path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '/users', name: 'users', component: Users}
      ]}
  ]
})
