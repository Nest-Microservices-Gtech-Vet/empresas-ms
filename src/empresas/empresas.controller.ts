import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  //@Post()
  @MessagePattern('create_empresa')
  @UseGuards(JwtAuthGuard, new RolesGuard(['SUPERADMIN']))
  async create(@Payload() data: any) {
    console.log('🛠 Token recibido en Empresas:', data.authorization);

    console.log('📩 Recibido en create_empresa:', data);
    console.log('🛠 Token recibido:', data.authorization);

    if (!data.authorization) {
      throw new UnauthorizedException('🚫 No se encontró el token en la solicitud');
    }

    return await this.empresasService.create(data.createEmpresaDto, data.createdBy, data.authorization);
  }

  //@Get()
  // @MessagePattern('findAll_empresas')
  // @UseGuards(JwtAuthGuard, new RolesGuard(['SUPERADMIN']))
  // findAll(@Payload() payload:any) {
  //   //console.log('Payload recibido:', payload); 
  //   return this.empresasService.findAll();
  // }

  //@Get(':id')
  // @MessagePattern('findOne_empresa')
  // async findOne(@Payload('emp_id', ParseIntPipe) emp_id: number) {
  //   return this.empresasService.findOne(emp_id);
  // }

  //@Patch(':id')
  // @MessagePattern(cmd: 'update_empresa')
  // updateEmpresa(
  //   //@Param('id', ParseIntPipe) emp_id: number, 
  //   @Body() updateEmpresaDto: UpdateEmpresaDto
  // ) {
  //   return this.empresasService.update(updateEmpresaDto.emp_id, updateEmpresaDto);
  // }

  //@Delete(':id')
  //   @MessagePattern({'delete_empresa')
  //   remove(@Payload('emp_id', ParseIntPipe) emp_id: number) {
  //     const removeEmp = emp_id;
  //     console.log(`el usuario ${removeEmp} a sido eliminado`)
  //   return this.empresasService.remove(emp_id);
  // }
}
