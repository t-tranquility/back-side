import { IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  username: string;
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must have at least one uppercase, one lowercase, and one number.',
  })
  password: string;
}
