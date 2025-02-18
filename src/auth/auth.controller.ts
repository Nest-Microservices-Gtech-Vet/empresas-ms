import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { emailOrRuc: string; password: string }) {
    console.log('📩 Datos recibidos para login:', loginDto);
    const user = await this.authService.login(loginDto.emailOrRuc, loginDto.password);

    // Devuelve el token correctamente
    return { access_token: user.access_token };
  }
}
