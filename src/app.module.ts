import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerService } from './services/customer/';
import { DepositService } from './services/deposit/';
import { TransferService } from './services/transfer/';
import { AccountRepository } from './persistence/repositories/account.repository';
import { CustomerRepository } from './persistence/repositories/customer.repository';
import { DepositRepository } from './persistence';
import { TransferRepository } from './persistence/repositories/transfer.repository';
import { AccountTypeRepository } from './persistence/repositories/account-type.repository';
import { DocumentTypeRepository } from './persistence/repositories/document-type.repository';
import { SecurityService } from './services/security/security.service';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountService, CustomerService, DepositService, TransferService, SecurityService, AccountRepository, CustomerRepository, DepositRepository, TransferRepository, AccountTypeRepository, DocumentTypeRepository],
})
export class AppModule {}
