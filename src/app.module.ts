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
import { DocumentTypeService } from './services/document_type/document_type.service';
import { AccountTypeService } from './services/account_type/account_type.service';
import { AccountTypeController } from './controllers/account_type/account_type.controller';
import { DocumentTypeModule } from './modules/document_type/document_type.module';
import { AccountTypeModule } from './modules/account_type/account_type.module';

@Module({
  imports: [TransferModule, DepositModule, AccountModule, SecurityModule, CustomerModule, DocumentTypeModule, AccountTypeModule],
  controllers: [SecurityController, CustomerController, TransferController, DepositController, AccountTypeController],
  providers: [AccountService, DepositService, TransferService, CustomerService, DocumentTypeService, AccountTypeService, ],
})
export class AppModule {}
