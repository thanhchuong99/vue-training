import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/grade2',
      name: 'Practice',
      component: () => import('@/views/Grade2View.vue')
    },
    {
      path: '/product',
      name: 'Product',
      component: () => import('@/views/ProductView.vue')
    }
  ]
})

export default router
