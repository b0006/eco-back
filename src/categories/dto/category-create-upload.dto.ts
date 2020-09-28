import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateUploadDto {
  @ApiProperty({ description: 'Изображение категории', type: 'string', format: 'binary' })
  image: any;

  @ApiProperty({ description: 'Название категории' })
  title: string;
}
