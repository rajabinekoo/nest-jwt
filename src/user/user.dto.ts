import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Request } from 'express';
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

export class UserRequest extends Request {
  userId: number;
  // user: UserEntity;
}

export class UserDto {
  id: number;

  username: string;

  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
