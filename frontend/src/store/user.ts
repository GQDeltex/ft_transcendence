import { defineStore } from 'pinia';
import UserService from '@/service/UserService';
import { useErrorStore } from './error';

export type User = {
  isLogged?: boolean;
  id: number;
  intra: string;
  firstname: string;
  lastname: string;
  username: string;
  title: string[];
  picture: string;
  campus: string;
  country: string;
  status?: string;
  twoFAEnable?: boolean;
  require2FAVerify?: boolean;
  friends?: number[];
  sentFriendRequests?: number[];
  receivedFriendRequests?: number[];
  blocks?: number[];
  blockedBy?: number[];
  inventory?: number[];
};

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
};

export enum AllowedUpdateFriendshipMethod {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
  CANCEL = 'CANCEL',
}

export enum AllowedUpdateBlockingMethod {
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    id: -1,
    intra: '',
    firstname: '',
    lastname: '',
    username: '',
    title: [''],
    picture: '',
    campus: '',
    country: '',
    status: '',
    twoFAEnable: false,
    require2FAVerify: false,
    friends: [] as number[],
    sentFriendRequests: [] as number[],
    receivedFriendRequests: [] as number[],
    blocks: [] as number[],
    blockedBy: [] as number[],
    inventory: [] as number[],
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
      this.intra = user.intra;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.username = user.username;
      this.title = user.title;
      this.picture = user.picture;
      this.campus = user.campus;
      this.country = user.country;
      this.status = user.status ?? '';
      this.twoFAEnable = user.twoFAEnable ?? false;
      this.friends = user.friends ?? [];
      this.sentFriendRequests = user.sentFriendRequests ?? [];
      this.receivedFriendRequests = user.receivedFriendRequests ?? [];
      this.blocks = user.blocks ?? [];
      this.blockedBy = user.blockedBy ?? [];
      this.inventory = user.inventory ?? [];
    },
    async logout(): Promise<void> {
      if (this.isLoggedIn || this.id > 0) {
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
    async uploadPicture(file: File): Promise<void> {
      try {
        this.picture = await UserService.uploadPicture(file);
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
    },
    async updateFriendship(
      method: AllowedUpdateFriendshipMethod,
      id: number,
    ): Promise<void> {
      try {
        const user: Partial<User> = await UserService.updateFriendship(
          method,
          id,
        );
        this.friends = user.friends ?? [];
        this.sentFriendRequests = user.sentFriendRequests ?? [];
        this.receivedFriendRequests = user.receivedFriendRequests ?? [];
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
    },
    async updateBlocking(
      method: AllowedUpdateBlockingMethod,
      id: number,
    ): Promise<void> {
      try {
        const user: Partial<User> = await UserService.updateBlocking(
          method,
          id,
        );
        this.friends = user.friends ?? [];
        this.sentFriendRequests = user.sentFriendRequests ?? [];
        this.receivedFriendRequests = user.receivedFriendRequests ?? [];
        this.blocks = user.blocks ?? [];
        this.blockedBy = user.blockedBy ?? [];
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
    },
    async updateInventory(orderId: string): Promise<void> {
      try {
        const user: Partial<User> = await UserService.updateInventory(orderId);
        this.inventory = user.inventory ?? [];
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
    },
  },
});
