import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTheoryDto {
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'Please Enter Page Name' })
  @IsString({ message: 'Please Enter Page Name' })
  page: string;

  @IsNotEmpty({ message: 'Please Enter Theory Content' })
  @IsString({ message: 'Please Enter Theory Content' })
  theory: string;
}
