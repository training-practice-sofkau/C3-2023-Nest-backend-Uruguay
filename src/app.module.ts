import { Module } from '@nestjs/common';
// Controllers
import { SecurityController } from './controllers';
// Providers
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './persistence';
// Services
import { AccountService, AccountTypeService, CustomerService, DepositService, DocumentTypeService, TransferService } from './services';

@Module({
  imports: [AccountTypeService, AccountService, CustomerService, DepositService, DocumentTypeService, TransferService],
  controllers: [SecurityController],
  providers: [AccountTypeRepository, AccountRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository],
})
export class AppModule {}
