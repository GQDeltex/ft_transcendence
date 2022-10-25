import { User } from './user.entity';

export const createMockUser = (options: Partial<User> = {}): User => {
  const user = new User();
  user.id = 12345;
  user.username = 'test';
  user.picture = 'https://example.com';
  user.firstname = 'test';
  user.lastname = 'person';
  user.intra = 'logName';
  user.email = 'test@example.com';
  user.country = 'Germany';
  user.campus = 'Berlin';
  user.title = [''];
  user.twoFASecret = null;
  user.twoFAEnable = false;
  user.socketId = '';
  user.status = 'offline';
  user.following_id = [];
  user.followers_id = [];
  user.blocking_id = [];
  user.blockedBy_id = [];
  user.channelList = [];
  Object.assign(user, options);
  return user;
};

export const mockUser: User = createMockUser({
  id: 84364,
  username: 'name',
  picture: 'https://example.com',
  firstname: 'nobody',
  lastname: 'knows',
  intra: 'logName',
  email: 'nobody@example.com',
  country: 'United States',
  campus: 'Unicorns 4 Lyfe',
});

export const mockUser2: User = createMockUser({
  id: 9865,
  username: 'president',
  picture: 'https://example.com',
  firstname: 'mr',
  lastname: 'henneh',
  intra: 'logName',
  email: 'henneforpresident@gmail.com',
  country: 'United States',
  campus: 'TroubleMaker',
});
