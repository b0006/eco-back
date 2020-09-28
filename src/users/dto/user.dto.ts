import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Идентификатор пользователя',
  })
  _id: string;

  @ApiProperty({
    description: 'Имя пользователя',
  })
  username: string;
}
