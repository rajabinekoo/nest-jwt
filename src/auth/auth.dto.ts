import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';

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

export class JwtPayload {
  id: number;
}
