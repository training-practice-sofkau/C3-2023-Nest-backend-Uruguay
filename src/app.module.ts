import { Module } from '@nestjs/common';
import { AccountService, CustomerService, DepositService, TransferService } from './business';
import { SecurityService } from './business/services/security/security.service';
import { AccountRepository, AccountTypeRepository, DepositRepository, TransferRepository, DocumentTypeRepository, CustomerRepository } from './Data';
import { SecurityController, CustomerController, AccountController, DepositController, TransferController } from './presentation';


@Module({
  imports: [],
  controllers: [
    SecurityController,
    CustomerController,
    AccountController,
    DepositController,    
    TransferController,
  ],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,
    AccountRepository,
    AccountTypeRepository,
    DepositRepository,
    TransferRepository,
    DocumentTypeRepository,
    CustomerRepository,
  ],
})
export class AppModule {}
