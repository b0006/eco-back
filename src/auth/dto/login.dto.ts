import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    example: 'login',
    description: 'Логин пользователя',
  })
  username: string;

  @ApiProperty({
    example: 'f2fsdfds',
    description: 'Пароль пользователя',
  })
  password: string;
}
