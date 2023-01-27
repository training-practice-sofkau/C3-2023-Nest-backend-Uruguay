import { Module } from '@nestjs/common';

import { SecurityController } from './controllers';
import { AccountService, CustomerService, DepositService, SecurityService, TransferService } from './services';
import { CustomerRepository, AccountRepository, AccountTypeRepository, TransferRepository, DepositRepository, DocumentTypeRepository, } from './persistence/repositories';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,
    AccountRepository,
    CustomerRepository,
    DepositRepository,
    TransferRepository,
    AccountTypeRepository,
    DocumentTypeRepository],
})
export class AppModule {}
