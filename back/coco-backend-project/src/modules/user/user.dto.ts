import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {}

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
