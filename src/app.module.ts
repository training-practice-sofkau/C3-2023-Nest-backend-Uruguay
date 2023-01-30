import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerService } from './services/customer/customer.service';
import { DepositService } from './services/deposit/deposit.service';
import { SecurityService } from './services/security/security.service';
import { TransferService } from './services/transfer/transfer.service';
import { AccountController } from './controllers/account/account.controller';

@Module({
  imports: [],
  controllers: [SecurityController, AccountController],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService
  ],
})
export class AppModule { }
