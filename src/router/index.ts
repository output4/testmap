import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/map'
    },
    {
      path: '/map',
      name: 'map',
      component: import('../views/MapPage')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About')
    }
  ]
})

export default router
