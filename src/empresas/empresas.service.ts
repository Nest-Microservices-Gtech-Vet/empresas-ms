import { HttpStatus, Inject, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USERS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EmpresasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Emprresa Service')

  constructor(
    @Inject(USERS_SERVICE) private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();

    setTimeout(() => {
      console.log('🔍 Probando conexión a usuarios-ms...');
      this.userClient.send('findOne_users', { usua_id: 22 }).subscribe({
        next: (user) => console.log('✅ Respuesta de usuarios-ms:', user),
        error: (err) => console.error('❌ Error conectando a usuarios-ms:', err),
      });
    }, 5000);
  }



  onModuleInit() {
    this.$connect
    this.logger.log('Empresas Conectado')
    this.userClient.send('findOne_users', { usua_id: 22 }).subscribe({
      next: (user) => console.log('✅ Respuesta de usuarios-ms:', user),
      error: (err) => console.error('❌ Error conectando a usuarios-ms desde module init :', err),
    });

  }

  async create(createEmpresaDto: CreateEmpresaDto, createdBy: number, authorization: string) {
    this.logger.log(`📩 Recibida solicitud para crear empresa: ${createEmpresaDto.emp_nombre}`);
    
    // 🔥 Extraer payload del token
    const tokenPayload = this.jwtService.decode(authorization.replace('Bearer ', ''));
    console.log('🛠 Payload extraído del token:', tokenPayload);

    if (!tokenPayload || tokenPayload.role !== 'SUPERADMIN') {
      throw new UnauthorizedException('🚫 No tienes permisos para crear una empresa');
    }

    // 🔹 Validar que el usuario administrador asignado existe en usuarios-ms
    try {
      console.log(`🔍 Consultando usuario ADMIN con ID: ${createEmpresaDto.usua_admin_id} en usuarios-ms`);
      
      const adminUser = await this.userClient.send('findOne_users', { usua_id: createEmpresaDto.usua_admin_id }).toPromise();
      
      console.log('⬅️ Respuesta de usuarios-ms:', adminUser);

      if (!adminUser || adminUser.usua_rol !== 'ADMIN') {
        throw new UnauthorizedException('🚫 El usuario asignado no es un ADMIN válido');
      }
    } catch (error) {
      console.error('❌ Error llamando a usuarios-ms para validar ADMIN:', error);
      throw new UnauthorizedException('Error verificando usuario en usuarios-ms');
    }

    // 🔹 Crear la empresa sin validar en usuarios-ms
    try {
      const empresa = await this.prisma.empresa.create({
        data: {
          ...createEmpresaDto,
          activo: true,
          createdBy: createdBy,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      this.logger.log(`✅ Empresa creada exitosamente: ${empresa.emp_nombre}`);
      return empresa;
    } catch (error) {
      this.logger.error('❌ Error al crear empresa:', error);
      throw new RpcException({
        message: 'Error al registrar la empresa',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
}

}



