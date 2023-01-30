import { Module } from '@nestjs/common';

import { SecurityController } from './controllers';
import { AccountService, CustomerService, DepositService, SecurityService, TransferService } from './services';
import { CustomerRepository, AccountRepository, AccountTypeRepository, TransferRepository, DepositRepository, DocumentTypeRepository, } from './persistence/repositories';
import { CustomerController } from './controllers/customer/customer.controller';
import { AccountController } from './controllers/account/account.controller';
import { DepositController } from './controllers/deposit/deposit.controller';

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
