import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { rusToLatin } from '../utils/string';

import { Category } from './categories.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().lean(true).exec() as Promise<Category[]>;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id: id }).exec();
    if (!category) {
      throw new HttpException('Категория не найдена', HttpStatus.CONFLICT);
    }
    return category;
  }

  async create(title: string, imageList: string[]): Promise<Category> {
    const value = rusToLatin(title);
    const findCategory = await this.categoryModel.findOne({ value });
    if (findCategory) {
      throw new HttpException('Категория уже существует', HttpStatus.CONFLICT);
    }

    return this.categoryModel.create({ title, value, imageList });
  }

  async update(id: string, imageList: string[], title?: string): Promise<Category> {
    let dataForUpdate: Partial<Category> = {};
    if (title) {
      dataForUpdate = {
        ...dataForUpdate,
        title,
        value: rusToLatin(title),
      };
    }
    if (imageList.length) {
      dataForUpdate.imageList = imageList;
    }

    const findCategory = await this.categoryModel.findOneAndUpdate({ _id: id }, dataForUpdate);

    if (!findCategory) {
      throw new HttpException('Категория не найдена', HttpStatus.CONFLICT);
    }

    return this.findById(id);
  }

  async removeById(id: string) {
    const result = await this.categoryModel.deleteOne({ _id: id });
    return !!result.ok;
  }
}
