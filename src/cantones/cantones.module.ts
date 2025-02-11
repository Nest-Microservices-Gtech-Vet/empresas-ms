import { Module } from '@nestjs/common';
import { CantonesService } from './cantones.service';
import { CantonesController } from './cantones.controller';

@Module({
  controllers: [CantonesController],
  providers: [CantonesService],
})
export class CantonesModule {}
