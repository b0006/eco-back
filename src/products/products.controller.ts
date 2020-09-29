import { Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

import { HttpFailed } from '../common/dto/http-failed.dto';

import { ProductGetListDto } from './dto/product-get-list.dto.';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async findAllByCategoryId(@Request() req) {
    return this.productService.findAll(req.body.categoryId);
  }

  @Get()
  @ApiQuery({ name: 'categoryId', required: false, description: 'Идентификатор категории' })
  @ApiQuery({ name: 'categoryValue', required: false, description: 'Значение категории' })
  @ApiOperation({ summary: 'Получить список продуктов' })
  @ApiResponse({ status: 200, description: 'Список продуктов', type: [ProductDto] })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  async findAll(@Query() query: ProductGetListDto) {
    return this.productService.findAll(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiParam({ type: 'string', name: 'id', description: 'Идентификатор продукта' })
  @ApiResponse({ status: 200, description: 'Список продуктов', type: ProductDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  async findOne(@Request() req) {
    return this.productService.findById(req.params.id);
  }
}
