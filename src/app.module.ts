import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountController } from './controllers/account/account.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { DepositService } from './services/deposit/deposit.service';
import { CustomerService } from './services/customer/customer.service';

@Module({
  imports: [],
  controllers: [
    SecurityController,
    AccountController,
    DepositController,
    TransferController,
    CustomerController,
  ],
  providers: [CustomerService, DepositService],
})
export class AppModule {}
