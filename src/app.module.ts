import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SecurityController],
  providers: [AccountService],
})
export class AppModule {}
