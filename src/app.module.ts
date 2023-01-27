import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountController } from './account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { TransfersController } from './controllers/transfers/transfers.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { AccountsService } from './accounts/accounts.service';
import { DepositService } from './deposit/deposit.service';
import { CustomerService } from './customer/customer.service';
import { TransfersService } from './transfers/transfers.service';
import { AccountService } from './account/account.service';
import { AccountService } from './services/account/account.service';
import { AuthModule } from './modules/auth/auth.module';
import { AccountService } from './services/account/account.service';

@Module({
  imports: [AuthModule],
  controllers: [
    SecurityController,
    AccountController,
    CustomerController,
    TransfersController,
    DepositController,
  ],
  providers: [
    AccountService,
    AccountsService,
    DepositService,
    CustomerService,
    TransfersService,
  ],
})
export class AppModule {}
