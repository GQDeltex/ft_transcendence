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

  //   async leave(channel_name: string) {
  //     const { channels } = await graphQLService.query(
  //       `
  // 	  	mutation leaveChannel( $channel_name: String!){
  // 		leaveChannel ( channel_name: $channel_name){
  // 		  id
  // 		}
  // 	  }
  // 	  `,
  // 	  { channel_name}
  //     );
  //     if (typeof channels === 'undefined') throw new Error('Empty channels data');
  //     return channels;
  //   }
}

export default new ChannelService();
