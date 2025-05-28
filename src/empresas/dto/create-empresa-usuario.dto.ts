import { IsInt } from "class-validator";

export class CreateEmpresaUsuarioDto {
  @IsInt()
  empresaId: number;

  @IsInt({ each: true })
  usuarioIds: number[];
}
