import apolloClient from '@/plugin/apolloClient';
import gql from 'graphql-tag';
import axios from 'axios';

class UserService {
  async fetchJwtAndId(code: string, bypassId: string | null) {
    return axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/42intra/callback`, {
        params: { code, id: bypassId },
        withCredentials: true,
      })
      .then((res) => {
        if (
          typeof res.data.id === 'undefined' ||
          typeof res.data.isAuthenticated === 'undefined'
        )
          throw new Error('Empty user ID.');
        return { id: res.data.id, is2FAEnabled: !res.data.isAuthenticated };
      })
      .catch((error) => {
        if (typeof error.response === 'undefined') throw error;
        throw new Error(error.response.data.message);
      });
  }

  async verify2FA(code: string) {
    return axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/2fa/verify`, {
        params: { code },
        withCredentials: true,
      })
      .then((res) => {
        if (typeof res.data.id === 'undefined')
          throw new Error('Empty user ID.');
        return { id: res.data.id };
      })
      .catch((error) => {
        if (typeof error.response === 'undefined') throw error;
        throw new Error(error.response.data.message);
      });
  }

  async logout(): Promise<void> {
    await axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/42intra/logout`, {
        withCredentials: true,
      })
      .then(() => {
        return;
      })
      .catch((error) => {
        if (typeof error.response === 'undefined') throw error;
        throw new Error(error.response.data.message);
      });
  }

  async findOneById(id: number) {
    const { data, error, errors } = await apolloClient.query({
      query: gql`
        query User($id: Int!) {
          user(id: $id) {
            id
            username
            title
            picture
          }
        }
      `,
      variables: {
        id,
      },
    });

    if (error) throw new Error(error.message);
    if (errors && errors.length > 0) throw new Error(errors[0].message);
    if (typeof data === 'undefined' || typeof data.user === 'undefined')
      throw new Error('Empty user data');

    return data.user;
  }

  async findAll() {
    const { data, error, errors } = await apolloClient.query({
      query: gql`
        query {
          users {
            id
            username
            title
            picture
            status
          }
        }
      `,
    });

    if (error) throw new Error(error.message);
    if (errors && errors.length > 0) throw new Error(errors[0].message);
    if (typeof data === 'undefined' || typeof data.users === 'undefined')
      throw new Error('Empty user data');

    return data.users;
  }
}

export default new UserService();
