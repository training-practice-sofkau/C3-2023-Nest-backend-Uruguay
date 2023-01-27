import { Module } from '@nestjs/common';
// Controllers
import { SecurityController } from './controllers';
// Providers
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './persistence';
import { AccountService, AccountTypeService, CustomerService, DepositService, DocumentTypeService, TransferService } from './services';

@Module({
  imports: [AccountTypeRepository, AccountRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository],
  controllers: [SecurityController],
  providers: [AccountTypeService, AccountService, CustomerService, DepositService, DocumentTypeService, TransferService],
})
export class AppModule {}
