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
      path: '/chat',
      name: 'ChatView',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: () => import('../views/ProfileView.vue'),
    },
  ],
});

router.beforeResolve(async (to) => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn && to.name !== 'LoginView') {
    return { name: 'LoginView' };
  }

  if (!userStore.isLoggedIn && to.name === 'LoginView') {
    try {
      const isLoggedIn = await userStore.signIn();
      if (isLoggedIn) {
        return { name: 'home' };
      }
    } catch (error) {
      // TODO: handle error using state (pinia)
      // https://stackoverflow.com/questions/72652304/vue-js-v3-use-error-component-without-changing-url
      console.log(error);
      return { name: 'LoginView' };
    }
  }

  if (userStore.isLoggedIn && to.name === 'LoginView') {
    return { name: 'home' };
  }

  return true;
});

export default router;
