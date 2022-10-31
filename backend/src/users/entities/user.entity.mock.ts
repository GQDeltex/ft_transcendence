import { User } from './user.entity';

export const createMockUser = (options: Partial<User> = {}): User => {
  const user = new User();
  user.id = 12345;
  user.email = 'test@example.com';
  user.intra = 'logName';
  user.firstname = 'test';
  user.lastname = 'person';
  user.username = 'test';
  user.title = [''];
  user.picture = 'https://example.com';
  user.campus = 'Berlin';
  user.country = 'Germany';
  user.coalition = 'Fluvius';
  user.inventory = [];
  user.equipped = [];
  user.status = 'offline';
  (user.lastLoggedIn = new Date()).setMilliseconds(0);
  user.twoFASecret = null;
  user.twoFAEnable = false;
  user.following_id = [];
  user.followers_id = [];
  user.blocking_id = [];
  user.blockedBy_id = [];
  user.channelList = [];
  user.socketId = '';
  Object.assign(user, options);
  return user;
};

export const mockUser: User = createMockUser({
  id: 84364,
  email: 'nobody@example.com',
  intra: 'logName',
  firstname: 'nobody',
  lastname: 'knows',
  username: 'name',
  picture: 'https://example.com',
  campus: 'Unicorns 4 Lyfe',
  country: 'United States',
});

export const mockUser2: User = createMockUser({
  id: 9865,
  email: 'henneforpresident@gmail.com',
  intra: 'logName',
  firstname: 'mr',
  lastname: 'henneh',
  username: 'president',
  picture: 'https://example.com',
  campus: 'TroubleMaker',
  country: 'United States',
});
