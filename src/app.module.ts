import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AccountService, CustomerService, DepositService, SecurityService, TransferService } from './business/services';
import { CustomerRepository, AccountRepository, AccountTypeRepository, TransferRepository, DepositRepository, DocumentTypeRepository, } from './data/persistence/repositories';
import { SecurityController, DepositController,AccountController, CustomerController, TransferController } from './presentation/controllers/';

@Module({
  imports: [JwtModule.register({
    secret: 'process.env.JWT_SECRET',
    signOptions: { expiresIn: '20h'}}
  )],
  controllers: [SecurityController, CustomerController, AccountController, DepositController, TransferController],
  providers: [
    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,
    AccountRepository,
    CustomerRepository,
    DepositRepository,
    TransferRepository,
    AccountTypeRepository,
    DocumentTypeRepository],
})
export class AppModule {}
