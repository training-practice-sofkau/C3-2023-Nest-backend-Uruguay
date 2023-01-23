import { Module } from '@nestjs/common';
// Servicios
import { SecurityService } from './services/security/security.service';
import { AccountService } from './services/account/account.service';
import { CustomerService } from './services/customer/customer.service';
import { TransferService } from './services/transfer/transfer.service';
import { DepositService } from './services/deposit/deposit.service';
import { AccountTypeService } from './services/account/account_type/account_type.service';
import { DocumentTypeService } from './services/customer/document_type/document_type.service';
// Modulos
import { SecurityModule } from './modules/security/security.module';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { AccountTypeModule } from './modules/account/account_type/account_type.module';
import { DocumentTypeModule } from './modules/customer/document_type/document_type.module';
// Controladores
import { SecurityController } from './controllers/security/security.controller';
import { AccountController } from './controllers/account/account.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { TransferController } from './controllers/transfer/transfer.controller';
import { DepositController } from './controllers/deposit/deposit.controller';
import { AccountTypeController } from './controllers/account/account_type/account_type.controller';
import { DocumentTypeController } from './controllers/customer/document_type/document_type.controller';

@Module({
  imports: [SecurityModule, AccountModule, CustomerModule, TransferModule, DepositModule, AccountTypeModule, DocumentTypeModule],
  controllers: [SecurityController, AccountController, CustomerController, TransferController, DepositController, AccountTypeController, DocumentTypeController],
  providers: [SecurityService, AccountService, CustomerService, TransferService, DepositService, AccountTypeService, DocumentTypeService],
})
export class AppModule {}
