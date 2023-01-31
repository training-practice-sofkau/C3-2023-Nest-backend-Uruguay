//import dotenv from "dotenv"
//dotenv.config()

// Libraries
import { NestFactory } from '@nestjs/core';


// Main module
import { AppModule } from './app.module';
import { ParseUUIDPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ParseUUIDPipe())
  await app.listen(3000)
}
bootstrap()
