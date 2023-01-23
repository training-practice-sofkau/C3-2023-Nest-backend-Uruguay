import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { DocumentTypeModule } from './modules/document-type/document-type.module';
import { AccountTypeModule } from './modules/account-type/account-type.module';
import { AccountModule } from './modules/account/account.module';
import { CostumerModule } from './modules/costumer/costumer.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { CustomerModule } from './modules/customer/customer.module';
@Module({
  imports: [DocumentTypeModule, AccountTypeModule, AccountModule, CostumerModule, TransferModule, DepositModule, CustomerModule],
  controllers: [SecurityController],
  providers: [AccountService],
})
export class AppModule {}
