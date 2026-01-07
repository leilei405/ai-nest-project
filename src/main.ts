import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// 加载环境变量
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
