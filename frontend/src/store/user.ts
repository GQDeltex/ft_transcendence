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
    is2FAEnabled: false,
  }),
  actions: {
    async login(code: string, bypassId: string | null): Promise<void> {
      try {
        const { id, is2FAEnabled } = await UserService.fetchJwtAndId(
          code,
          bypassId,
        );
        this.is2FAEnabled = is2FAEnabled;
        if (is2FAEnabled && !this.isLoggedIn) return;

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
    async verify2FA(code: string): Promise<void> {
      try {
        const { id } = await UserService.verify2FA(code);

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
