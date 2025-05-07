import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProvinciasService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('UserService');
  onModuleInit() {
      this.$connect();
      this.logger.log('DATABASE CONNECTED')
  }
  create(createProvinciaDto: CreateProvinciaDto) {
    return this.provincia.create({
      data:createProvinciaDto
    });
  }

  findAll() {
    return this.provincia.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} provincia`;
  }

  update(id: number, updateProvinciaDto: UpdateProvinciaDto) {
    return `This action updates a #${id} provincia`;
  }

  remove(id: number) {
    return `This action removes a #${id} provincia`;
  }
}
