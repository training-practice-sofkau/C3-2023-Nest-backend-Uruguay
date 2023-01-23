import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerService } from './services/customer/customer.service';
import { AccountTypeService } from './services/account_type/account_type.service';
import { DocumentTypeService } from './services/document_type/document_type.service';
import { TransferService } from './services/transfer/transfer.service';
import { DepositService } from './services/deposit/deposit.service';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService, CustomerService, AccountTypeService, DocumentTypeService, TransferService, DepositService],
})
export class AppModule {}
