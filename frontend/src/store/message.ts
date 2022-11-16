import { defineStore } from 'pinia';
import type { User } from './user';
import { useUserStore } from './user';

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
  isNew: boolean;
}

export const useMessagesStore = defineStore('Messages', {
  state: () => ({
    messages: [] as Message[],
    notifiedList: [] as string[],
  }),
  getters: {
    // getMessagesForChannel(channelName: string): Message[] {
    //   return this.messages.filter((message) => message.to.name === channelName);
    // }
    isNotified(state) {
      return (name: string) => {
        return state.notifiedList.includes(name);
      };
    },
  },
  actions: {
    saveMessage(message: Message) {
      this.messages.push(message);
      if (!message.isNew || message.from.id === useUserStore().id) return;
      if (
        message.to.name === useUserStore().username &&
        !this.isNotified(message.from.name)
      )
        this.notifiedList.push(message.from.name);
      else if (!this.isNotified(message.to.name))
        this.notifiedList.push(message.to.name);
    },
  },
});
