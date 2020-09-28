import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  async findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getProfile(@Request() req) {
    return this.productService.findById(req.params.id);
  }
}
