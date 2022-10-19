import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { mockUser } from './entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { UpdateUserPictureInput } from './dto/update-userpicture.input';
import { UpdateUserUsernameInput } from './dto/update-userusername.input';
import { ConfigService } from '@nestjs/config';
import { EntityNotFoundError } from 'typeorm';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let mockRepo: MockRepo;

  beforeEach(async () => {
    mockRepo = new MockRepo('UsersResolver', User, mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        ConfigService,
        mockRepo.getProvider(),
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  afterEach(async () => await mockRepo.clearRepo());
  afterAll(async () => await mockRepo.destroyRepo());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all users', async () => {
    await expect(resolver.findAll()).resolves.toEqual([
      mockRepo.getTestEntity(),
    ]);
  });

  it('should find self by id in jwt token', async () => {
    await expect(
      resolver.findOneById(undefined, {
        username: 'test',
        id: mockRepo.getTestEntity().id,
        email: 'test@example.com',
        isAuthenticated: true,
      }),
    ).resolves.toEqual(mockRepo.getTestEntity());
  });

  it('should find user by id', async () => {
    await expect(
      resolver.findOneById(84364, {
        username: 'test',
        id: 12345,
        email: 'test@example.com',
        isAuthenticated: true,
      }),
    ).resolves.toEqual(mockRepo.getTestEntity());
  });

  it('should not find non-existing user by id', async () => {
    await expect(
      resolver.findOneById(76439, {
        username: 'test',
        id: 12345,
        email: 'test@example.com',
        isAuthenticated: true,
      }),
    ).rejects.toThrow(EntityNotFoundError);
  });

  it('should find user by username', async () => {
    await expect(resolver.findOneByUsername('name')).resolves.toEqual(
      mockRepo.getTestEntity(),
    );
  });

  it('should not find non-existing user by username', async () => {
    await expect(resolver.findOneByUsername('nobody')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should update a users picture', async () => {
    const newUser = mockRepo.getTestEntity({
      picture: 'http://test.whoknows.xyz',
    });
    const updateUserPictureInput: UpdateUserPictureInput = {
      picture: newUser.picture,
    };
    await expect(
      resolver.updatePicture(updateUserPictureInput, newUser),
    ).resolves.toEqual(newUser);
  });

  it('should not update a users picture if user not exist', async () => {
    const newUser = mockRepo.getTestEntity({
      id: 678,
      picture: 'http://test.whoknows.xyz',
    });
    const updateUserPictureInput: UpdateUserPictureInput = {
      picture: newUser.picture,
    };
    await expect(
      resolver.updatePicture(updateUserPictureInput, newUser),
    ).rejects.toThrow(EntityNotFoundError);
  });

  it('should update a users username', async () => {
    const newUser = mockRepo.getTestEntity({ username: 'testUser' });
    const updateUserUsernameInput: UpdateUserUsernameInput = {
      username: newUser.username,
    };
    await expect(
      resolver.updateUsername(updateUserUsernameInput, newUser),
    ).resolves.toEqual(newUser);
  });

  it('should not update a users username if not exist', async () => {
    const newUser = mockRepo.getTestEntity({
      id: 8974632,
    });
    const updateUserUsernameInput: UpdateUserUsernameInput = {
      username: 'nothingtwice',
    };
    await expect(
      resolver.updateUsername(updateUserUsernameInput, newUser),
    ).rejects.toThrow(EntityNotFoundError);
  });
});
