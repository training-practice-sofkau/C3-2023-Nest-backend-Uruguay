import { Module } from '@nestjs/common';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './Capa-Data/persistence';
import { AccountService, CustomerService, DepositService, SecurityService, TransferService } from './Capa-Negocio/services';
import { SecurityController } from './Capa-Presentacion/controllers/security/security.controller';
import { AccountController } from './Capa-Presentacion/controllers/account/account.controller';
import { CustomerController } from './Capa-Presentacion/controllers/customer/customer.controller';
import { DepositController } from './Capa-Presentacion/controllers/deposit/deposit.controller';
import { TransferController } from './Capa-Presentacion/controllers/transfers/transfers.controller';





@Module({
  imports: [],
  controllers: [SecurityController, AccountController,CustomerController,DepositController,TransferController],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,


    //Repositorios (?)
    AccountRepository,
    AccountTypeRepository,
    CustomerRepository,
    DepositRepository,
    DocumentTypeRepository,
    TransferRepository

  ],
})
export class AppModule { }
