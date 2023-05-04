import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('@/views/CampaignForm.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/CampaignDetail.vue')
    }
  ]
})

export default router
