import { Module } from '@nestjs/common';

import { AccountService, CustomerService, DepositService, SecurityService, TransferService } from './business/services';
import { CustomerRepository, AccountRepository, AccountTypeRepository, TransferRepository, DepositRepository, DocumentTypeRepository, } from './data/persistence/repositories';
import { SecurityController, DepositController,AccountController, CustomerController } from './presentation/controllers/';

@Module({
  imports: [],
  controllers: [SecurityController, CustomerController, AccountController, DepositController],
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
