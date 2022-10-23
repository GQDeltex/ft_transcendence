import { User } from './user.entity';

export const createMockUser = (options: Partial<User> = {}): User => {
  const user = new User();
  user.id = 12345;
  user.username = 'test';
  user.picture = 'https://example.com';
  user.firstname = 'test';
  user.lastname = 'person';
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
  Object.assign(user, options);
  return user;
};

export const mockUser: User = createMockUser({
  id: 84364,
  username: 'name',
  picture: 'https://example.com',
  firstname: 'nobody',
  lastname: 'knows',
  email: 'nobody@example.com',
  country: 'United States',
  campus: 'Unicorns 4 Lyfe',
});
