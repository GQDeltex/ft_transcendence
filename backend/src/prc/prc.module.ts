import { Module } from '@nestjs/common';
import { PrcGateway } from './gateways/prc.gateway';

@Module({
  providers: [PrcGateway],
})
export class PrcModule {}
