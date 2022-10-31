import graphQLService from './GraphQLService';

class ChannelService {
  async findAll() {
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
    );
    if (typeof channels === 'undefined') throw new Error('Empty channels data');
    return channels;
  }

  async updatePublic(channelName: string, pp: boolean) {
    const { updateChannelPublic } = await graphQLService.mutation(
      `
			  mutation UpdateChannelPublic($channelName: String!, $private: Boolean!) {
				updateChannelPublic(channelName: $channelName, private: $private) {
				  id
				  name
				  private
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
