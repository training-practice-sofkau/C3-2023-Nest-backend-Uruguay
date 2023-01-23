import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { SecurityModule } from './modules/security/security.module';
import { AccountController } from './controllers/account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { CustomerService } from './services/customer/customer.service';
import { DepositService } from './services/deposit/deposit.service';
import { TransferService } from './services/transfer/transfer.service';

@Module({
  imports: [AccountModule, CustomerModule, TransferModule, DepositModule, SecurityModule],
  controllers: [SecurityController, AccountController, CustomerController, DepositController, TransferController],
  providers: [AccountService, CustomerService, DepositService, TransferService],
})
export class AppModule {}
