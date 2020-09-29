import { Controller, Get, Delete, UseGuards, Request, Post, Put, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { editFileName } from '../utils/upload';
import { HttpFailed } from '../common/dto/http-failed.dto';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';
import { Category } from './categories.schema';
import { CategoryCreateUploadDto } from './dto/category-create-upload.dto';

const convertCategory = (categoryDataDB: Category, url: string) => {
  return {
    id: categoryDataDB._id,
    title: categoryDataDB.title,
    value: categoryDataDB.value,
    imageList: categoryDataDB.imageList.map((relativePath) => `${url}/${relativePath}`),
  }
}

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список категорий' })
  @ApiResponse({ status: 200, description: 'Список категорий', type: [CategoryDto] })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  async findAll(@Request() req) {
    const url = `${req.protocol}://${req.headers.host}`;
    const list = await this.categoriesService.findAll();
    return list.map((category) => convertCategory(category, url));
  }

  @Get('/:id')
  @ApiParam({ type: 'string', name: 'id', description: 'Идентификатор категории' })
  @ApiOperation({ summary: 'Получить категорию по ID' })
  @ApiResponse({ status: 200, description: 'Категория', type: CategoryDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  async findOne(@Request() req) {
    const url = `${req.protocol}://${req.headers.host}`;
    const category = await this.categoriesService.findById(req.params.id);
    return convertCategory(category, url);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  @ApiParam({ type: 'string', name: 'id', description: 'Идентификатор категории' })
  @ApiOperation({ summary: 'Удалить категорию по ID' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  removeById(@Request() req) {
    return this.categoriesService.removeById(req.params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiBearerAuth()
  @ApiParam({ type: 'string', name: 'id', description: 'Идентификатор категории' })
  @ApiOperation({ summary: 'Изменение категории' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Изменение категории', type: CategoryCreateUploadDto })
  @ApiResponse({ status: 200, description: 'Категория успешно создана', type: CategoryDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
  @UseInterceptors(FilesInterceptor('image', 5, {
    storage: diskStorage({
      destination: './uploads/categories',
      filename: editFileName,
    }),
  }))
  async update(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    const url = `${req.protocol}://${req.headers.host}`;
    const imagePathList = req.files.map((file) => file.path);
    const updatedCategory = await this.categoriesService.update(req.params.id, createCategoryDto.title, imagePathList);
    return convertCategory(updatedCategory, url);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание категории' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Создание категории', type: CategoryCreateUploadDto })
  @ApiResponse({ status: 200, description: 'Категория успешно создана', type: CategoryDto })
  @ApiResponse({ status: 401, description: 'Ошибка', type: HttpFailed })
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
