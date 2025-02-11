import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CantonesService } from './cantones.service';
import { CreateCantonDto } from './dto/create-cantone.dto';
import { UpdateCantoneDto } from './dto/update-cantone.dto';

@Controller('cantones')
export class CantonesController {
  constructor(private readonly cantonesService: CantonesService) {}

  @Post()
  create(@Body() createCantonDto: CreateCantonDto) {
    return this.cantonesService.create(createCantonDto);
  }

  @Get()
  findAll() {
    return this.cantonesService.findAll();
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
