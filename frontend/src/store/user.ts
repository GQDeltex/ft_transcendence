import { defineStore } from 'pinia';
import UserService from '@/service/UserService';
import { useErrorStore } from './error';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    id: '',
    username: '',
    title: '',
    picture: '',
    twoFAEnable: false,
    require2FAVerify: false,
  }),
  actions: {
    async login(code: string, bypassId?: string): Promise<void> {
      try {
        const { require2FAVerify } = await UserService.fetchJwt(code, bypassId);
        this.require2FAVerify = require2FAVerify;
        if (require2FAVerify && !this.isLoggedIn) return;
        await this.fetchSelfData();
      } catch (error) {
        useErrorStore().setError((error as Error).message);
        await this.logout();
      }
    },
    async verify2FA(code: string): Promise<void> {
      try {
        await UserService.verify2FA(code);
        await this.fetchSelfData();
      } catch (error) {
        useErrorStore().setError((error as Error).message);
        await this.logout();
      }
    },
    async fetchSelfData(): Promise<void> {
      const user = await UserService.findSelf();
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
