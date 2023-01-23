import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { DepositService } from './services/deposit/deposit.service';
import { TransferService } from './services/transfer/transfer.service';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { AccountModule } from './modules/account/account.module';
import { SecurityModule } from './modules/security/security.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerService } from './services/customer/customer.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';

@Module({
  imports: [TransferModule, DepositModule, AccountModule, SecurityModule, CustomerModule],
  controllers: [SecurityController, CustomerController, TransferController, DepositController],
  providers: [AccountService, DepositService, TransferService, CustomerService, ],
})
export class AppModule {}
