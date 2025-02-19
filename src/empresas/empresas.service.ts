import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USERS_SERVICE } from 'src/config';

@Injectable()
export class EmpresasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Emprresa Service')
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy
  ) {
    super();
  }

  onModuleInit() {
    this.$connect
    this.logger.log('Empresas Conectado')
  }

  async create(createEmpresaDto: CreateEmpresaDto, createdBy: number) {

    try {
      // 🔍 **Validar que el usuario `createdBy` (quién crea) es un SUPERADMIN activo**
      console.log(`🔍 Validando usuario creador (ID: ${createdBy}) en usuarios-ms...`);
      console.log(`📩 Intentando crear empresa con:`, createEmpresaDto);
      console.log(`🔍 Usuario que crea la empresa (createdBy):`, createdBy);
      console.log('🔍 Enviando solicitud a usuarios-ms:', createdBy);
      const creatorEmp = await this.usersClient.send({ cmd: 'findOne_users' }, { usua_id: createdBy })
        .toPromise()
        .catch(error => {
          console.error('❌ Error llamando a usuarios-ms:', error);
          throw new RpcException({
            message: 'Error validando usuario en usuarios-ms',
            status: HttpStatus.INTERNAL_SERVER_ERROR,
          });
        });
      console.log('⬅️ Respuesta de usuarios-ms:', creatorEmp);

      if (!creatorEmp) {
        throw new BadRequestException('🚫 El usuario creador no existe en usuarios-ms.');
      }

      if (!creatorEmp.activo) {
        throw new ForbiddenException('🚫 El usuario creador está inactivo.');
      }

      if (creatorEmp.usua_rol !== 'SUPERADMIN') {
        throw new ForbiddenException('🚫 Solo un SUPERADMIN puede crear empresas.');
      }

      // 🔍 **Validar que el `usua_admin_id` (administrador asignado) es un ADMIN activo**
      console.log(`🔍 Validando usuario administrador (ID: ${createEmpresaDto.usua_admin_id}) en usuarios-ms...`);

      console.log('✅ Usuario creador encontrado:', creatorEmp);

      const adminUser = await this.usersClient.send({ cmd: 'findOne_users' }, { usua_id: createEmpresaDto.usua_admin_id }).toPromise();

      if (!adminUser) {
        throw new BadRequestException('🚫 El usuario administrador no existe en usuarios-ms.');
      }

      console.log('✅ Usuario administrador encontrado:', adminUser);

      if (!adminUser.activo) {
        throw new ForbiddenException('🚫 El usuario administrador está inactivo.');
      }

      if (adminUser.usua_rol !== 'ADMIN') {
        throw new ForbiddenException('🚫 El usuario administrador debe tener rol ADMIN.');
      }

      const empresa = await this.empresa.create({
        data: {
          ...createEmpresaDto,
          activo: true,
          createdBy: createdBy,

        },
      });
      return empresa;

      console.log('✅ Validaciones completadas. Creando empresa...');
    } catch (error) {

    }
  }

  async findAll() {
    return await this.empresa.findMany({
      where: { activo: true }
    });
  }

  async findOne(emp_id: number) {
    const empresa = await this.empresa.findFirst({
      where: {
        emp_id,
        activo: true
      }
    });

    if (!empresa) {
      throw new RpcException({
        message: `Empresa con el identificador #${emp_id} no encontrada`,
        status: HttpStatus.BAD_REQUEST,
      })
    }
    return empresa;
  }


  async update(emp_id: number, updateEmpresaDto: UpdateEmpresaDto) {
    await this.findOne(emp_id);

    return this.empresa.update({
      where: { emp_id },
      data: updateEmpresaDto,
    });
  }


  async remove(emp_id: number) {
    await this.findOne(emp_id);
    const empresa = await this.empresa.update({
      where: { emp_id },
      data: {
        activo: false
      }
    });
    return empresa;
  }
}
