import { PartialType } from '@nestjs/mapped-types';
import { CreateSunDto } from './create-sun.dto';

export class UpdateSunDto extends PartialType(CreateSunDto) {}
