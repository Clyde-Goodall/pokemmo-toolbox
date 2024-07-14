import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/berrytimer',
      name: 'timer',
      component: () => import('../views/BerryView.vue')
    },
    {
      path: '/statcalc',
      name: 'calculator',
      component: () => import('../views/CalcView.vue')
    }
  ]
})

export default router
