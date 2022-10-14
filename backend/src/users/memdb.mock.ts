import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createDatabase } from 'typeorm-extension';

export const testUser: User = {
  id: 84364,
  username: 'name',
  picture: 'http://example.com',
  firstname: 'nobody',
  lastname: 'knows',
  email: 'nobody@example.com',
  country: 'United States',
  campus: 'Unicorns 4 Lyfe',
  title: [''],
  twoFASecret: null,
  twoFAEnable: false,
  socketId: '',
};

export function getMockRepoProvider(key: string, entities: any, mockData: any) {
  return {
    provide: getRepositoryToken(entities),
    useFactory: async (
      configService: ConfigService,
    ): Promise<Repository<typeof entities>> => {
      const options: DataSourceOptions = {
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: `${key}_testing_db`,
        entities: [entities],
        synchronize: true,
      };
      await createDatabase({
        options,
        initialDatabase: configService.get('DB_NAME'),
        ifNotExist: true,
        synchronize: true,
      });
      const source: DataSource = await new DataSource(options).initialize();
      const repo: Repository<typeof entities> = await source.getRepository(
        entities,
      );
      for (let i = 0; i < 10; i++) {
        if (repo.manager.connection.isConnected) break;
      }
      await repo.clear();
      await repo.insert(mockData);
      return repo;
    },
    inject: [ConfigService],
  };
}
