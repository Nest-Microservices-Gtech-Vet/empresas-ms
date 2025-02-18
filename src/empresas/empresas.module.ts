import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { USERS_SERVICE } from 'src/config/services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

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
            port: Number(envs.usersMicroservicePort) || 3001,
          },
      },
    ]),
  ],
  controllers: [EmpresasController],
  providers: [EmpresasService,PrismaService],
  exports: [EmpresasService,PrismaService],
})
export class EmpresasModule {}
