import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateEmpresaDto {
    @IsNotEmpty()
    @IsString()
    emp_nombre: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    emp_correo: string;

    @IsNotEmpty()
    @IsString()
    emp_direccion: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    emp_telefono: string;

    @IsNotEmpty()
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

    @IsNotEmpty()
    @IsInt()
    usua_admin_id: number; // El ID del administrador debe ser obligatorio



    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    
    @IsNotEmpty()
    @IsInt()
    createdBy: number; // Solo superadmins pueden crear empresas

}