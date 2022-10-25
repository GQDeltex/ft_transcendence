import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { mockUser } from './entities/user.entity.mock';
import { MockRepo } from '../tools/memdb.mock';
import { UpdateUserUsernameInput } from './dto/update-userusername.input';
import { ConfigService } from '@nestjs/config';
import { EntityNotFoundError } from 'typeorm';
import { Channel } from '../prc/channel/entities/channel.entity';
import { ChannelService } from '../prc/channel/channel.service';
import { PrcGateway } from '../prc/prc.gateway';
import { ChannelUser } from '../prc/channel/channel-user/entities/channel-user.entity';
import { HttpService } from '@nestjs/axios';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let mockRepoUser: MockRepo;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoUser = new MockRepo('UsersResolver', User, mockUser);
    mockRepoChannel = new MockRepo('UsersResolver', Channel);
    mockRepoChannelUser = new MockRepo('UsersResolver', ChannelUser);
    await mockRepoUser.setupDb();
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        HttpService,
        ConfigService,
        PrcGateway,
        ChannelService,
        mockRepoUser.getProvider(),
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  afterEach(async () => {
    await mockRepoUser.clearRepo();
    await mockRepoChannel.clearRepo();
    await mockRepoChannelUser.clearRepo();
  });

  afterAll(async () => {
    await mockRepoUser.destroyRepo();
    await mockRepoChannel.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all users', async () => {
    await expect(resolver.findAll()).resolves.toEqual([
      mockRepoUser.getTestEntity(),
    ]);
  });

  it('should find self by id in jwt token', async () => {
    await expect(
      resolver.findOneById(undefined, {
        username: 'test',
        id: mockRepoUser.getTestEntity().id,
        email: 'test@example.com',
        isAuthenticated: true,
      }),
    ).resolves.toEqual(mockRepoUser.getTestEntity());
  });

  it('should find user by id', async () => {
    await expect(
      resolver.findOneById(84364, {
        username: 'test',
        id: 12345,
        email: 'test@example.com',
        isAuthenticated: true,
      }),
    ).resolves.toEqual(mockRepoUser.getTestEntity());
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
      mockRepoUser.getTestEntity(),
    );
  });

  it('should not find non-existing user by username', async () => {
    await expect(resolver.findOneByUsername('nobody')).rejects.toThrow(
      EntityNotFoundError,
    );
  });

  it('should update a users username', async () => {
    const newUser = mockRepoUser.getTestEntity({ username: 'testUser' });
    const updateUserUsernameInput: UpdateUserUsernameInput = {
      username: newUser.username,
    };
    await expect(
      resolver.updateUsername(updateUserUsernameInput, newUser),
    ).resolves.toEqual(newUser);
  });

  it('should not update a users username if not exist', async () => {
    const newUser = mockRepoUser.getTestEntity({
      id: 8974632,
    });
    const updateUserUsernameInput: UpdateUserUsernameInput = {
      username: 'nothingTwice',
    };
    await expect(
      resolver.updateUsername(updateUserUsernameInput, newUser),
    ).rejects.toThrow(EntityNotFoundError);
  });
});
