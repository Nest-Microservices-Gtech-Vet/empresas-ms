import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CantonesService } from './cantones.service';
import { CreateCantonDto } from './dto/create-cantone.dto';
import { UpdateCantoneDto } from './dto/update-cantone.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('cantones')
export class CantonesController {
  constructor(private readonly cantonesService: CantonesService) {}

  @MessagePattern({ cmd: 'create_cant'})
  createCan(@Payload() createCantonDto: CreateCantonDto){
    return this.cantonesService.create(createCantonDto)
  }

  @MessagePattern({ cmd: 'getCant'})
  getCan(@Payload() _payload:any){
    return this.cantonesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cantonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCantoneDto: UpdateCantoneDto) {
    return this.cantonesService.update(+id, updateCantoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cantonesService.remove(+id);
  }
}
