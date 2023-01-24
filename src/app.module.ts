import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService],
})
export class AppModule {}
