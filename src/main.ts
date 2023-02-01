// Libraries
import { NestFactory } from '@nestjs/core';

// Main module
import { AppModule } from './app.module';
import { AccountTypeEntity, DocumentTypeEntity } from './data/persistence/entities/';
import { AccountTypeRepository, DocumentTypeRepository } from './data/persistence/repositories/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   errorHttpStatusCode: 406
  // }
  // ))
  await app.listen(3000);
}
bootstrap();