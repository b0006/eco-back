import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './categories.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().lean(true).exec() as Promise<Category[]>;
  }

  async findById(id: string): Promise<Partial<Category>> {
    return this.categoryModel.findOne({ _id: id }).lean(true).exec();
  }

  async create(title: string, imagePathList: string[]): Promise<Category> {
    const findCategory = await this.categoryModel.findOne({ title });
    if (findCategory) {
      throw new HttpException('Категория уже существует', HttpStatus.CONFLICT);
    }

    return this.categoryModel.create({ title: title, imageList: imagePathList });
  }

  async removeById(id: string) {
    const result = await this.categoryModel.remove({ _id: id });
    return !!result.ok;
  }
}