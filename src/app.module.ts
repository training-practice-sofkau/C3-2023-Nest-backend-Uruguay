import { Module } from '@nestjs/common';
import { AccountService, CustomerService, DepositService, TransferService } from './services';
import { CustomerRepository, DocumentTypeRepository } from './persistence';
import { TransferController,DepositController,AccountController,CustomerController, SecurityController } from './controllers';
import { AccountTypeRepository } from './persistence/repositories/account-type.repository';
import { AccountRepository } from './persistence/repositories/account.repository';
import { DepositRepository } from './persistence/repositories/deposit.repository';
import { TransferRepository } from './persistence/repositories/transfer.repository';
import { SecurityService } from './services/security/security.service';

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
