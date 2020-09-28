import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { HttpFailed } from '../common/dto/http-failed.dto';

import { AuthLoginDto } from './dto/login.dto';
import { AuthLoginResponseDto } from './dto/login-response.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ status: 200, description: 'Авторизация прошла успешно', type: AuthLoginResponseDto })
  @ApiResponse({ status: 401, description: 'Неверный логин или пароль', type: HttpFailed })
  @ApiBody({ type: AuthLoginDto, description: 'Входные параметры для авторизации' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
