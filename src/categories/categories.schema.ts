import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  imageList: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

