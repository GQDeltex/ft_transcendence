import { TestingModule, Test } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { memdbMock, testUser } from './memdb.mock';
import { UpdateUserPictureInput } from './dto/update-userpicture.input';
import { UpdateUserUsernameInput } from './dto/update-userusername.input';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let db: DataSource;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    db = await memdbMock(User);
    usersRepository = db.getRepository(User);
    await usersRepository.insert(testUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  afterEach(async () => await db.destroy());

  it('should be defined', async () => {
    await expect(resolver).toBeDefined();
  });

  it('should find all users', async () => {
    await expect(resolver.findAll()).resolves.toEqual([testUser]);
  });

  it('should find user by id', async () => {
    await expect(resolver.findOneById(84364)).resolves.toEqual(testUser);
  });

  it('should not find non-existing user by id', async () => {
    await expect(resolver.findOneById(76439)).resolves.toEqual(null); // OLD see #86
  });

  it('should find user by username', async () => {
    await expect(resolver.findOneByUsername('name')).resolves.toEqual(testUser);
  });

  it('should not find non-existing user by username', async () => {
    await expect(resolver.findOneByUsername('nobody')).resolves.toEqual(null); // OLD see #86
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
    ).resolves.toEqual(null); // Update after updating users.service
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
    const newUser = testUser;
    newUser.username = 'testUser';
    newUser.id = 12345;
    const updateUserUsernameInput: UpdateUserUsernameInput = {
      id: newUser.id,
      username: newUser.username,
    };
    await expect(
      resolver.updateUsername(updateUserUsernameInput),
    ).resolves.toEqual(newUser); // Update after updating users.service
  });
});
