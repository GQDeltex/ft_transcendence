import graphQLService from '@/service/GraphQLService';
import axios from 'axios';
import type {
  AllowedUpdateBlockingMethod,
  AllowedUpdateFriendshipMethod,
  AllowedUpdateEquippedItemsMethod,
  AllowedUpdateGameRequestMethod,
  Item,
  User,
} from '@/store/user';
import type { QueryOptions } from '@apollo/client/core/watchQueryOptions';

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

  async uploadPicture(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('picture', file);
    return axios
      .post(
        `http://${import.meta.env.VITE_DOMAIN}:8080/users/upload`,
        formData,
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        if (typeof res.data.url === 'undefined')
          throw new Error('Empty picture url.');
        return res.data.url;
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

  async findSelf(): Promise<User> {
    const { user } = await graphQLService.query(
      `
        query {
          user {
            id
            intra
            firstname
            lastname
            username
            title
            picture
            campus
            country
            coalition
            status
            lastLoggedIn
            twoFAEnable
            friends
            sentFriendRequests
            receivedFriendRequests
            blocks
            blockedBy
            inventory
            equipped {
              id
              type
              name
              description
              picture
              metadata
            }
            sentGameRequests_id
            receivedGameRequests_id
          }
        }
      `,
      undefined,
      { fetchPolicy: 'network-only' },
    );
    if (typeof user === 'undefined') throw new Error('Empty user data');
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const { user } = await graphQLService.query(
      `
        query User($id: Int!) {
          user(id: $id) {
            id
            intra
            firstname
            lastname
            username
            title
            picture
            campus
            country
            coalition
            status
            lastLoggedIn
          }
        }
      `,
      { id },
    );
    if (typeof user === 'undefined') throw new Error('Empty user data');
    return user;
  }

  async findAll(queryOptions: Partial<QueryOptions> = {}): Promise<User[]> {
    const { users } = await graphQLService.query(
      `
        query {
          users {
            id
            intra
            firstname
            lastname
            username
            title
            picture
            campus
            country
            coalition
            status
            lastLoggedIn
          }
        }
      `,
      {},
      queryOptions,
    );
    if (typeof users === 'undefined') throw new Error('Empty users data');
    return users;
  }

  async changeUsername(username: string) {
    const { updateUsername } = await graphQLService.mutation(
      `
      mutation updateUsername( $username: String! ){
        updateUsername( username: $username ) {
          username
        }
      }
      `,
      { username },
    );
    if (typeof updateUsername === 'undefined')
      throw new Error('Empty users data');
    return updateUsername;
  }

  async updateFriendship(
    method: AllowedUpdateFriendshipMethod,
    id: number,
  ): Promise<Partial<User>> {
    const { updateFriendship } = await graphQLService.mutation(
      `
        mutation updateFriendship($method: AllowedUpdateFriendshipMethod!, $id: Int!) {
          updateFriendship(method: $method, friendId: $id) {
            friends
            sentFriendRequests
            receivedFriendRequests
          }
        }
      `,
      { method, id },
    );
    if (typeof updateFriendship === 'undefined')
      throw new Error('Empty friends data');
    return updateFriendship;
  }

  async updateBlocking(
    method: AllowedUpdateBlockingMethod,
    id: number,
  ): Promise<Partial<User>> {
    const { updateBlocking } = await graphQLService.mutation(
      `
        mutation updateBlocking($method: AllowedUpdateBlockingMethod!, $id: Int!) {
          updateBlocking(method: $method, userId: $id) {
            friends
            sentFriendRequests
            receivedFriendRequests
            blocks
            blockedBy
            sentGameRequests_id
            receivedGameRequests_id
          }
        }
      `,
      { method, id },
    );
    if (typeof updateBlocking === 'undefined')
      throw new Error('Empty blocking data');
    return updateBlocking;
  }

  async getItems(): Promise<Item[]> {
    const { getItems } = await graphQLService.query(
      `
        query {
          getItems {
            id
            type
            name
            description
            price
            picture
            metadata
          }
        }
      `,
    );
    if (typeof getItems === 'undefined') throw new Error('Empty items data');
    return getItems;
  }

  async updateInventory(orderId: string): Promise<Partial<User>> {
    const { updateInventory } = await graphQLService.mutation(
      `
        mutation updateInventory($orderId: String!) {
          updateInventory(orderId: $orderId) {
            inventory
          }
        }
      `,
      { orderId },
    );
    if (typeof updateInventory === 'undefined')
      throw new Error('Empty inventory data');
    return updateInventory;
  }

  async updateEquippedItems(
    method: AllowedUpdateEquippedItemsMethod,
    itemId: number,
  ): Promise<Partial<User>> {
    const { updateEquippedItems } = await graphQLService.mutation(
      `
        mutation updateEquippedItems($method: AllowedUpdateEquippedItemsMethod!, $itemId: Int!) {
          updateEquippedItems(method: $method, itemId: $itemId) {
            equipped {
              id
              type
              name
              description
              picture
              metadata
            }
          }
        }
      `,
      { method, itemId },
    );
    if (typeof updateEquippedItems === 'undefined')
      throw new Error('Empty equipped data');
    return updateEquippedItems;
  }

  async findLeaders(): Promise<Partial<User>[]> {
    const { leaders } = await graphQLService.query(
      `
          query {
              leaders {
                  id
                  username
                  title
                  picture
                  points
              }
          }
          `,
    );
    if (typeof leaders === 'undefined') throw new Error('Empty leaders data');
    return leaders;
  }

  async updateGameRequest(
    method: AllowedUpdateGameRequestMethod,
    userId: number,
  ): Promise<Partial<User>> {
    const { updateGameRequest } = await graphQLService.mutation(
      `
      mutation updateGameRequest($method: AllowedUpdateGameRequestMethod!, $userId: Int!) {
        updateGameRequest(method: $method, userId: $userId) {
          sentGameRequests_id
          receivedGameRequests_id
        }
      }
      `,
      { method, userId },
    );
    if (typeof updateGameRequest === 'undefined')
      throw new Error('Empty game request data');
    return updateGameRequest;
  }
}

export default new UserService();
