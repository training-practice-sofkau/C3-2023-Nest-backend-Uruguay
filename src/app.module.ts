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


@Module({
  imports: [],
  controllers: [SecurityController],
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