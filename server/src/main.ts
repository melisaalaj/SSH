/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Food System Server RESTful API')
      .setDescription('This API provides endpoints for managing a food system.')
      .setVersion('1.0')
      .addTag('Node v18')
      .addBearerAuth()
      .addBasicAuth()

      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(port);
}

bootstrap()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server started at http://localhost:${port})`);
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log(`Server could not be started at http://localhost:${port}`);
  });
