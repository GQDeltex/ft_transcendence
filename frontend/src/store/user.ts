import { defineStore } from 'pinia';
import UserService from '@/service/UserService';
import { useErrorStore } from './error';
import { useI18n } from 'vue-i18n';

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
  coalition: string;
  points: number;
  status?: string;
  lastLoggedIn?: number;
  twoFAEnable?: boolean;
  require2FAVerify?: boolean;
  friends?: number[];
  sentFriendRequests?: number[];
  receivedFriendRequests?: number[];
  blocks?: number[];
  blockedBy?: number[];
  inventory?: number[];
  equipped?: Item[];
  sentGameRequests_id?: number[];
  receivedGameRequests_id?: number[];
  rank?: number;
};

export type Item = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  picture: string;
  metadata: string;
};

export enum AllowedUpdateFriendshipMethod {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
  CANCEL = 'CANCEL',
}

export enum FriendStatusEnum {
  FRIEND = 'Remove friend',
  NOT_FRIEND = 'Add friend',
  REQUEST_SENT = 'Cancel friend request',
  REQUEST_RECEIVED = 'Accept friend request',
}

export enum AllowedUpdateBlockingMethod {
  BLOCK = 'BLOCK',
  UNBLOCK = 'UNBLOCK',
}

export enum BlockStatusEnum {
  BLOCKED = 'Unblock',
  NOT_BLOCKED = 'Block',
}

export enum AllowedUpdateEquippedItemsMethod {
  EQUIP = 'EQUIP',
  UNEQUIP = 'UNEQUIP',
}

export enum GameStatusEnum {
  NOT_SEND = 'Send game request',
  SENT = 'Cancel game request',
  RECEIVED = 'Accept game request',
}

export enum AllowedUpdateGameRequestMethod {
  SEND = 'SEND',
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
  CANCEL = 'CANCEL',
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
    coalition: '',
    points: 0,
    status: '',
    lastLoggedIn: 0,
    twoFAEnable: false,
    require2FAVerify: false,
    friends: [] as number[],
    sentFriendRequests: [] as number[],
    receivedFriendRequests: [] as number[],
    blocks: [] as number[],
    blockedBy: [] as number[],
    inventory: [] as number[],
    equipped: [] as Item[],
    sentGameRequests_id: [] as number[],
    receivedGameRequests_id: [] as number[],
    rank: -1,
  }),
  getters: {
    getFriendStatus: (state) => {
      return (friendId: number) => {
        if (state.friends.includes(friendId)) return FriendStatusEnum.FRIEND;
        if (state.sentFriendRequests.includes(friendId))
          return FriendStatusEnum.REQUEST_SENT;
        if (state.receivedFriendRequests.includes(friendId))
          return FriendStatusEnum.REQUEST_RECEIVED;
        return FriendStatusEnum.NOT_FRIEND;
      };
    },
    getBlockStatus: (state) => {
      return (blockId: number) => {
        if (state.blocks.includes(blockId)) return BlockStatusEnum.BLOCKED;
        return BlockStatusEnum.NOT_BLOCKED;
      };
    },
    isItemEquipped: (state) => {
      return (itemId: number) => {
        return state.equipped.some((item) => item.id === itemId);
      };
    },
    getGameRequestStatus: (state) => {
      return (userId: number) => {
        if (state.sentGameRequests_id.includes(userId))
          return GameStatusEnum.SENT;
        if (state.receivedGameRequests_id.includes(userId))
          return GameStatusEnum.RECEIVED;
        return GameStatusEnum.NOT_SEND;
      };
    },
  },
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
    async fetchSelfData(withRank = false): Promise<void> {
      const user = await UserService.findSelf(withRank);
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
      this.coalition = user.coalition;
      this.status = user.status ?? '';
      this.lastLoggedIn = user.lastLoggedIn ?? 0;
      this.twoFAEnable = user.twoFAEnable ?? false;
      this.friends = user.friends ?? [];
      this.sentFriendRequests = user.sentFriendRequests ?? [];
      this.receivedFriendRequests = user.receivedFriendRequests ?? [];
      this.blocks = user.blocks ?? [];
      this.blockedBy = user.blockedBy ?? [];
      this.inventory = user.inventory ?? [];
      this.equipped = user.equipped ?? [];
      this.sentGameRequests_id = user.sentGameRequests_id ?? [];
      this.receivedGameRequests_id = user.receivedGameRequests_id ?? [];
      this.rank = user.rank ?? -1;
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
        this.sentGameRequests_id = user.sentGameRequests_id ?? [];
        this.receivedGameRequests_id = user.receivedGameRequests_id ?? [];
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
    async updateEquippedItems(itemId: number): Promise<void> {
      try {
        const user: Partial<User> = await UserService.updateEquippedItems(
          this.isItemEquipped(itemId)
            ? AllowedUpdateEquippedItemsMethod.UNEQUIP
            : AllowedUpdateEquippedItemsMethod.EQUIP,
          itemId,
        );
        this.equipped = user.equipped ?? [];
      } catch (error) {
        useErrorStore().setError((error as Error).message);
      }
    },
    async updateGameRequest(
      method: AllowedUpdateGameRequestMethod,
      userId: number,
    ): Promise<boolean> {
      try {
        const user: Partial<User> = await UserService.updateGameRequest(
          method,
          userId,
        );
        this.sentGameRequests_id = user.sentGameRequests_id ?? [];
        this.receivedGameRequests_id = user.receivedGameRequests_id ?? [];
        return true;
      } catch (error) {
        useErrorStore().setError((error as Error).message);
        return false;
      }
    },
  },
});
