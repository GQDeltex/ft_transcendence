import { User } from './user.entity';

export const mockUser: User = {
  id: 84364,
  username: 'name',
  picture: 'https://example.com',
  firstname: 'nobody',
  lastname: 'knows',
  email: 'nobody@example.com',
  country: 'United States',
  campus: 'Unicorns 4 Lyfe',
  title: [''],
  twoFASecret: null,
  twoFAEnable: false,
  socketId: '',
  status: 'offline',
  following: [],
  followers: [],
  channelList: [],
};

export const createMockUser = (options: Partial<User> = {}): User => ({
  id: 12345,
  username: 'test',
  picture: 'https://example.com',
  firstname: 'test',
  lastname: 'person',
  email: 'test@example.com',
  country: 'Germany',
  campus: 'Berlin',
  twoFASecret: null,
  twoFAEnable: false,
  socketId: '',
  title: [''],
  status: 'offline',
  following: [],
  followers: [],
  channelList: [],
  ...options,
});
