import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountModule } from './modules/account/account.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AccountController } from './controllers/account/account.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { DepositService } from './services/deposit/deposit.service';
import { CustomerService } from './services/customer/customer.service';
@Module({
  imports: [AccountModule, TransferModule, DepositModule, CustomerModule],
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
