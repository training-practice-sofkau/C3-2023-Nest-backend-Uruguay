import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { SecurityModule } from './modules/security/security.module';

@Module({
  imports: [AccountModule, CustomerModule, TransferModule, DepositModule, SecurityModule],
  controllers: [SecurityController],
  providers: [AccountService],
})
export class AppModule {}
