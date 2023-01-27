import { Module } from '@nestjs/common';
// Controllers
import { SecurityController } from './controllers';
// Providers
import { AccountRepository, AccountTypeRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository } from './persistence';

@Module({
  imports: [],
  controllers: [SecurityController],
  providers: [AccountTypeRepository, AccountRepository, CustomerRepository, DepositRepository, DocumentTypeRepository, TransferRepository],
})
export class AppModule {}
