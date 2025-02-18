import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from 'src/config/services';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),

    ClientsModule.registerAsync([
      {
        name: USERS_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const host = configService.get<string>('USERS_MICROSERVICE_HOST');
          const port = configService.get<number>('USERS_MICROSERVICE_PORT');

          console.log(`🛠 Conectando a Usuarios-MS en: ${host}:${port}`);
          console.log('🔍 Conectando a Usuarios-MS en:', configService.get<string>('USERS_MICROSERVICE_HOST'), configService.get<number>('USERS_MICROSERVICE_PORT'));

          return {
            transport: Transport.TCP,
            options: { host, port },
          };
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule { }
