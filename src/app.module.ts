import { Module } from '@nestjs/common';

import { EmpresasModule } from './empresas/empresas.module';

import { CantonesModule } from './cantones/cantones.module';
import { ProvinciasModule } from './provincias/provincias.module';


@Module({
  imports: [EmpresasModule, ProvinciasModule, CantonesModule,],
  
})
export class AppModule {}
