import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpFailed } from '../common/dto/http-failed.dto';

import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей', type: [UserDto] })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить данные авторизированного пользователя' })
  @ApiResponse({ status: 200, description: 'Данные авторизированного пользователя', type: UserDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  getProfile(@Request() req) {
    return req.user;
  }
}
