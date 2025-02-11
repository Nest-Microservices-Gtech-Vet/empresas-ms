import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EmpresasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Emprresa Service')

  onModuleInit() {
      this.$connect
      this.logger.log('Empresas Conectado')
  }
  create(createEmpresaDto: CreateEmpresaDto) {
    return this.empresa.create({
      data: createEmpresaDto
    });
  }

  async findAll() {
    return await this.empresa.findMany({
      where: {activo:true}
    });
  }

  async findOne(emp_id: number) {
    const empresa = await this.empresa.findFirst({
      where:{
        emp_id,
        activo: true
      }
    });

    if ( !empresa ) {
      throw new RpcException({
        message : `Empresa con el identificador #${emp_id} no encontrada`,
        status: HttpStatus.BAD_REQUEST,
      })
    }
    return empresa;
  }


  async update(emp_id: number, updateEmpresaDto: UpdateEmpresaDto) {
    await this.findOne(emp_id);

    return this.empresa.update({
      where: {emp_id},
      data: updateEmpresaDto,
    });
  }
  

  async remove(emp_id: number) {
    await this.findOne(emp_id);
    const empresa = await this.empresa.update({
      where: {emp_id},
      data:{
        activo: false
      }
    });
    return empresa;
  }
}
