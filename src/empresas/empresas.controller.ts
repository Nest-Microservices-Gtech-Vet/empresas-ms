import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, HttpStatus } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  //@Post()
  @MessagePattern({ cmd: 'create_empresa' })
  create(@Payload() data: any) {
    //console.log('Mensaje recibido en create_empresa:', createEmpresaDto);
    console.log('📩 Recibido en create_empresa:', data);
    if (!data.createEmpresaDto || !data.createEmpresaDto.emp_nombre) {
      console.error('❌ Error: Faltan datos en la petición');
      throw new RpcException({
        message: 'Faltan datos obligatorios para crear la empresa',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return this.empresasService.create(data.createEmpresaDto, data.createdBy);
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
  updateEmpresa(
    //@Param('id', ParseIntPipe) emp_id: number, 
    @Body() updateEmpresaDto: UpdateEmpresaDto
  ) {
    return this.empresasService.update(updateEmpresaDto.emp_id, updateEmpresaDto);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'delete_empresa' })
  remove(@Payload('emp_id', ParseIntPipe) emp_id: number) {
    const removeEmp = emp_id;
    console.log(`el usuario ${removeEmp} a sido eliminado`)
    return this.empresasService.remove(emp_id);
  }
}
