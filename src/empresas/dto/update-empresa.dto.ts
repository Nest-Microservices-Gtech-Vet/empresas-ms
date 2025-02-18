import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './create-empresa.dto';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {
    @IsNumber()
    @IsPositive()
    emp_id: number;

    @IsOptional()
    @IsInt()
    updatedBy?: number;
}
