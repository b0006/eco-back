import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/ecoboom')],
})
export class AppModule {}
