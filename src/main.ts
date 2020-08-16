declare const module: any;

import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import { static as expressStatic } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // parse application/x-www-form-urlencoded
  app.use(urlencoded({ extended: true }));
  // parse application/json
  app.use(json());

  app.use('/uploads', expressStatic('uploads'));

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: '*',
  })
  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
