import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'Идентификатор продукта' })
  id: string;

  @ApiProperty({ description: 'Название продукта' })
  title: string;

  @ApiProperty({ description: 'Идентификатор категории' })
  categoryId: string;

  @ApiProperty({ description: 'Стоимость продукта' })
  price: number;

  @ApiProperty({ description: 'Описание продукта' })
  descriptionHtml: string;

  @ApiProperty({ description: 'Список URL-изображений продукта' })
  imageList: string[];

  @ApiProperty({
    description: 'Метки продукта',
    type: 'object',
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
