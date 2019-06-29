import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import UseElement from '../components/useElementUi/useElement.vue'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'
import Categories from '../components/categories/categories.vue'
import Goods from '../components/goods/goods.vue'
import Add from '../components/add/add.vue'
Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/useElement', name: 'useElement', component: UseElement},
    {path: '/login', name: 'login', component: Login},
    {path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '/users', name: 'users', component: Users},
        {path: '/rights', name: 'rights', component: Rights},
        {path: '/roles', name: 'roles', component: Roles},
        {path: '/categories', name: 'categories', component: Categories},
        {path: '/goods', name: 'goods', component: Goods},
        {path: '/goods/add', name: 'add', component: Add}
      ]}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    let token = window.localStorage.getItem('token')
    if (!token) {
      Message.error('请先登录')
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
