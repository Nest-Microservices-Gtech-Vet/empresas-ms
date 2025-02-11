import { Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ProvinciasController } from './provincias.controller';

@Module({
  controllers: [ProvinciasController],
  providers: [ProvinciasService],
})
export class ProvinciasModule {}
