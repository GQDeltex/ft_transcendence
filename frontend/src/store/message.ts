import { defineStore } from 'pinia';
import type { User } from './user';

export type ChannelUser = {
  id: number;
  user: User;
  user_id: number;
  channelName: string;
  admin: boolean;
  owner: boolean;
  ban: boolean;
  mute: boolean;
};

export type Channel = {
  id: number;
  name: string;
  private: boolean;
  password: string;
  userList: ChannelUser[];
};

export interface Message {
  from: { id: number; name: string };
  to: { id?: number; name: string };
  msg: string;
}

export const useMessagesStore = defineStore('Messages', {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    saveMessage(message: Message) {
      this.messages.push(message);
    },
  },
});
