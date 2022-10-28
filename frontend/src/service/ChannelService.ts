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
			  }
			}
		  `,
    );
    if (typeof channels === 'undefined') throw new Error('Empty channels data');
    return channels;
  }
}

export default new ChannelService();
