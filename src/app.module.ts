import { Module } from '@nestjs/common';
// Controllers
//import { SecurityController } from './controllers';
// Imports
//import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './persistence';
// Services
//import { AccountService, AccountTypeService, CustomerService, DepositService, DocumentTypeService, SecurityService, TransferService } from './services';
// Modules
import { SecurityModule, AccountModule, CustomerModule } from './modules';

@Module({
  imports: [SecurityModule, AccountModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
