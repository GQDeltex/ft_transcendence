import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import UserService from '@/service/UserService';
import { useErrorStore } from './error';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: useLocalStorage('isLoggedIn', false),
    id: useLocalStorage('userId', ''),
    username: useLocalStorage('username', ''),
    title: useLocalStorage('title', ''),
    picture: useLocalStorage('userPicture', ''),
  }),
  actions: {
    async login(code: string): Promise<void> {
      try {
        const id: number = await UserService.fetchJwtAndId(code);
        const user = await UserService.findOneById(id);
        this.isLoggedIn = true;
        this.id = user.id;
        this.username = user.username;
        this.title = user.title[0];
        this.picture = user.picture;
      } catch (error) {
        useErrorStore().setError((error as Error).message);
        await this.logout();
      }
    },
    async logout(): Promise<void> {
      if (this.isLoggedIn || this.id !== '') {
        try {
          localStorage.clear();
          this.$reset();
          await UserService.logout();
        } catch (error) {
          useErrorStore().setError((error as Error).message);
        }
      }
    },
  },
});
