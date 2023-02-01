import { Module } from '@nestjs/common';
import { AccountService, CustomerService, DepositService, SecurityService, TransferService } from './business';
import { AccountRepository, CustomerRepository, DepositRepository, TransferRepository, DocumentTypeRepository, AccountTypeRepository } from './data';
import { AccountController, CustomerController, DepositController, SecurityController, TransferController } from './presentation';


@Module({
  imports: [],
  controllers: [
    SecurityController,
    AccountController,
    CustomerController,
    DepositController,
    TransferController
  ],
  providers: [
    //Services
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,

    //Repositories
    AccountRepository,
    CustomerRepository,
    DepositRepository,
    TransferRepository,
    DocumentTypeRepository,
    AccountTypeRepository
  ],
})
export class AppModule { }
