import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerService } from './services/customer/customer.service';
import { DepositService } from './services/deposit/deposit.service';
import { SecurityService } from './services/security/security.service';
import { TransferService } from './services/transfer/transfer.service';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService],
})

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService
  ],
})
export class AppModule {



  
}
