import { IsString, IsBoolean } from 'class-validator';

export class CreateTiposEmpresaDto {
  @IsString()
  te_nombre: string;

  
}
