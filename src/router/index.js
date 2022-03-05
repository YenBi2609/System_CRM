import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/client',
    name: 'Client',
    component: () => import('../views/client/index.vue')
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
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('../views/Project.vue')
  },
  {
    path: '/bill',
    name: 'Bill',
    component: () => import('../views/Bill.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router