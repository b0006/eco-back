import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ description: 'Идентификатор категории' })
  id: string;

  @ApiProperty({ description: 'Название категории' })
  title: string;

  @ApiProperty({ description: 'Название категории транслитом' })
  value: string;

  @ApiProperty({ description: 'Список из URL-изображений' })
  imageList: string[];
}
