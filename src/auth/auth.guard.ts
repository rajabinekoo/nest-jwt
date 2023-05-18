import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSecret } from 'src/config';
import { JwtPayload } from './auth.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  //   constructor(
  //     private jwtService: JwtService,
  //     private userService: UserService,
  //   ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });

      //   const user = await this.userService.findUserById(payload.id);
      //   if (!user) throw new Error();
      //   request['user'] = user;

      request['userId'] = payload.id;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
