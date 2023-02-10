// Libraries
import { NestFactory } from '@nestjs/core';

// Main module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  await app.listen(3000);
}
bootstrap();