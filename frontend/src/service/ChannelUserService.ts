import graphQLService from '@/service/GraphQLService';

class ChannelUserService {
  async updatePassword(channel_name: string, newPassword: string) {
    const updatedChannel = await graphQLService.mutation(
      `
      mutation updatePassword( $channel_name: String!, $newPassword: String! ) {
        updatePassword ( channel_name: $channel_name, newPassword: $newPassword ) {
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
      mutation updateAdmin( $channel_name: String!, $newAdmin: Int! ) {
        updateAdmin ( channel_name: $channel_name, newAdmin: $newAdmin ) {
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

  async banUser(channel_name: string, banUser: number) {
    const updatedChannelUser = await graphQLService.mutation(
      `
      mutation updateBan( $channel_name: String!, $banUser: Int! ) {
        updateBan ( channel_name: $channel_name, banUser: $banUser ) {
          id
          ban
        }
      }
      `,
      { channel_name, banUser },
    );
    if (typeof updatedChannelUser === 'undefined')
      throw new Error('Not able to ban User');
    return updatedChannelUser;
  }

  async muteUser(channel_name: string, muteUser: number) {
    const updatedChannelUser = await graphQLService.mutation(
      `
      mutation updateMute( $channel_name: String!, $muteUser: Int! ) {
        updateMute ( channel_name: $channel_name, muteUser: $muteUser ) {
          id
          mute
        }
      }
      `,
      { channel_name, muteUser },
    );
    if (typeof updatedChannelUser === 'undefined')
      throw new Error('Not able to mute User');
    return updatedChannelUser;
  }

  async kickUser(channelName: string, userId: number) {
    const { kickChannelUser } = await graphQLService.mutation(
      `
      mutation kickChannelUser( $channelName: String!, $userId: Int! ) {
        kickChannelUser( channelName: $channelName, userId: $userId ) {
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
      { channelName, userId },
    );
    if (typeof kickChannelUser === 'undefined')
      throw new Error('Empty channel users data');
    return kickChannelUser;
  }
}
export default new ChannelUserService();
