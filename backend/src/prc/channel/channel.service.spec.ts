import { Test, TestingModule } from '@nestjs/testing';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from './channel-user/entities/channel-user.entity';
import { MockRepo } from '../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { QueryFailedError } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { mockUser, mockUser2 } from '../../users/entities/user.entity.mock';
import { UsersService } from '../../users/users.service';
import { PrcGateway } from '../prc.gateway';
import { HttpService } from '@nestjs/axios';

describe('ChannelService', () => {
  let channelService: ChannelService;
  let userService: UsersService;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;
  let mockRepoUser: MockRepo;

  beforeEach(async () => {
    mockRepoChannel = new MockRepo('ChannelService', Channel);
    mockRepoChannelUser = new MockRepo('ChannelService', ChannelUser);
    mockRepoUser = new MockRepo('ChannelService', User, [mockUser, mockUser2]);
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();
    await mockRepoUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        ChannelService,
        UsersService,
        HttpService,
        PrcGateway,
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
        mockRepoUser.getProvider(),
      ],
    }).compile();

    channelService = module.get<ChannelService>(ChannelService);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await mockRepoChannelUser.clearRepo();
    await mockRepoChannel.clearRepo();
    await mockRepoUser.clearRepo();
  });

  afterAll(async () => {
    await mockRepoChannel.destroyRepo();
    await mockRepoUser.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
  });

  //DEFINED
  it('should be defined', () => {
    expect(channelService).toBeDefined();
  });

  //CREATE
  it('should not create channel due to duplicate', async () => {
    await expect(
      channelService.create({ name: '#test1', password: '' }),
    ).resolves.not.toThrow();
    await expect(
      channelService.create({ name: '#test1', password: '' }),
    ).rejects.toThrow(QueryFailedError);
  });

  it('should create a channel', async () => {
    await expect(
      channelService.create({ name: '#test2', password: '' }),
    ).resolves.toEqual(expect.any(Number));
  });

  //JOIN
  it('should create a channel using join', async () => {
    const newUser: User = mockUser2;
    await expect(
      channelService.join({ name: '#test3', password: '' }, newUser),
    ).resolves.toEqual(expect.any(Channel));
  });

  it('should make user owner on newly created channel', async () => {
    const newUser: User = mockUser2;
    await expect(
      channelService.join({ name: '#test4', password: '' }, newUser),
    ).resolves.toEqual(expect.any(Channel));
    const newChannelUser: ChannelUser = await userService.findChannelUser(
      newUser.id,
      '#test4',
    );
    expect(newChannelUser.owner).toEqual(true);
  });

  it('should not join if bad password', async () => {
    const owner: User = mockUser;
    await expect(
      channelService.join({ name: '#test5', password: '123' }, owner),
    ).resolves.toEqual(expect.any(Channel));
    const joiner: User = mockUser2;
    await expect(
      channelService.join({ name: '#test5', password: '456' }, joiner),
    ).rejects.toThrow('Bad Password');
  });

  it('should be unable to join if already on channel', async () => {
    const owner: User = mockUser;
    await expect(
      channelService.join({ name: '#test6', password: '123' }, owner),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.join({ name: '#test6', password: '123' }, owner),
    ).rejects.toThrow('Already in Channel');
  });

  it('should not make user owner/admin on join', async () => {
    const owner: User = mockUser;
    await expect(
      channelService.join({ name: '#test7', password: '' }, owner),
    ).resolves.toEqual(expect.any(Channel));
    const joiner: User = mockUser2;
    await expect(
      channelService.join({ name: '#test7', password: '' }, joiner),
    ).resolves.toEqual(expect.any(Channel));
    const newChannelUser: ChannelUser = await userService.findChannelUser(
      joiner.id,
      '#test7',
    );
    expect(newChannelUser.owner).toEqual(false);
  });

  /*it('should join channel', async () => {
    
  });*/
});
