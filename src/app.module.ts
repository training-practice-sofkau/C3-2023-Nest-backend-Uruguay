import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { ModuleModule } from './module/module.module';
import {  } from "module";

@Module({
  imports: [ModuleModule],
  controllers: [SecurityController],
  providers: [AccountService],
})
export class AppModule {}
