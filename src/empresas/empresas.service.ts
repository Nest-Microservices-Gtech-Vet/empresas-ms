import { BadRequestException, ForbiddenException, HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, USERS_SERVICE } from 'src/config';
import { CreateEmpresaUsuarioDto } from './dto/create-empresa-usuario.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class EmpresasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Emprresa Service')

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy, // 👈 client NATS a usuarios-ms
  ) {
    super();
  }


  async onModuleInit() {
    await this.$connect
    this.logger.log('Empresas Conectado')
  }

  async create(createEmpDto: CreateEmpresaDto) {

    const empresa = await this.empresa.create({
      data: {
        emp_nombre: createEmpDto.emp_nombre,
        emp_correo: createEmpDto.emp_correo,
        emp_direccion: createEmpDto.emp_direccion,
        emp_telefono: createEmpDto.emp_telefono,
        emp_ruc: createEmpDto.emp_ruc,
        emp_tipo_empresa: createEmpDto.emp_tipo_empresa,
        //usua_admin_id: createEmpDto.usua_admin_id,
        activo: createEmpDto.activo ?? true,
        fecha_inicio: createEmpDto.fecha_inicio,
        fecha_fin: createEmpDto.fecha_fin,
        createdBy: createEmpDto.createdBy,
        updatedBy: createEmpDto.updatedBy,
        provincia: {
          connect: { prov_id: createEmpDto.provincia_id }
        },
        canton: {
          connect: { can_id: createEmpDto.canton_id }
        },

      },
    });
    return empresa;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 50, search = '' } = paginationDto;

    const where: any = {
      activo: true,
    };

    if (search) {
      where.OR = [
        { emp_nombre: { contains: search, mode: 'insensitive' } },
        { emp_ruc: { contains: search, mode: 'insensitive' } },
        { emp_correo: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.empresa.count({ where }),
      this.empresa.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy: {
          emp_nombre: 'asc',
        },
      }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      metadata: {
        total,
        page,
        lastPage,
      },
    };
  }

  async findAllInactivas(paginationDto: PaginationDto) {
    const { page = 1, limit = 50, search = '' } = paginationDto;

    const where: any = {
      activo: false,
    };

    if (search) {
      where.OR = [
        { emp_nombre: { contains: search, mode: 'insensitive' } },
        { emp_ruc: { contains: search, mode: 'insensitive' } },
        { emp_correo: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.empresa.count({ where }),
      this.empresa.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy: {
          emp_nombre: 'asc',
        },
      }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      metadata: {
        total,
        page,
        lastPage,
      },
    };
  }

  async findOne(emp_id: number) {
    const empresa = await this.empresa.findFirst({
      where: {
        emp_id,
        //activo: true
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


  async update(emp_id: number, updateEmpresaDto: UpdateEmpresaDto, updatedBy: number) {
    try {
      // const { usua_admin_id } = updateEmpresaDto;

      // if (usua_admin_id !== undefined && usua_admin_id !== null) {
      //   console.log(`🟢 Validando usuario admin ${usua_admin_id} desde empresas-ms...`);

      //   const resultadoAdmin = await this.client.send('validar_user_admin', usua_admin_id).toPromise();

      //   if (!resultadoAdmin.valid) {
      //     console.warn(`⚠️ Usuario admin ${usua_admin_id} no es válido o no es admin`);
      //     throw new Error(`El usuario administrador no es válido o no tiene permisos de ADMIN`);
      //   }
      // } else {
      //   console.log(`ℹ️ No se recibió usuario admin en la actualización. Saltando validación de admin.`);
      // }

      console.log(`🔍 Validando usuario que actualiza (ID: ${updatedBy}) en usuarios-ms...`);
      const user = await this.client.send({ cmd: 'findOne_users' }, { id: updatedBy }).toPromise();
      console.log('📦 Enviando a usuarios-ms:', { cmd: 'findOne_users' }, { id: updatedBy });


      if (!user || !user.activo) {
        console.error('🚫 Error: El usuario que intenta actualizar no está activo.');
        throw new RpcException('El usuario que intenta actualizar no está activo.');
      }

      if (!emp_id) {
        console.error('❌ Error: emp_id es undefined. No se puede actualizar.');
        throw new BadRequestException('🚫 No se encontró el ID de la empresa para actualizar.');
      }

      const existingEmpresa = await this.empresa.findUnique({ where: { emp_id } });

      if (!existingEmpresa) {
        throw new BadRequestException(`🚫 No se encontró ninguna empresa con ID: ${emp_id}`);
      }

      console.log('📝 updateEmpresaDto recibido:', updateEmpresaDto);


      const empresaUpdated = await this.empresa.update({
        where: { emp_id },
        data: {
          ...updateEmpresaDto,
          updatedBy
        },
      });

      console.log(`✅ Empresa actualizada correctamente: ${empresaUpdated.emp_nombre}`);
      return empresaUpdated;

    } catch (error) {
      console.error('❌ Error al actualizar empresa:', error);
      throw new RpcException({
        message: 'Error al actualizar la empresa',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }



  async remove(emp_id: number, updatedBy: number) {
    await this.findOne(emp_id);
    const empresa = await this.empresa.update({
      where: { emp_id },
      data: {
        activo: false,
        updatedBy
      }
    });
    return empresa;
  }



  async findEmpresasByAdmin(usuarioId: number) {
    return this.empresa.findMany({
      where: {
        empresaUsuario: {
          some: {
            usuarioId,
          },
        },
      },
      include: {
        empresaUsuario: true,
      },
    });
  }

  async validarEmpresaPorAdmin(empresa_id: number, admin_id: number): Promise<{ valido: boolean; motivo?: string }> {
    if (!empresa_id) {
      return { valido: false, motivo: 'ID_EMPRESA_INVALIDO' };
    }

    const empresa = await this.empresa.findUnique({
      where: { emp_id: empresa_id },
    });

    if (!empresa) {
      return { valido: false, motivo: 'NO_EXISTE_LA_EMPRESA' };
    }

    // TODO: verificar si el admin realmente está asignado
    const relacion = await this.empresaUsuario.findFirst({
      where: {
        empresaId: empresa_id,
        usuarioId: admin_id,
      },
    });

    if (!relacion) {
      return { valido: false, motivo: 'NO_AUTORIZADO' };
    }

    return { valido: true };
  }
  


  //***************************************************************** */
  //empieza empresausuario
  async asignarUsuarios(dto: CreateEmpresaUsuarioDto) {
    const { empresaId, usuarioIds } = dto;

    // Eliminar los existentes para esa empresa
    await this.empresaUsuario.deleteMany({
      where: { empresaId },
    });

    // Insertar los nuevos
    const data = usuarioIds.map((usuarioId) => ({
      empresaId,
      usuarioId,
    }));

    await this.empresaUsuario.createMany({ data });

    return { message: 'Usuarios asignados correctamente' };
  }

  //fin empresausuario


  async findByIdWithUsuarios(id: number) {
    const empresa = await this.empresa.findUnique({
      where: { emp_id: id },
      include: {
        empresaUsuario: true, // trae usuarioIds
      },
    });

    return empresa;
  }


  async obtenerPorUsuario(usuarioId: number) {
    const relaciones = await this.empresaUsuario.findMany({
      where: { usuarioId },
      include: {
        empresa: {
          select: {
            emp_id: true,
            emp_nombre: true,
          },
        },
      },
    });

    return relaciones.map(rel => rel.empresa);
  }


}
