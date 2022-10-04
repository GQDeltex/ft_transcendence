import { JwtService } from '@nestjs/jwt';
import { Intra42Controller } from './intra42.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { memdbMock, testUser } from '../users/memdb.mock';
import { Repository, Connection } from 'typeorm';

describe('Intra42Controller', () => {
  let db: Connection;
  let service: UsersService;
  let usersRepository: Repository<User>;
  let controller: Intra42Controller;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    usersRepository.insert(testUser);
    service = new UsersService(usersRepository);
    controller = new Intra42Controller(new JwtService(), service);
  });

  afterEach(async () => db.close());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
