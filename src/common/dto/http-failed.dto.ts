import { ApiProperty } from '@nestjs/swagger';

export class HttpFailed {
  @ApiProperty({
    example: 401,
    description: 'HTTP статус'
  })
  statusCode: number;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Описание ошибки'
  })
  message: string;
}
