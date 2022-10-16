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
    twoFAEnable: useLocalStorage('twoFAEnable', false),
    require2FAverify: false,
  }),
  actions: {
    async login(code: string, bypassId: string | null): Promise<void> {
      try {
        const { id, require2FAverify } = await UserService.fetchJwtAndId(
          code,
          bypassId,
        );
        this.require2FAverify = require2FAverify;
        if (require2FAverify && !this.isLoggedIn) return;

        await this.fetchUserData(id);
      } catch (error) {
        useErrorStore().setError((error as Error).message);
        await this.logout();
      }
    },
    async verify2FA(code: string): Promise<void> {
      try {
        const { id } = await UserService.verify2FA(code);
        await this.fetchUserData(id);
      } catch (error) {
        useErrorStore().setError((error as Error).message);
        await this.logout();
      }
    },
    async fetchUserData(id: number): Promise<void> {
      const user = await UserService.findOneById(id);
      this.isLoggedIn = true;
      this.id = user.id;
      this.username = user.username;
      this.title = user.title[0];
      this.picture = user.picture;
      this.twoFAEnable = user.twoFAEnable;
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
    async disable2FA(): Promise<boolean> {
      try {
        await UserService.disable2FA();
        this.twoFAEnable = false;
        return true;
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
      return false;
    },
    async enable2FA(code: string): Promise<boolean> {
      try {
        await UserService.enable2FA(code);
        this.twoFAEnable = true;
        return true;
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
      return false;
    },
    async generate2FA(): Promise<string> {
      try {
        return await UserService.generate2FA();
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
      return '';
    },
  },
});
