import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposEmpresasService } from './tipos-empresas.service';
import { CreateTiposEmpresaDto } from './dto/create-tipos-empresa.dto';
import { UpdateTiposEmpresaDto } from './dto/update-tipos-empresa.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('tipos-empresas')
export class TiposEmpresasController {
  constructor(private readonly tiposEmpresasService: TiposEmpresasService) { }

  @MessagePattern({ cmd: 'create_tipoEmp' })
  createTipoEmp(@Payload() createTiposEmpresasDto: CreateTiposEmpresaDto) {
    return this.tiposEmpresasService.create(createTiposEmpresasDto)
  }

  @MessagePattern({ cmd: 'get_tipoEmp'})
  getTipoEmp(@Payload() any){
    return this.tiposEmpresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposEmpresasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposEmpresaDto: UpdateTiposEmpresaDto) {
    return this.tiposEmpresasService.update(+id, updateTiposEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposEmpresasService.remove(+id);
  }
}
