import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IBadge {
  isExclusive: boolean;
  isNew: boolean;
  isHit: boolean;
  isBack: boolean;
}

export interface IProperty {
  title: string;
  type: 'select' | 'checkbox' | 'radio';
  values: Array<{ label: string; value: string }>;
}

const badge = {
  isExclusive: false,
  isNew: false,
  isHit: false,
  isBack: false,
};

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ ref: 'Category', type: Types.ObjectId })
  categoryId: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  descriptionHtml: string;

  @Prop({ required: true })
  imageList: string[];

  @Prop({ required: false, default: { badge } })
  badge: IBadge;

  @Prop({ required: false, default: [] })
  properties: IProperty[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// const temp = {
//   title: 'Пастила M',
//   price: 990,
//   descriptionHtml: '<p>Описание</p>',
//   imageList: ['/src/img1.png', '/src/img2.png'],
//   badge: {
//     isExclusive: false, // эксклюзив
//     isNew: true, // новинка
//     isHit: false, // хит
//     isBack: false, // он вернулся
//   },
//   properties: [
//     {
//       title: 'Упаковка',
//       type: 'select', // select | checkbox
//       values: [
//         { label: 'Розовое оформление', value: 'pink' },
//         { label: 'Зеленое оформление', value: 'green' },
//       ],
//     },
//     {
//       title: 'Отдельный крафт-пакет для подарка',
//       type: 'select', // select | checkbox
//       values: [
//         { label: '0', value: '0' },
//         { label: '1 за 30 руб', value: '30' },
//       ],
//     }
//   ],
// }