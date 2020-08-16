import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<Partial<Category>> {
    return this.categoryModel.findOne({ _id: id }).lean(true).exec();
  }

  async create(data: CreateCategoryDto, imagePath?: string): Promise<any> {
    const findCategory = await this.categoryModel.find({ title: data.title.toLowerCase() }).lean(true).exec();
    if (findCategory) {
      console.log('Already exist');
      return null;
    }

    return this.categoryModel.create({ title: data.title, imageList: [] });
  }
}