import graphQLService from '@/plugin/GraphQLService';
//import axios from 'axios';

class ChannelUserService {
  async updatePassword(channel_name: string, newPassword: string) {
    const updatedChannel = await graphQLService.mutation(
      `
            mutation updatePassword( $channel_name: String!, $newPassword: String! ){
              updatePassword ( channel_name: $channel_name, newPassword: $newPassword ){
                name
                password
              }
            }
            `,
      { channel_name, newPassword },
    );
    if (typeof updatedChannel === 'undefined')
      throw new Error('Not able to change password');
    return updatedChannel;
  }
}

export default new ChannelUserService();
