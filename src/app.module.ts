import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository
} from './persistence';
import { 
  AccountService, 
  CustomerService, 
  DepositService, 
  SecurityService, 
  TransferService 
} from './services';
import { AccountController } from './controllers/account';
import { CustomerController } from './controllers/customer/customer.controller';


@Module({
  imports: [],
  controllers: [SecurityController, AccountController, CustomerController],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,

    AccountTypeRepository,
    AccountRepository,
    CustomerRepository,
    DepositRepository,
    DocumentTypeRepository,
    TransferRepository
  ],
})
export class AppModule { }

