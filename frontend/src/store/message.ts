import { defineStore } from 'pinia';

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
