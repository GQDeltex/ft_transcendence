import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    errors: [] as string[],
  }),
  getters: {
    getErrors(): string[] {
      console.log('Getting Errors');
      return this.errors;
    },
  },
  actions: {
    setError(error: string): void {
      console.log('Adding new error: ', error);
      this.errors.push(error);
    },
    delError(error: string): void {
      console.log('Removing error: ', error);
      const index = this.errors.indexOf(error);
      if (index !== -1) this.errors.splice(index, 1);
    },
  },
});
