import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposEmpresasService } from './tipos-empresas.service';
import { CreateTiposEmpresaDto } from './dto/create-tipos-empresa.dto';
import { UpdateTiposEmpresaDto } from './dto/update-tipos-empresa.dto';

@Controller('tipos-empresas')
export class TiposEmpresasController {
  constructor(private readonly tiposEmpresasService: TiposEmpresasService) {}

  @Post()
  create(@Body() createTiposEmpresaDto: CreateTiposEmpresaDto) {
    return this.tiposEmpresasService.create(createTiposEmpresaDto);
  }

  @Get()
  findAll() {
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
