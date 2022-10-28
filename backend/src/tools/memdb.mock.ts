import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, DataSourceOptions } from 'typeorm';
import { createDatabase, dropDatabase } from 'typeorm-extension';
import { User } from '../users/entities/user.entity';
import { Channel } from '../prc/channel/entities/channel.entity';
import { ChannelUser } from '../prc/channel/channel-user/entities/channel-user.entity';
import { Game } from '../game/entities/game.entity';
import { QueuedPlayer } from '../game/entities/queuedplayer.entity';

export class MockRepo {
  private options: any = {};
  private repo: Repository<any>;
  private source: DataSource;
  private hasDbSetup = false;

  constructor(
    private readonly key: string,
    private readonly entity: any,
    private readonly testData?: any,
  ) {
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

  getTestEntity(options?: any): typeof this.entity {
    return Object.assign(this.testData, options);
  }

  async setupDb() {
    await createDatabase(this.options);
    this.hasDbSetup = true;
  }

  getProvider() {
    return {
      provide: getRepositoryToken(this.entity),
      useFactory: async (): Promise<Repository<typeof this.entity>> => {
        if (!this.hasDbSetup) await this.setupDb();
        this.source = await new DataSource(this.options.options).initialize();
        this.repo = await this.source.getRepository(this.entity);
        // Just for safety, don't know if really needed
        for (let i = 0; i < 10; i++) {
          if (this.repo.manager.connection.isInitialized) break;
        }
        await this.source
          .createQueryBuilder()
          .delete()
          .from(this.entity)
          .execute();
        if (this.testData != null) await this.repo.insert(this.getTestEntity());
        return this.repo;
      },
    };
  }

  async clearRepo(): Promise<void> {
    await this.source.createQueryBuilder().delete().from(this.entity).execute();
    await this.source.destroy();
  }

  async destroyRepo(): Promise<void> {
    await dropDatabase(this.options);
  }

  getRepo(): Repository<any> {
    return this.repo;
  }
}
