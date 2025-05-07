import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, HttpStatus,UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  //@Post()
  // @MessagePattern({ cmd: 'create_empresa' })
  // create(@Payload() data: any) {
  //   //console.log('Mensaje recibido en create_empresa:', createEmpresaDto);
  //   console.log('📩 Recibido en create_empresa:', data);
  //   if (!data.createEmpresaDto || !data.createEmpresaDto.emp_nombre) {
  //     console.error('❌ Error: Faltan datos en la petición');
  //     throw new RpcException({
  //       message: 'Faltan datos obligatorios para crear la empresa',
  //       status: HttpStatus.BAD_REQUEST,
  //     });
  //   }

  //   return this.empresasService.create(data.createEmpresaDto, data.createdBy);
  // }


  @MessagePattern({ cmd: 'create_empresa' })
  create(@Payload() data: { createEmpresaDto: CreateEmpresaDto, user: any }) {
    console.log('📩 Recibido en create_empresa:', data);

    if (!data.user || data.user.role !== 'SUPERADMIN') {
      console.error('🚫 Acceso denegado: solo SUPERADMIN puede crear empresas.');
      throw new Error('Solo un SUPERADMIN puede crear empresas.');
    }

    return this.empresasService.create(data.createEmpresaDto, data.user.userId);
  }

  //@Get()
  @MessagePattern({ cmd: 'findAll_empresas' })
  findAll(@Payload() payload: any) {
    //console.log('Payload recibido:', payload); 
    return this.empresasService.findAll();
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'findOne_empresa' })
  async findOne(@Payload('emp_id', ParseIntPipe) emp_id: number) {
    return this.empresasService.findOne(emp_id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update_empresa' })
  updateEmpresa(@Payload() data:any) {
    if (!data.updateEmpresaDto || !data.updatedBy) {
      console.error('❌ Error: Faltan datos en la petición');
      throw new RpcException({
        message: 'Faltan datos obligatorios para actualizar la empresa',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return this.empresasService.update(data.updateEmpresaDto.emp_id, data.updateEmpresaDto, data.updatedBy);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_empresa' })
  remove(@Payload('emp_id', ParseIntPipe) emp_id: number) {
    const removeEmp = emp_id;
    console.log(`LA EMPRESA ${removeEmp} a sido eliminado`)
    return this.empresasService.remove(emp_id);
  }

  //empresas administradas por el usuario admin
  @MessagePattern({ cmd: 'findEmpresasByAdmin'})
  findEmpresasByAdmin(@Payload() data: { usua_admin_id: number }){
    console.log(`🔍 Buscando empresas administradas por el usuario ID: ${data.usua_admin_id}`);
    return this.empresasService.findEmpresasByAdmin(data.usua_admin_id);
  }
}
