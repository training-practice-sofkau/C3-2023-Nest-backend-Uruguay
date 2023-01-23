import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerService } from './services/customer/customer.service';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService, CustomerService],
})
export class AppModule {}
