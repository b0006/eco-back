import { Controller, Get, Post, Query, Request, Body, UseGuards, Delete, Put, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpFailed } from '../common/dto/http-failed.dto';
import { editFileName } from '../utils/upload';

import { ProductGetListDto } from './dto/product-get-list.dto.';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from './products.schema';
import { ProductCreateUploadDto } from './dto/product-create-upload.dto';
import { ProductUpdateUploadDto } from './dto/product-update-upload.dto';

const convertProduct = (productDataDB: Product, url: string) => {
  return {
    ...productDataDB,
    id: productDataDB._id,
    imageList: productDataDB.imageList.map((relativePath) => `${url}/${relativePath}`),
  }
}

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @ApiQuery({ name: 'categoryId', required: false, description: 'Идентификатор категории' })
  @ApiOperation({ summary: 'Получить список продуктов' })
  @ApiResponse({ status: 200, description: 'Список продуктов', type: [ProductDto] })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  async findAll(@Request() req, @Query() query: ProductGetListDto) {
    const url = `${req.protocol}://${req.headers.host}`;
    const productList = await this.productService.findAll(query);
    return productList.map((product) => convertProduct(product, url));
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiParam({ type: 'string', name: 'id', description: 'Идентификатор продукта' })
  @ApiResponse({ status: 200, description: 'Список продуктов', type: ProductDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  async findOne(@Request() req) {
    return this.productService.findById(req.params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание продукта' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Создание продукта', type: ProductCreateUploadDto })
  @ApiResponse({ status: 200, description: 'Продукт успешно создан', type: ProductDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  @UseInterceptors(FilesInterceptor('imageList', 5, {
    storage: diskStorage({
      destination: './uploads/products',
      filename: editFileName,
    }),
  }))
  async create(@Request() req, @Body() data: ProductCreateDto) {
    const url = `${req.protocol}://${req.headers.host}`;
    const imagePathList = req.files.map((file) => file.path);
    const newProduct = await this.productService.create(data, imagePathList);
    return convertProduct(newProduct, url);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  @ApiParam({ type: 'string', name: 'id', description: 'Идентификатор продукта' })
  @ApiOperation({ summary: 'Удалить продукт по ID' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  removeById(@Request() req) {
    return this.productService.removeById(req.params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiBearerAuth()
  @ApiParam({ type: 'string', name: 'id', description: 'Идентификатор продукта' })
  @ApiOperation({ summary: 'Изменение продукта' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Изменение продукта', type: ProductUpdateUploadDto })
  @ApiResponse({ status: 200, description: 'Продукт успешно создан', type: ProductDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  @UseInterceptors(FilesInterceptor('imageList', 5, {
    storage: diskStorage({
      destination: './uploads/products',
      filename: editFileName,
    }),
  }))
  async update(@Request() req, @Body() data: Partial<Product>) {
    const url = `${req.protocol}://${req.headers.host}`;
    const imagePathList = req.files.map((file) => file.path);
    const updatedProduct = await this.productService.update(req.params.id, data, imagePathList);
    return convertProduct(updatedProduct, url);
  }
}
