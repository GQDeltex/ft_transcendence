import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import apolloClient from '@/plugin/apolloClient';
import gql from 'graphql-tag';
import { useCookies } from '@vueuse/integrations/useCookies';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: useLocalStorage('token', ''),
    id: useLocalStorage('userId', ''),
    username: useLocalStorage('username', ''),
    picture: useLocalStorage('userPicture', ''),
  }),
  getters: {
    isLoggedIn(): boolean {
      return this.token !== '';
    },
  },
  actions: {
    async signIn(): Promise<boolean> {
      const jwt_token: string | null = useCookies(['jwt']).get('jwt');
      if (!jwt_token) return false;

      const {
        id,
      }: {
        id: number;
      } = parseJwt(jwt_token);
      if (!id) return false;

      const { data, error } = await apolloClient.query({
        query: gql`
          query User($id: Int!) {
            user(id: $id) {
              id
              username
              picture
            }
          }
        `,
        variables: {
          id,
        },
      });

      if (error) throw new Error(error.message);
      if (!data) return false;

      this.token = jwt_token;
      this.id = data.user.id;
      this.username = data.user.username;
      this.picture = data.user.picture;
      return true;
    },
    logOut(): void {
      if (this.isLoggedIn) {
        localStorage.clear();
        this.$reset();
        useCookies(['jwt']).remove('jwt');
      }
    },
  },
});
