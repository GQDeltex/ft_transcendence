import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createDatabase, dropDatabase } from 'typeorm-extension';

export class MockRepo {
  private options: any = {};
  private repo: Repository<any>;
  private source: DataSource;

  constructor(
    private readonly key: string,
    private readonly entity: any,
    private readonly testData: any,
  ) {}

  getTestEntity(options?: any): typeof this.entity {
    return Object.assign(this.testData, options);
  }

  getProvider() {
    return {
      provide: getRepositoryToken(this.entity),
      useFactory: async (
        configService: ConfigService,
      ): Promise<Repository<typeof this.entity>> => {
        const dataSourceOptions: DataSourceOptions = {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: `${this.key}_testing_db`,
          entities: [this.entity],
          synchronize: true,
        };
        this.options = {
          options: dataSourceOptions,
          initialDatabase: configService.get('DB_NAME'),
          ifNotExist: true,
          synchronize: true,
        };
        await createDatabase(this.options);
        this.source = await new DataSource(dataSourceOptions).initialize();
        this.repo = await this.source.getRepository(this.entity);
        // Just for safety, don't know if really needed
        for (let i = 0; i < 10; i++) {
          if (this.repo.manager.connection.isConnected) break;
        }
        await this.repo.clear();
        await this.repo.insert(this.getTestEntity());
        return this.repo;
      },
      inject: [ConfigService],
    };
  }

  async clearRepo(): Promise<void> {
    await this.repo.clear();
    await this.source.destroy();
  }

  async destroyRepo(): Promise<void> {
    dropDatabase(this.options);
  }
}
