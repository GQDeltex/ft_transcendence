import { Module } from '@nestjs/common';
import { PrcGateway } from './prc.gateway';

@Module({
  providers: [PrcGateway],
})
export class PrcModule {}
