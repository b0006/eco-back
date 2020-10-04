import { ApiProperty } from '@nestjs/swagger';

import { ProductCreateDto } from './product-create.dto';

export class ProductCreateUploadDto extends ProductCreateDto {
  @ApiProperty({
    description: 'Список изображений продукта',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
      description: 'Изображение',
    },
  })
  imageList: any[];
}
