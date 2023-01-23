import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { AccountModule } from './modules/account/account.module';
import { AccountTypeModule } from './modules/account_type/account_type.module';
import { DocumentTypeModule } from './modules/document_type/document_type.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { SecurityController } from './controllers/security/security.controller';

@Module({
  imports: [CustomerModule, AccountModule, AccountTypeModule, DocumentTypeModule, TransferModule, DepositModule],
  controllers: [SecurityController],
  providers: [],
})
export class AppModule {}
