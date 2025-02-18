import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { USERS_SERVICE } from 'src/config/services';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.usersMicroserviceHost,
          port: envs.usersMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [EmpresasController],
  providers: [EmpresasService,],

})
export class EmpresasModule { }
