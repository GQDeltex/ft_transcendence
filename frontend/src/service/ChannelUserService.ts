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

  async updateAdmin(channel_name: string, newAdmin: number) {
    const updatedChannelUser = await graphQLService.mutation(
      `
            mutation updateAdmin( $channel_name: String!, $newAdmin: Int! ){
              updateAdmin ( channel_name: $channel_name, newAdmin: $newAdmin ){
                id
                admin
              }
            }
            `,
      { channel_name, newAdmin },
    );
    if (typeof updatedChannelUser === 'undefined')
      throw new Error('Not able to update admin');
    return updatedChannelUser;
  }
}

export default new ChannelUserService();
