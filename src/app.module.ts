import { Module } from '@nestjs/common';

import { EmpresasModule } from './empresas/empresas.module';
import { TiposEmpresasModule } from './tipos-empresas/tipos-empresas.module';
import { CantonesModule } from './cantones/cantones.module';
import { ProvinciasModule } from './provincias/provincias.module';


@Module({
  imports: [EmpresasModule, ProvinciasModule, CantonesModule, TiposEmpresasModule],
  
})
export class AppModule {}
