import { IsString } from 'class-validator';

export class CreateProvinciaDto {
  @IsString()
  prov_nombre: string;
}
