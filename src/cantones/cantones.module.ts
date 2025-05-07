import { Module } from '@nestjs/common';
import { CantonesService } from './cantones.service';
import { CantonesController } from './cantones.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [CantonesController],
  providers: [CantonesService],
  imports:[
      NatsModule
    ],
})
export class CantonesModule {}
