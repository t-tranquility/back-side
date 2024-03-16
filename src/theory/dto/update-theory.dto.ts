import { PartialType } from '@nestjs/mapped-types';
import { CreateTheoryDto } from './create-theory.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTheoryDto extends PartialType(CreateTheoryDto) {
  @IsNotEmpty({ message: 'Please Enter Page Name' })
  @IsString({ message: 'Please Enter Page Name' })
  page: string;

  @IsNotEmpty({ message: 'Please Enter Theory Content' })
  @IsString({ message: 'Please Enter Theory Content' })
  theory: string;
}
