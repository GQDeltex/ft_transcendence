import graphQLService from './GraphQLService';
import type { QueryOptions } from '@apollo/client/core/watchQueryOptions';

class ChannelService {
  async findAll(queryOptions: Partial<QueryOptions> = {}) {
    const { channels } = await graphQLService.query(
      `
			query {
			  channels {
				id
				name
				private
        userList {
          id
          user_id
          channel_name
          admin
          owner
          ban
          mute
          }
			  }
			}
		  `,
      {},
      queryOptions,
    );
    if (typeof channels === 'undefined') throw new Error('Empty channels data');
    return channels;
  }

  async updatePublic(channelName: string, pp: boolean) {
    const { updateChannelPublic } = await graphQLService.mutation(
      `
			  mutation updateChannelPublic($channelName: String!, $private: Boolean!) {
				updateChannelPublic(channelName: $channelName, private: $private) {
				  id
				  name
				  private
          userList {
            id
            user_id
            channel_name
            admin
            owner
            ban
            mute
            }
				  }
			  }
			`,
      { channelName, private: pp },
    );
    if (typeof updateChannelPublic === 'undefined')
      throw new Error('Empty channel data');
    return updateChannelPublic;
  }
}

export default new ChannelService();
