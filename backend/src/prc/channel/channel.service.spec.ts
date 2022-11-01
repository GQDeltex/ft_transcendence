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
import { HttpModule } from '@nestjs/axios';
import { Game } from '../../game/entities/game.entity';

describe('ChannelService', () => {
  let channelService: ChannelService;
  let userService: UsersService;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;
  let mockRepoUser: MockRepo;
  let mockRepoGame: MockRepo;

  beforeEach(async () => {
    mockRepoChannel = new MockRepo('ChannelService', Channel);
    mockRepoChannelUser = new MockRepo('ChannelService', ChannelUser);
    mockRepoUser = new MockRepo('ChannelService', User, [mockUser, mockUser2]);
    mockRepoGame = new MockRepo('ChannelService', Game);
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();
    await mockRepoUser.setupDb();
    await mockRepoGame.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ConfigService,
        ChannelService,
        UsersService,
        PrcGateway,
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
        mockRepoUser.getProvider(),
        mockRepoGame.getProvider(),
      ],
    }).compile();

    channelService = module.get<ChannelService>(ChannelService);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await mockRepoChannelUser.clearRepo();
    await mockRepoChannel.clearRepo();
    await mockRepoUser.clearRepo();
    await mockRepoGame.clearRepo();
  });

  afterAll(async () => {
    await mockRepoChannel.destroyRepo();
    await mockRepoUser.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
    await mockRepoGame.destroyRepo();
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
    await expect(
      channelService.join({ name: '#test3', password: '' }, mockUser2),
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
    await expect(
      channelService.join({ name: '#test5', password: '123' }, mockUser),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.join({ name: '#test5', password: '456' }, mockUser2),
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
    await expect(
      channelService.join({ name: '#test7', password: '' }, mockUser),
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

  it('should leave channel', async () => {
    await expect(
      channelService.join({ name: '#test8', password: '' }, mockUser),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.join({ name: '#test8', password: '' }, mockUser2),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.leave('#test8', mockUser2),
    ).resolves.toHaveProperty('userList.length', 1);
  });

  it('should not leave channel if not in channel', async () => {
    await expect(
      channelService.join({ name: '#test9', password: '' }, mockUser),
    ).resolves.toEqual(expect.any(Channel));
    await expect(channelService.leave('#test9', mockUser2)).rejects.toThrow(
      "Can't leave a channel you're not in",
    );
  });

  it('should not leave channel if muted', async () => {
    await expect(
      channelService.join({ name: '#test10', password: '' }, mockUser),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.join({ name: '#test10', password: '' }, mockUser2),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      mockRepoChannelUser
        .getRepo()
        .update({ user_id: mockUser2.id }, { mute: true }),
    ).resolves.not.toThrow();
    await expect(channelService.leave('#test10', mockUser2)).rejects.toThrow(
      "Can't leave because you're muted or banned",
    );
  });

  it('should not leave channel if banned', async () => {
    await expect(
      channelService.join({ name: '#test11', password: '' }, mockUser),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.join({ name: '#test11', password: '' }, mockUser2),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      mockRepoChannelUser
        .getRepo()
        .update({ user_id: mockUser2.id }, { ban: true }),
    ).resolves.not.toThrow();
    await expect(channelService.leave('#test11', mockUser2)).rejects.toThrow(
      "Can't leave because you're muted or banned",
    );
  });

  it('should delete channel if last to leave', async () => {
    await expect(
      channelService.join({ name: '#test12', password: '' }, mockUser),
    ).resolves.toEqual(expect.any(Channel));
    await expect(channelService.leave('#test12', mockUser)).resolves.toBe(null);
    await expect(mockRepoChannel.getRepo().find()).resolves.toEqual([]);
  });

  it('should update channel owner on leave', async () => {
    await expect(
      channelService.join({ name: '#test13', password: '' }, mockUser),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.join({ name: '#test13', password: '' }, mockUser2),
    ).resolves.toEqual(expect.any(Channel));
    await expect(
      channelService.leave('#test13', mockUser),
    ).resolves.toHaveProperty('userList[0].owner', true);
  });
});
