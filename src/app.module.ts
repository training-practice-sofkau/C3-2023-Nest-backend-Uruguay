import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { CustomerService } from './services/customer/';
import { DepositService } from './services/deposit/';
import { TransferService } from './services/transfer/';
import { AccountRepository, CustomerRepository, TransferRepository, DepositRepository, AccountTypeRepository, DocumentTypeRepository } from './persistence/repositories/';
import { SecurityService } from './services/security/security.service';
import { CustomerController } from './controllers/customer/';
import { DepositController } from './controllers/deposit/';
import { AccountController } from './controllers/account/';
import { TransferController } from './controllers/transfer/';

@Module({
  imports: [],
  controllers: [SecurityController, CustomerController, DepositController, AccountController, TransferController],
  providers: [AccountService, CustomerService, DepositService, TransferService, SecurityService, AccountRepository, CustomerRepository, DepositRepository, TransferRepository, AccountTypeRepository, DocumentTypeRepository],
})
export class AppModule {}
