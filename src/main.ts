// Libraries
import { NestFactory } from '@nestjs/core';

//call to environment variables
import dotenv from 'dotenv';
dotenv.config();

// Main module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
