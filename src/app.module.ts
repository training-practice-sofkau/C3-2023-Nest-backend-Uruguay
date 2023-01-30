import { Module } from '@nestjs/common';
// Controllers
//import { SecurityController } from './controllers';
// Imports
//import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './persistence';
// Services
//import { AccountService, AccountTypeService, CustomerService, DepositService, DocumentTypeService, SecurityService, TransferService } from './services';
// Modules
import { AccountModule, CustomerModule, SecurityModule } from './modules';

@Module({
  imports: [CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
