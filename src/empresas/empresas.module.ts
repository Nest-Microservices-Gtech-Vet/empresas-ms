import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService],
  imports:[
    ClientsModule.register([
      { 
        name: USERS_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.usersMicroservicesHost,
          port: envs.usersMicroservicesPort,
        } 
      },
    ]),
  ],
})
export class EmpresasModule {}
