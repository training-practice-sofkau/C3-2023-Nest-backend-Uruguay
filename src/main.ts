import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DateRangeDto, PaginationDto } from './business/dtos';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sofka bank')
    .setDescription('A backend project for the training league')
    .setVersion('1.0')
    .addTag('security')
    .addTag('account')
    .addTag('customer')
    .addTag('deposit')
    .addTag('transfer')
    .build();
  const document = SwaggerModule.createDocument(app, config, { extraModels: [PaginationDto, DateRangeDto] });
  SwaggerModule.setup('api', app, document);

  //app.useGlobalPipes(new ParseUUIDPipe());

  await app.listen(3000);
}
bootstrap();