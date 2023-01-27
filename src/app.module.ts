import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { AccountTypeService } from './services/account_type/';
import { CustomerService } from './services/customer/';
import { DepositService } from './services/deposit/';
import { DocumentTypeService } from './services/document_type/';
import { TransferService } from './services/transfer/';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService, AccountTypeService, CustomerService, DepositService, DocumentTypeService, TransferService],
})
export class AppModule {}
