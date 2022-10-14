import { Module } from '@nestjs/common';
import { PrcGateway } from './prc.gateway';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PrcGateway],
})
export class PrcModule {}
