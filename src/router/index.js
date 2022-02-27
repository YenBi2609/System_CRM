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
    component: () => import('../views/Client.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router