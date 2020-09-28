import { Controller, Get, Delete, UseGuards, Request, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { editFileName } from '../utils/upload';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './categories.schema';

const convertCategory = (categoryDataDB: Category, url: string) => {
  return {
    id: categoryDataDB._id,
    title: categoryDataDB.title,
    value: categoryDataDB.value,
    imageList: categoryDataDB.imageList.map((relativePath) => `${url}/${relativePath}`)
  }
}

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Request() req) {
    const url = `${req.protocol}://${req.headers.host}`;
    const list = await this.categoriesService.findAll();
    return list.map((category) => convertCategory(category, url));
  }

  @Delete('/:id')
  removeById(@Request() req) {
    return this.categoriesService.removeById(req.params.id);
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
    const url = `${req.protocol}://${req.headers.host}`;
    const imagePathList = req.files.map((file) => file.path);
    const newCategory = await this.categoriesService.create(createCategoryDto.title, imagePathList);
    return convertCategory(newCategory, url);
  }
}
