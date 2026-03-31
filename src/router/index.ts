import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/en/'
    },
    {
      path: '/en/',
      name: 'en-home',
      component: () => import('../views/HomeView.vue'),
      props: { locale: 'en' }
    },
    {
      path: '/zh/',
      name: 'zh-home',
      component: () => import('../views/HomeView.vue'),
      props: { locale: 'zh' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/en/'
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
