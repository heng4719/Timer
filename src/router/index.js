import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Timer from '../views/counter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/timer',
    name: 'timer',
    component: Timer
  }
]

const router = new VueRouter({
  routes
})

export default router
