import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { Intra42Controller } from './intra42.controller';

describe('Intra42Controller', () => {
  let controller: Intra42Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Intra42Controller],
      providers: [JwtService, UsersService],
    }).compile();

    controller = module.get<Intra42Controller>(Intra42Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
