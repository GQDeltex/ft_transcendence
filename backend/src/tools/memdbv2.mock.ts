import { getRepositoryToken } from '@nestjs/typeorm';
import { Provider } from '@nestjs/common';
import {
  EntityTarget,
  ObjectLiteral,
  EntitySchema,
  Repository,
  DataSource,
  DataSourceOptions,
} from 'typeorm';
import { createDatabase, dropDatabase } from 'typeorm-extension';
import { User } from '../users/entities/user.entity';
import { Channel } from '../prc/channel/entities/channel.entity';
import { ChannelUser } from '../prc/channel/channel-user/entities/channel-user.entity';
import { Game } from '../game/entities/game.entity';
import { QueuedPlayer } from '../game/entities/queuedplayer.entity';

type EntityClassOrSchema = EntitySchema;
type Entity = ObjectLiteral;

export class MockDB {
  private options: any = {};
  private registeredEntities: EntityTarget<Entity>[] = [];
  private source: DataSource;

  private didSetupDB = false;
  private didSetupSource = false;

  constructor(private readonly key: string) {
    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: `${this.key}_testing_db`,
      entities: [User, ChannelUser, Channel, Game, QueuedPlayer],
      synchronize: true,
      logging: 'all',
    };
    this.options = {
      options: dataSourceOptions,
      initialDatabase: process.env.DB_NAME,
      ifNotExist: true,
      ifExist: true,
      synchronize: true,
    };
  }

  async prefillDB(
    schema: EntityTarget<EntitySchema>,
    entity: Entity,
  ): Promise<MockDB> {
    const repo = await this.getRepository(schema);
    await repo.insert(entity);
    return this;
  }

  async setupDB(): Promise<MockDB> {
    await createDatabase(this.options);
    this.didSetupDB = true;
    return this;
  }

  async setupSource(): Promise<void> {
    if (!this.didSetupDB) await this.setupDB();
    this.source = await new DataSource(this.options.options).initialize();
    this.didSetupSource = true;
  }

  async clearSource(): Promise<void> {
    // Clear in reverse order to delete latest insert first (try to mitigate FK Contraint errors)
    await this.registeredEntities
      .slice()
      .reverse()
      .forEach(async (entity) => {
        await this.source.createQueryBuilder().delete().from(entity).execute();
      });
  }

  async destroySource(): Promise<void> {
    await this.clearSource();
    await this.source.destroy();
    this.didSetupSource = false;
  }

  async destroyDB(): Promise<void> {
    await dropDatabase(this.options);
    this.didSetupDB = false;
  }

  async getRepository<Entity extends EntitySchema>(
    entity: EntityTarget<Entity>,
  ): Promise<Repository<Entity>> {
    if (!this.didSetupSource) await this.setupSource();
    this.registeredEntities.push(entity);
    return this.source.getRepository(entity);
  }

  async getProvider<Entity extends EntitySchema>(
    entity: EntityTarget<Entity>,
  ): Promise<Provider> {
    return {
      provide: getRepositoryToken(entity as EntityClassOrSchema),
      useValue: await this.getRepository(entity),
    };
  }
}
