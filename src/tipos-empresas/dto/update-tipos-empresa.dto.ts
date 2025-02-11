import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposEmpresaDto } from './create-tipos-empresa.dto';

export class UpdateTiposEmpresaDto extends PartialType(CreateTiposEmpresaDto) {}
