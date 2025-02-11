import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTiposEmpresaDto } from './dto/create-tipos-empresa.dto';
import { UpdateTiposEmpresaDto } from './dto/update-tipos-empresa.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TiposEmpresasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('TipoEmpresaService');
  onModuleInit() {
      this.$connect
      this.logger.log('DATABASE CONNECTED TIPOEMPRESA')
  }
  create(createTiposEmpresaDto: CreateTiposEmpresaDto) {
    return this.tipo_Empresa.create({
      data: createTiposEmpresaDto
    });
  }

  findAll() {
    return `This action returns all tiposEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposEmpresa`;
  }

  update(id: number, updateTiposEmpresaDto: UpdateTiposEmpresaDto) {
    return `This action updates a #${id} tiposEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposEmpresa`;
  }
}
