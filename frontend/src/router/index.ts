import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import PageNotFoundView from '../views/PageNotFoundView.vue';
import { useUserStore } from '@/store/user';

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
      path: '/play',
      name: 'PongView',
      component: () => import('../views/PongView.vue'),
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
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/profile/:id',
      name: 'ProfileView',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/queue',
      name: 'QueueView',
      component: () => import('../views/QueueView.vue'),
    },
    {
      path: '/stream',
      name: 'StreamView',
      component: () => import('../views/StreamView.vue'),
    },
  ],
});

router.beforeResolve(async (to) => {
  const userStore = useUserStore();

  try {
    await userStore.fetchSelfData();
  } catch (error) {
    await userStore.logout();
  }

  if (!userStore.isLoggedIn && to.name !== 'LoginView') {
    return { name: 'LoginView' };
  }

  if (!userStore.isLoggedIn && to.name === 'LoginView' && to.query['code']) {
    // Remove bypass for production
    await userStore.login(
      to.query['code'] as string,
      to.query['id'] as string | undefined,
    );
    delete to.query.code;
    to.fullPath = to.path;
  }

  if (userStore.isLoggedIn && to.name === 'LoginView') {
    return { name: 'home' };
  }

  return true;
});

export default router;
