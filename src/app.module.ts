import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerController } from './customer/customer.controller';

@Module({
  imports: [],
  controllers: [SecurityController, CustomerController],
  providers: [AccountService],
})
export class AppModule {}
