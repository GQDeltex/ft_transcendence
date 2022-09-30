import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUsersRepository } from './mock.repository';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService, {
            provide: getRepositoryToken(User),
            useValue: mockUsersRepository,
        },],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
      expect(await service.findAll()).toStrictEqual([{
            id: 84364,
            username: "name",
            picture: "http://example.com",
            firstname: "nobody",
            lastname: "knows",
            email: "nobody@example.com",
            country: "United States",
            campus: "Unicorns 4 Lyfe",
        },]);
  });
});
