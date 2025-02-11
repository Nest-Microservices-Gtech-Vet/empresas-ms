import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCantonDto } from './dto/create-cantone.dto';
import { UpdateCantoneDto } from './dto/update-cantone.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CantonesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UserService');
    onModuleInit() {
        this.$connect();
        this.logger.log('DATABASE CANTONES CONNECTED')
    }

  create(createCantoneDto: CreateCantonDto) {
    return this.canton.create({
      data:createCantoneDto
    });
  }

  findAll() {
    return this.canton.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cantone`;
  }

  update(id: number, updateCantoneDto: UpdateCantoneDto) {
    return `This action updates a #${id} cantone`;
  }

  remove(id: number) {
    return `This action removes a #${id} cantone`;
  }
}
