import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService,JwtAuthGuard, RolesGuard],
  imports:[
    ClientsModule.register([
      { 
        name: USERS_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.usersMicroserviceHost,
          port: envs.usersMicroservicePort,
        } 
      },
    ]),
  ],
})
export class EmpresasModule {}
