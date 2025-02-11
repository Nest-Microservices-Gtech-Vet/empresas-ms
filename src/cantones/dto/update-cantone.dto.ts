import { PartialType } from '@nestjs/mapped-types';
import { CreateCantonDto } from './create-cantone.dto';

export class UpdateCantoneDto extends PartialType(CreateCantonDto) {}
