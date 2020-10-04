import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { rusToLatin } from '../utils/string';

import { Product } from './products.schema';
import { ProductGetListDto } from './dto/product-get-list.dto.';
import { ProductCreateDto } from './dto/product-create.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(query: ProductGetListDto): Promise<Product[]> {
    const filterData: Partial<Product> = {};
    if (query.categoryId) {
      filterData.categoryId = query.categoryId;
    }
    return this.productModel.find(filterData).lean(true).exec() as Promise<Product[]>;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new HttpException('Продукт не найден', HttpStatus.CONFLICT);
    }
    return product;
  }

  async create(data: ProductCreateDto, imageList: string[]): Promise<Product> {
    const value = rusToLatin(data.title);
    const findCategory = await this.productModel.findOne({ value });
    if (findCategory) {
      throw new HttpException('Продукт с таким названием уже существует', HttpStatus.CONFLICT);
    }

    return (await this.productModel.create<Pick<Product, '_id'>>({ ...data, value, imageList })).toObject();
  }

  async removeById(id: string) {
    const result = await this.productModel.remove({ _id: id });
    return !!result.ok;
  }
}
