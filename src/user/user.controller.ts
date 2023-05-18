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
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
@UseGuards(AuthGuard)
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
