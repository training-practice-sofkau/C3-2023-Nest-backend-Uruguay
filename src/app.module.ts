import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { AccountController } from './controllers/account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { TransferController } from './controllers/transfer/transfer.controller';

@Module({
  imports: [AccountModule, CustomerModule, DepositModule, TransferModule],
  controllers: [SecurityController, AccountController, CustomerController, DepositController, TransferController],
  providers: [AccountService],
})
export class AppModule {}
