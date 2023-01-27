import { Module } from '@nestjs/common';
// Controllers
import { AccountController, AccountTypeController, CustomerController, DepositController, DocumentTypeController, SecurityController, TransferController } from './controllers';
// Providers
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './persistence';

@Module({
  imports: [],
  controllers: [SecurityController, AccountController, CustomerController, TransferController, DepositController, AccountTypeController, DocumentTypeController],
  providers: [AccountTypeRepository, AccountRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository],
})
export class AppModule {}
