import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SigninBodyDto {
  @IsString()
  @IsNotEmpty()
  credential: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SigninDto {
  id: number;

  username: string;

  email: string;

  access_token: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>, token: string) {
    Object.assign(this, partial);
    this.access_token = token;
  }
}
