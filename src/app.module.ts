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
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { SecurityModule } from './modules/security/security.module';
import { TransfersModule } from './modules/transfers/transfers.module';

@Module({
  imports: [AccountModule, CustomerModule, DepositModule, SecurityModule, TransfersModule],
  controllers: [SecurityController, AccountController, CustomerController, TransfersController, DepositController],
  providers: [AccountService, DepositService, TransfersService, CustomerService, SecurityService],
})
export class AppModule {}
