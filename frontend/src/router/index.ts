import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import PageNotFoundView from '../views/PageNotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
    },
    {
      path: '/:catchAll(.*)*',
      name: 'PageNotFoundView',
      component: PageNotFoundView,
    },
    {
      path: '/leaderboard',
      name: 'LeaderboardView',
      component: () => import('../views/LeaderboardView.vue'),
    },
    {
      path: '/chat',
      name: 'ChatView',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/skin',
      name: 'SkinView',
      component: () => import('../views/SkinView.vue'),
    },
  ],
});

export default router;
