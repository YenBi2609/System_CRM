import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/client',
    name: 'Client',
    component: () => import('../views/Client.vue')
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('../views/Task.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/call',
    name: 'Call',
    component: () => import('../views/Call.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/order/detail/:id',
    name: 'OrderDetail',
    component: () => import('@/components/DetailOrder.vue')
  },
  {
    path: '/order/new',
    name: 'NewOrder',
    component: () => import('@/components/DetailOrder.vue')
  },
  {
    path: '/task/:id',
    name: 'EditTask',
    component: () => import('../views/Task.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router