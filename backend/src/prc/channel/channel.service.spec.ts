import { Test, TestingModule } from '@nestjs/testing';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { ChannelUser } from './channel-user/entities/channel-user.entity';
import { MockRepo } from '../../tools/memdb.mock';
import { ConfigService } from '@nestjs/config';
import { QueryFailedError } from 'typeorm';

describe('ChannelService', () => {
  let service: ChannelService;
  let mockRepoChannel: MockRepo;
  let mockRepoChannelUser: MockRepo;

  beforeEach(async () => {
    mockRepoChannel = new MockRepo('ChannelService', Channel);
    mockRepoChannelUser = new MockRepo('ChannelService', ChannelUser);
    await mockRepoChannel.setupDb();
    await mockRepoChannelUser.setupDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        ChannelService,
        mockRepoChannel.getProvider(),
        mockRepoChannelUser.getProvider(),
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
  });

  afterEach(async () => {
    await mockRepoChannel.clearRepo();
    await mockRepoChannelUser.clearRepo();
  });
  afterAll(async () => {
    await mockRepoChannel.destroyRepo();
    await mockRepoChannelUser.destroyRepo();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not create channel due to duplicate', () => {
    expect(
      service.create({ name: '#test1', password: '' }),
    ).resolves.not.toThrow();
    expect(service.create({ name: '#test1', password: '' })).rejects.toThrow(
      QueryFailedError,
    );
  });

  it('should create a channel', () => {
    expect(service.create({ name: '#test1', password: '' })).resolves.toEqual(
      expect.any(Number),
    );
  });
});
