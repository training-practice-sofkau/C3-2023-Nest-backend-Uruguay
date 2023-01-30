import { Module } from '@nestjs/common';
// Controllers
//import { SecurityController } from './controllers';
// Imports
//import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './persistence';
// Services
//import { AccountService, AccountTypeService, CustomerService, DepositService, DocumentTypeService, SecurityService, TransferService } from './services';
// Modules
import { SecurityModule, AccountModule, CustomerModule, DepositModule, TransferModule } from './modules';

@Module({
  imports: [SecurityModule, AccountModule, CustomerModule, DepositModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
