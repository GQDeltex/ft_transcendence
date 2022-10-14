import { TestingModule, Test } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { getMockRepoProvider, testUser } from './memdb.mock';
import { UpdateUserPictureInput } from './dto/update-userpicture.input';
import { UpdateUserUsernameInput } from './dto/update-userusername.input';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let mockRepo: Repository<User>;

  beforeEach(async () => {
    const mockRepoProvider = await getMockRepoProvider('UsersResolver', User, [
      testUser,
    ]);
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService, ConfigService, mockRepoProvider],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    mockRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => mockRepo.manager.connection.close());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all users', async () => {
    await expect(resolver.findAll()).resolves.toEqual([testUser]);
  });

  it('should find user by id', async () => {
    await expect(resolver.findOneById(84364)).resolves.toEqual(testUser);
  });

  it('should not find non-existing user by id', async () => {
    await expect(resolver.findOneById(76439)).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should find user by username', async () => {
    await expect(resolver.findOneByUsername('name')).resolves.toEqual(testUser);
  });

  it('should not find non-existing user by username', async () => {
    await expect(resolver.findOneByUsername('nobody')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should update a users picture', async () => {
    const newUser = testUser;
    newUser.picture = 'http://test.whoknows.xyz';
    const updateUserPictureInput: UpdateUserPictureInput = {
      id: newUser.id,
      picture: newUser.picture,
    };
    await expect(
      resolver.updatePicture(updateUserPictureInput),
    ).resolves.toEqual(newUser);
  });

  it('should not update a users picture if user not exist', async () => {
    const newUser = testUser;
    newUser.picture = 'http://test.whoknows.xyz';
    newUser.id = 12345;
    const updateUserPictureInput: UpdateUserPictureInput = {
      id: newUser.id,
      picture: newUser.picture,
    };
    await expect(
      resolver.updatePicture(updateUserPictureInput),
    ).rejects.toThrow(EntityNotFoundError);
  });

  it('should update a users username', async () => {
    const newUser = testUser;
    newUser.username = 'testUser';
    const updateUserUsernameInput: UpdateUserUsernameInput = {
      id: newUser.id,
      username: newUser.username,
    };
    await expect(
      resolver.updateUsername(updateUserUsernameInput),
    ).resolves.toEqual(newUser);
  });

  it('should not update a users username if not exist', async () => {
    const updateUserUsernameInput: UpdateUserUsernameInput = {
      id: 948624,
      username: 'nothingtwice',
    };
    await expect(
      resolver.updateUsername(updateUserUsernameInput),
    ).rejects.toThrow(EntityNotFoundError);
  });
});
