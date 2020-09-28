declare const module: any;

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'body-parser';
import { static as expressStatic } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // parse application/x-www-form-urlencoded
  app.use(urlencoded({ extended: true }));
  // parse application/json
  app.use(json());

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const options = new DocumentBuilder()
    .setTitle('ECO BOOM API')
    .setDescription('Описание к API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document);

  app.use('/uploads', expressStatic('uploads'));
  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
