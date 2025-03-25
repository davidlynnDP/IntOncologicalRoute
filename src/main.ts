import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { envs } from './config';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

  app.enableCors();
  const logger = new Logger('MainRest');

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  // app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
      transformOptions: {
        enableImplicitConversion: true, 
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ruta Oncologica')
    .setDescription(
      'Ruta Oncologica.'
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen( envs.port );
  logger.log(`App is running on port ${ envs.port }`);
  logger.log(`Application is running on: http://${ envs.host }:${ envs.port }`);
  logger.log(`Swagger docs available at: http://${ envs.host }:${ envs.port }/docs`);
}
bootstrap();
//npm un prettier eslint-config-prettier eslint-plugin-prettier
//npm i @nestjs/swagger class-transformer class-validator dotenv joi odbc date-fns-tz date-fns

//npm run start:dev

//npm run build