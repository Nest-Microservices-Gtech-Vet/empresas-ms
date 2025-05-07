import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}

  @MessagePattern({ cmd: 'create_prov' })
  createProv(@Payload() createProvDto: CreateProvinciaDto){
    return this.provinciasService.create(createProvDto)
  }

  @MessagePattern({ cmd: 'getAllProv' })
  getProv(@Payload() _payload:any){
    return this.provinciasService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinciasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvinciaDto: UpdateProvinciaDto) {
    return this.provinciasService.update(+id, updateProvinciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinciasService.remove(+id);
  }
}
