import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService, CustomerService, DepositService, TransferService} from './services';
import { SecurityService } from './services/security/security.service';
import { AccountTypeRepository, CustomerRepository, DocumentTypeRepository, AccountRepository, DepositRepository, TransferRepository } from './persistence';

@Module({
  imports: [],
  controllers: [SecurityController],
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
