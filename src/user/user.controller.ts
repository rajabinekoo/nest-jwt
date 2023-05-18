import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto, UserRequest } from './user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getUserProfile(@Request() req: UserRequest) {
    return new UserDto(await this.userService.findUserById(req.userId));
  }

  @Get('admin/profile')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async getAdminProfile(@Request() req: UserRequest) {
    return new UserDto(await this.userService.findUserById(req.userId));
  }
}
