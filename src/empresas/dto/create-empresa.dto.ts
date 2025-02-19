import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEmpresaDto {
    @IsString()
    emp_nombre: string;
    
    @IsString()
    @IsEmail()   
    emp_correo: string;
    
    @IsString()
    emp_direccion: string;

    @IsString()
    @MaxLength(10)
    emp_telefono: string;

    @IsString()
    @MinLength(10)
    @MaxLength(13)
    emp_ruc: string;

    
    @IsInt()
    provincia_id: number;

    
    @IsInt()
    canton_id: number;

    
    @IsInt()
    tipo_empresa_id: number;

    @IsInt()
    usua_admin_id: number; // ID del usuario administrador

    @IsInt()
    createdBy: number;

    
   
    @IsInt()
    updatedBy?: number;

  

    @IsOptional()
    @IsBoolean()
    activo?: boolean;




}