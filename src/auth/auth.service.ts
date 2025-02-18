import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { USERS_SERVICE } from 'src/config/services';


@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
    private readonly jwtService: JwtService
  ) {}

  async login(emailOrRuc: string, password: string) {
    console.log(`📩 Enviando login a usuarios-ms: { emailOrRuc: '${emailOrRuc}', password: '*****' }`);

    try {
      const response = await this.usersClient.send('auth.login', { emailOrRuc, password }).toPromise();
      console.log('⬅️ Respuesta de usuarios-ms:', response);
      return response;
    } catch (error) {
      console.error('❌ Error en login:', error.message);
      throw new UnauthorizedException('Error de autenticación');
    }
  }

  async validateToken(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('🚫 No se encontró el token');
    }

    const token = authHeader.split(' ')[1];
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('🚫 Token inválido');
    }
  }
}
