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
import { AccountController } from './controllers/account/account.controller';
import { AccountTypeController } from './controllers/account-type/account-type.controller';
import { DocumentTypeController } from './controllers/document-type/document-type.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { AccountService } from './controllers/account/account.service';
import { AccountTypeService } from './controllers/account-type/account-type.service';
import { DocumentTypeService } from './controllers/document-type/document-type.service';
import { CustomerService } from './controllers/customer/customer.service';
import { DepositService } from './controllers/deposit/deposit.service';
import { TransferService } from './controllers/transfer/transfer.service';
import { TransferService } from './services/transfer/transfer.service';
import { AccountTypeService } from './services/account-type/account-type.service';
import { DocumentTypeService } from './services/document-type/document-type.service';
import { DepositService } from './services/deposit/deposit.service';
import { CustomerService } from './services/customer/customer.service';
@Module({
  imports: [DocumentTypeModule, AccountTypeModule, AccountModule, CostumerModule, TransferModule, DepositModule, CustomerModule],
  controllers: [SecurityController, AccountController, AccountTypeController, DocumentTypeController, DepositController, TransferController, CustomerController],
  providers: [AccountService, AccountTypeService, DocumentTypeService, CustomerService, DepositService, TransferService],
})
export class AppModule {}
