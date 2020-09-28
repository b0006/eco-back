import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './products.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(categoryId?: string): Promise<Product[]> {
    const filterData = categoryId ? { categoryId } : {};
    return this.productModel.find(filterData).lean(true).exec() as Promise<Product[]>;
  }

  async findById(id: string): Promise<Partial<Product>> {
    return this.productModel.findOne({ _id: id }).lean(true).exec();
  }

  async create(data: Product): Promise<Product> {
    return this.productModel.create(data);
  }

  async removeById(id: string) {
    const result = await this.productModel.remove({ _id: id });
    return !!result.ok;
  }
}
