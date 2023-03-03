import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as YAML from 'yamljs';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { MyLogger } from './logger/logger.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const port = +process.env.PORT || 4000;

  app.useLogger(app.get(MyLogger));

  console.log('Port running on: ', port);

  const document = YAML.load('doc/api.yaml');
  SwaggerModule.setup('doc', app, document);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

bootstrap();
