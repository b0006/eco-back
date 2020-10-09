import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/ecoboom'),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
