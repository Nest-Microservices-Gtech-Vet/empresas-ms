import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }
//inicio crear empresa
  @MessagePattern({ cmd: 'create_empresa' })
  createEmp(@Payload() createEmpresaDto: CreateEmpresaDto) {
    console.log('📩 Recibido en create_empresa:', createEmpresaDto);

    return this.empresasService.create(createEmpresaDto);
  }
  //fin crear empresa
  //inicio obtener empresa
  //@Get()
  @MessagePattern({ cmd: 'findAll_empresas' })
  findAll(@Payload() payload: any) {
    //console.log('Payload recibido:', payload); 
    return this.empresasService.findAll();
  }
  //fin obtener empresa
  //inicio obtener empresa por id
  //@Get(':id')
  @MessagePattern({ cmd: 'findOne_empresa' })
  async findOne(@Payload('emp_id', ParseIntPipe) emp_id: number) {
    return this.empresasService.findOne(emp_id);
  }
  //fin obtener empresa por id
  //inicio actualizar empresa por id
  // //@Patch(':id')
  @MessagePattern({ cmd: 'update_empresa' })
  updateEmpresa(@Payload() payload: any) {
    if (!payload.updateEmpresaDto || !payload.updatedBy) {
      console.error('❌ Error: Faltan datos en la petición');
      throw new RpcException({
        message: 'Faltan datos obligatorios para actualizar la empresa',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const { emp_id, updatedBy, updateEmpresaDto } = payload
    return this.empresasService.update(emp_id, updateEmpresaDto, updatedBy);
  }
  //fin actualizar empresa por id
  //inicio borrar empresa (borrado logico)
  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_empresa' })
  remove(@Payload() payload:any ){
    const {emp_id,updatedBy} = payload;
    console.log(`LA EMPRESA ${payload} a sido eliminado`)
    return this.empresasService.remove(emp_id, updatedBy);
  }
  //fin borrar empresa (borrado logico)

  //empresas administradas por el usuario admin
  @MessagePattern({ cmd: 'findEmpresasByAdmin' })
  findEmpresasByAdmin(@Payload() data: { usua_admin_id: number }) {
    console.log(`🔍 Buscando empresas administradas por el usuario ID: ${data.usua_admin_id}`);
    return this.empresasService.findEmpresasByAdmin(data.usua_admin_id);
  }
  //fin empresas administradas por el usuario admin
}
