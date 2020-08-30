import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ProductsService } from './products.service';

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
