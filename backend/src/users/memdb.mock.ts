import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const testUser: User = {
  id: 84364,
  username: 'name',
  picture: 'http://example.com',
  firstname: 'nobody',
  lastname: 'knows',
  email: 'nobody@example.com',
  country: 'United States',
  campus: 'Unicorns 4 Lyfe',
  twoFASecret: null,
  twoFAEnable: false,
  socketId: '',
};

export async function memdbMock(entity: any): Promise<DataSource> {
  return new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [entity],
    dropSchema: true,
    synchronize: true,
    logging: false,
  }).initialize();
}
