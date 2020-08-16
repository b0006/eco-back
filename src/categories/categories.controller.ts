import { Controller, Get, UseGuards, Request, Post, Body, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { editFileName } from '../utils/upload';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getProfile(@Request() req) {
    return this.categoriesService.findById(req.params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('image', 5, {
    storage: diskStorage({
      destination: './uploads/categories',
      filename: editFileName,
    }),
  }))
  async create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    console.log(req.files);
    console.log(createCategoryDto);
    return { status: true };
    // return this.categoriesService.create(createCategoryDto);
  }
}
