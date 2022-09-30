import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Intra42Controller } from './intra42.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { mockUsersRepository } from '../users/mock.repository';

describe('Intra42Controller', () => {
  let controller: Intra42Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Intra42Controller],
      providers: [JwtService, UsersService, {
            provide: getRepositoryToken(User),
            useValue: mockUsersRepository,
        },],
    }).compile();

    controller = module.get<Intra42Controller>(Intra42Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
