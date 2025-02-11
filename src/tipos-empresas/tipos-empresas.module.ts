import { Module } from '@nestjs/common';
import { TiposEmpresasService } from './tipos-empresas.service';
import { TiposEmpresasController } from './tipos-empresas.controller';

@Module({
  controllers: [TiposEmpresasController],
  providers: [TiposEmpresasService],
})
export class TiposEmpresasModule {}
