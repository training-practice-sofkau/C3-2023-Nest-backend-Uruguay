import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerService } from './services/customer/customer.service';
import { DepositService } from './services/deposit/deposit.service';
import { SecurityService } from './services/security/security.service';
import { TransferService } from './services/transfer/transfer.service';
import { AccountRepository } from './persistence/repositories/account.repository';
import { AccountTypeRepository } from './persistence/repositories/account-type.repository';
import { DepositRepository } from './persistence/repositories/deposit.repository';
import { TransferRepository } from './persistence/repositories/transfer.repository';
import { DocumentTypeRepository } from './persistence';
import { CustomerRepository } from './persistence/repositories/customer.repository';

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
    AccountTypeRepository,
    DepositRepository,
    TransferRepository,
    DocumentTypeRepository,
    CustomerRepository
  ],
})
export class AppModule { }
