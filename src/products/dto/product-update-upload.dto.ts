import { ApiProperty } from '@nestjs/swagger';

export class ProductUpdateUploadDto {
  @ApiProperty({
    description: 'Список изображений продукта',
    type: 'array',
    required: false,
    items: {
      type: 'string',
      format: 'binary',
      description: 'Изображение',
    },
  })
  imageList: any[];

  @ApiProperty({ description: 'Название продукта', required: false })
  title: string;

  @ApiProperty({ description: 'Идентификатор категории', required: false })
  categoryId: string;

  @ApiProperty({ description: 'Стоимость продукта', required: false })
  price: number;

  @ApiProperty({ description: 'Описание продукта', required: false })
  descriptionHtml: string;

  @ApiProperty({
    description: 'Метки продукта',
    type: 'object',
    required: false,
    properties: {
      isExclusive: {
        type: 'boolean',
        description: 'Эксклюзив',
      },
      isNew: {
        type: 'boolean',
        description: 'Новинка',
      },
      isHit: {
        type: 'boolean',
        description: 'Хит',
      },
      isBack: {
        type: 'boolean',
        description: 'Возвращение',
      },
    },
  })
  badge: {
    isExclusive: boolean;
    isNew: boolean;
    isHit: boolean;
    isBack: boolean;
  };

  @ApiProperty({
    description: 'Параметры продукта',
    type: 'object',
    required: false,
    properties: {
      title: {
        type: 'string',
        description: 'Название параметра',
      },
      type: {
        type: 'string',
        enum: ['select', 'checkbox', 'radio'],
        description: 'Тип параметра', 
      },
      values: {
        type: 'array',
        description: 'Список значений',
        items: {
          type: 'object',
          properties: {
            label: {
              type: 'string',
              description: 'Название',
            },
            value: {
              type: 'string',
              description: 'Значения',
            },
          },
        },
      },
    },
  })
  properties: {
    title: string;
    type: 'select' | 'checkbox' | 'radio';
    values: Array<{ label: string; value: string }>;
  };
}
