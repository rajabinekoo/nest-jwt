import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDto, UserRequest } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getUserProfile(@Request() req: UserRequest) {
    return new UserDto(await this.userService.findUserById(req.userId));
  }
}
