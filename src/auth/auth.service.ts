import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(user: UserEntity): Promise<string> {
    const payload = { id: user.id };
    return this.jwtService.signAsync(payload);
  }

  passwordChecker(user: UserEntity, password: string): boolean {
    return compareSync(password, user.password);
  }
}
