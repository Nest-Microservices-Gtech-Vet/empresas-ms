import { IsString, IsInt } from 'class-validator';

export class CreateCantonDto {
  @IsString()
  can_nombre: string;

  @IsInt()
  provincia_id: number;
}
