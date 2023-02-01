import { Module } from '@nestjs/common';

// Controllers
import { 
  SecurityController,
  AccountController,
  CustomerController,
  DepositController,
  TransferController   
} from './presentation/controllers';

// Repositories
import {
  AccountRepository,
  AccountTypeRepository,
  CustomerRepository,
  DepositRepository,
  DocumentTypeRepository,
  TransferRepository
} from './data/persistence';

// Services
import { 
  AccountService, 
  CustomerService, 
  DepositService, 
  SecurityService, 
  TransferService 
} from './business/services';


@Module({
  imports: [],
  controllers: [
    SecurityController,
    AccountController,
    CustomerController,
    DepositController,
    TransferController],

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