import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  //@Post()
  @MessagePattern({cmd: 'create_empresa'})
  create(@Payload() createEmpresaDto: CreateEmpresaDto) {
    //console.log('Mensaje recibido en create_empresa:', createEmpresaDto);
    return this.empresasService.create(createEmpresaDto);
  }

  //@Get()
  @MessagePattern({cmd: 'findAll_empresas'})
  findAll(@Payload() payload:any) {
    //console.log('Payload recibido:', payload); 
    return this.empresasService.findAll();
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'findOne_empresa'})
  async findOne(@Payload('emp_id', ParseIntPipe) emp_id: number) {
    return this.empresasService.findOne(emp_id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'update_empresa'})
  updateEmpresa(
    //@Param('id', ParseIntPipe) emp_id: number, 
    @Body() updateEmpresaDto: UpdateEmpresaDto
  ) {
    return this.empresasService.update(updateEmpresaDto.emp_id, updateEmpresaDto);
  }

  //@Delete(':id')
    @MessagePattern({ cmd: 'delete_empresa'})
    remove(@Payload('emp_id', ParseIntPipe) emp_id: number) {
      const removeEmp = emp_id;
      console.log(`el usuario ${removeEmp} a sido eliminado`)
    return this.empresasService.remove(emp_id);
  }
}
