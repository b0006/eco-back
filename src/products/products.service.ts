import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './products.schema';
import { ProductGetListDto } from './dto/product-get-list.dto.';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async findAll(query: ProductGetListDto): Promise<Product[]> {
    const filterData: Partial<Product> = {};
    if (query.categoryId) {
      filterData.categoryId = query.categoryId;
    }
    return this.productModel.find(filterData).exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new HttpException('Продукт не найден', HttpStatus.CONFLICT);
    }
    return product;
  }

  async create(data: Product): Promise<Product> {
    return this.productModel.create(data);
  }

  async removeById(id: string) {
    const result = await this.productModel.remove({ _id: id });
    return !!result.ok;
  }
}
