import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateEmpresaUsuarioDto } from './dto/create-empresa-usuario.dto';

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

  //****************************************** */

  //inicio obtener empresaS
  @MessagePattern({ cmd: 'findAll_empresas' })
  findAll(@Payload() payload: any) {
    //console.log('Payload recibido:', payload); 
    return this.empresasService.findAll();
  }
  //fin obtener empresaS

  //****************************************** */

  //inicio obtener empresa inactivas
  @MessagePattern({ cmd: 'findAll_empresas.inac' })
  findAllInac(@Payload() payload: any) {
    //console.log('Payload recibido:', payload); 
    return this.empresasService.findAllInactivas();
  }
  //fin obtener empresa inactivas

  //****************************************** */

  //inicio obtener empresa por id
  @MessagePattern({ cmd: 'findOne_empresa' })
  async findOne(@Payload('emp_id', ParseIntPipe) emp_id: number) {
    return this.empresasService.findOne(emp_id);
  }
  //fin obtener empresa por id

  //****************************************** */

  //inicio actualizar empresa por id
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

  //****************************************** */

  //inicio borrar empresa (borrado logico)
  @MessagePattern({ cmd: 'delete_empresa' })
  remove(@Payload() payload: any) {
    const { emp_id, updatedBy } = payload;
    console.log(`LA EMPRESA ${payload} a sido eliminado`)
    return this.empresasService.remove(emp_id, updatedBy);
  }
  //fin borrar empresa (borrado logico)

  //****************************************** */

  // inicio empresas administradas por el usuario admin
  @MessagePattern('empresas.mis-empresas')
  async obtenerEmpresasPorAdmin(@Payload() data: { user: { id: number } }) {
    const { user } = data;
    return this.empresasService.findEmpresasByAdmin(user.id);
  }
  // inicio empresas administradas por el usuario admin

  //****************************************** */

  @MessagePattern('empresas.validar-empresa-admin')
  async validarEmpresaDelAdmin(@Payload() data: { empresa_id: number; admin_id: number }) {
    return this.empresasService.validarEmpresaPorAdmin(data.empresa_id, data.admin_id);
  }

  //****************************************** *********************/
  @MessagePattern({ cmd: 'asignar-usuarios-empresa' })
  async asignarUsuarios(@Payload() dto: CreateEmpresaUsuarioDto) {
    return this.empresasService.asignarUsuarios(dto)
  }


  @MessagePattern('empresas.findById')
  async findById(@Payload() id: number) {
    return this.empresasService.findByIdWithUsuarios(id);
  }


  @MessagePattern('empresas.obtenerPorUsuario')
  async obtenerEmpresasPorUsuario(@Payload() usuarioId: number) {
    const empresas = await this.empresasService.obtenerPorUsuario(usuarioId);
    return empresas;
  }


}
