import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const token = req?.authorization || req?.headers?.authorization;
        if (!token) {
          console.error('❌ No Authorization header found en JWT Strategy');
          throw new UnauthorizedException('🚫 Token no encontrado');
        }
        console.log('🛠 Extrayendo token en JwtStrategy:', token);
        return token.replace('Bearer ', '');
      },
      ignoreExpiration: false,
      secretOrKey: envs.jwtSecret,
    });
  }

  async validate(payload: any) {
    console.log('🛠 Token validado con payload:', payload);

    // 🔥 Solo validar si es SUPERADMIN
    if (payload.role !== 'SUPERADMIN') {
      throw new UnauthorizedException('🚫 No tienes permisos para crear una empresa');
    }

    return { userId: payload.userId, role: payload.role };
  }
}
