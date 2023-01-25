import { Module } from '@nestjs/common';
import { SecurityController } from './controllers/security/security.controller';
import { AccountService } from './services/account/account.service';
import { AccountController } from './controllers/account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { TransfersController } from './controllers/transfers/transfers.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { DepositService } from './services/deposit/deposit.service';
import { TransfersService } from './services/transfers/transfers.service';
import { CustomerService } from './services/customer/customer.service';
import { SecurityService } from './services/security/security.service';


@Module({
  imports: [],
  controllers: [SecurityController, AccountController, CustomerController, TransfersController, DepositController],
  providers: [AccountService, DepositService, TransfersService, CustomerService, SecurityService],
})
export class AppModule {}
