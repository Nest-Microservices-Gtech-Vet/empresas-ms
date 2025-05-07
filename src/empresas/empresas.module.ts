import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { NatsModule } from 'src/transports/nats.module';


@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService,],
  // imports:[
  //   NatsModule
  // ],
})
export class EmpresasModule {}
