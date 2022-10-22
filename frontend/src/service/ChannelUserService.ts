import graphQLService from '@/plugin/GraphQLService';
//import axios from 'axios';

class ChannelUserService {
  async updatePassword(channel_name: string, newPassword: string) {
    graphQLService.mutation(
      `
            mutation updatePassword( $channel_name: String!, $newPassword: String! ){
            }
            `,
      { channel_name, newPassword },
    );
  }
}

export default new ChannelUserService();
