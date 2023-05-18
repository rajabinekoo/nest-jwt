import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, SigninBodyDto, SigninDto } from 'src/user/user.dto';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() body: CreateUserDto) {
    let targetUser: UserEntity = await this.userService.findUserByUsername(
      body.username,
    );
    if (!!targetUser) throw new ConflictException('Already exist');
    targetUser = await this.userService.findUserByEmail(body.email);
    if (!!targetUser) throw new ConflictException('Already exist');
    const user: UserEntity = await this.userService.createUser(body);
    const accessToken: string = await this.authService.generateJwtToken(user);
    return new SigninDto(user, accessToken);
  }

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() body: SigninBodyDto) {
    let targetUser: UserEntity = await this.userService.findUserByUsername(
      body.credential,
    );
    if (!targetUser) {
      targetUser = await this.userService.findUserByEmail(body.credential);
    }
    if (!targetUser) throw new NotFoundException('User not found');
    if (!this.authService.passwordChecker(targetUser, body.password)) {
      throw new NotFoundException('User not found');
    }
    const accessToken: string = await this.authService.generateJwtToken(
      targetUser,
    );
    return new SigninDto(targetUser, accessToken);
  }
}
