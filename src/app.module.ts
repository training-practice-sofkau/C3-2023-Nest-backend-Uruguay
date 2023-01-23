import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountModule } from './modules/account/account.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { CustomerService } from './services/customer/customer.service';
import { TransferService } from './services/transfer/transfer.service';
import { DepositService } from './services/deposit/deposit.service';
import { AccountController } from './controllers/account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { TransferController } from './controllers/transfer/transfer.controller';

@Module({
  imports: [AccountModule, TransferModule, DepositModule, CustomerModule],
  controllers: [SecurityController, AccountController, CustomerController, DepositController, TransferController],
  providers: [AccountService, CustomerService, TransferService, DepositService],
})
export class AppModule {}
