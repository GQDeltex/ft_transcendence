import graphQLService from '@/plugin/GraphQLService';
import axios from 'axios';

class UserService {
  async fetchJwt(code: string, bypassId?: string) {
    return axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/42intra/callback`, {
        params: { code, id: bypassId },
        withCredentials: true,
      })
      .then((res) => {
        if (typeof res.data.isAuthenticated === 'undefined')
          throw new Error('Empty user authentication.');
        return { require2FAVerify: !res.data.isAuthenticated };
      })
      .catch((error) => {
        if (typeof error.response === 'undefined') throw error;
        throw new Error(error.response.data.message);
      });
  }

  async generate2FA(): Promise<string> {
    return axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/2fa/generate`, {
        withCredentials: true,
        responseType: 'blob',
      })
      .then((res) => {
        return Math.random() > 0.1
          ? URL.createObjectURL(res.data)
          : 'https://cdn.discordapp.com/attachments/916804672633839658/1007751543396761630/redditsave.com_7w9x6aycsov81.gif';
      })
      .catch((error) => {
        if (typeof error.response === 'undefined') throw error;
        throw new Error(error.response.data.message);
      });
  }

  async verify2FA(code: string): Promise<void> {
    return axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/2fa/verify`, {
        params: { code },
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

  async disable2FA(): Promise<void> {
    return axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/2fa/disable`, {
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

  async enable2FA(code: string) {
    return axios
      .get(`http://${import.meta.env.VITE_DOMAIN}:8080/2fa/enable`, {
        params: { code },
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

  async findSelf() {
    const { user } = await graphQLService.query(
      `
        query {
          user {
            id
            username
            title
            picture
            status
            twoFAEnable
          }
        }
      `,
      undefined,
      { fetchPolicy: 'network-only' },
    );
    if (typeof user === 'undefined') throw new Error('Empty user data');
    return user;
  }

  async findOneById(id: number) {
    const { user } = await graphQLService.query(
      `
        query User($id: Int!) {
          user(id: $id) {
            id
            username
            title
            picture
            twoFAEnable
          }
        }
      `,
      { id },
    );
    if (typeof user === 'undefined') throw new Error('Empty user data');
    return user;
  }

  async findAll() {
    const { users } = await graphQLService.query(
      `
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
    );
    if (typeof users === 'undefined') throw new Error('Empty users data');
    return users;
  }
}

export default new UserService();
