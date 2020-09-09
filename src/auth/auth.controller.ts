import { Controller, Request, Post, Query, UseGuards, HttpCode, Get } from '@nestjs/common';
import axios from 'axios';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

const VK_DATA = {
  client_id: '7590902',
  client_secret: '0vI4VPIcWnpSrlLPuosp',
  redirect_uri: 'http://localhost:5000/auth/vk/callback',
};

interface IVkResponseData {
  access_token: string;
  expires_in: number;
  user_id: number;
  email?: string;
}

const GOOGLE_DATA = {
  client_id: '213999649597-bd74qs4rnaa8sgn1vnb672ivqkfomf5k.apps.googleusercontent.com',
  client_secret: 'pUyDfNy7HaIFnve-0IxBywN5',
  redirect_uri: 'http://me.mydomain.com:5000/auth/google/callback',
  grant_type: 'authorization_code',
};

interface IGoogleResponseData {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

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
    axios.get(`https://oauth.vk.com/access_token?${new URLSearchParams({...VK_DATA, code}).toString()}`)
      .then(response => {
        const data: IVkResponseData = response.data;
        console.log(response.data);

        axios.get('https://api.vk.com/method/users.get', {
          params: { access_token: data.access_token, user_ids: data.user_id, v: '5.122' }
        })
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(error => {
        console.log(error);
      });

    return { status: true, code, type: 'vk' };
  }

  @Get('google/callback')
  async googleCallback(@Query('code') code: string) {
    axios.post('https://accounts.google.com/o/oauth2/token', { ...GOOGLE_DATA, code })
      .then(response => {
        const data: IGoogleResponseData = response.data;
        console.log(data);

        axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
          params: {...GOOGLE_DATA, access_token: data.access_token}
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(error => {
        console.log(error);
      });

    console.log(code);
    return { status: true, code, type: 'Google' };
  };
}
