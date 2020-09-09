import { Controller, Request, Post, Query, UseGuards, HttpCode, Get } from '@nestjs/common';
import axios from 'axios';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

const VK_DATA = {
  client_id: '7590902',
  client_secret: '0vI4VPIcWnpSrlLPuosp',
  redirect_uri: 'http://localhost:5000/auth/vk/callback',
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('vk/callback')
  async vkCallback(@Query('code') code: string) {
    console.log(code);
    console.log(`https://oauth.vk.com/access_token?${new URLSearchParams({...VK_DATA, code}).toString()}`);

    axios.get(`https://oauth.vk.com/access_token?${new URLSearchParams({...VK_DATA, code}).toString()}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    return { status: true };
  }
}
