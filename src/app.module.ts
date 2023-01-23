import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { LoginModule } from './login/login.module';
import { AccountModule } from './modules/account/account.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { CustomerService } from './customer/customer.service';
import { TransferController } from './transfer/transfer.controller';
import { DepositController } from './deposit/deposit.controller';
import { AccountController } from './account/account.controller';
import { CustomerController } from './customer/customer.controller';
import { DepositService } from './deposit/deposit.service';
import { TransferService } from './transfer/transfer.service';
import { CustomerService } from './customer/customer.service';

@Module({
  imports: [LoginModule, AccountModule, TransferModule, DepositModule, CustomerModule],
  controllers: [SecurityController, CustomerController, AccountController, DepositController, TransferController],
  providers: [AccountService, CustomerService, DepositService, TransferService],
})
export class AppModule {}
