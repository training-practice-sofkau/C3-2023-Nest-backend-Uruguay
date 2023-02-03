import { Module } from '@nestjs/common';
import { SecurityController } from './presentation';
import { AccountService } from './business/services';
import { CustomerService } from './business/services/customer/customer.service';
import { DepositService } from './business/services/deposit/deposit.service';
import { SecurityService } from './business/services/security/security.service';
import { TransferService } from './business/services/transfer/transfer.service';
import { AccountController } from './presentation/controllers/account/account.controller';
import { CustomerRepository } from './data/persistence/repositories/customer.repository';
import { AccountTypeRepository } from './data/persistence/repositories/account-type.repository';
import { AccountRepository, DepositRepository, DocumentTypeRepository, TranferRepository } from './data/persistence';
import { JwtModule } from '@nestjs/jwt';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { TransferController } from './presentation/controllers/transfer/transfer.controller';
import { CustomerController } from './presentation/controllers/customer/customer.controller';


@Module({
  imports: [JwtModule.register({
    secret: 'process.env.JWT_SECRET',
    signOptions: { expiresIn: '2h'}}
  )],
  controllers: [SecurityController, AccountController, 
    DepositController,TransferController, CustomerController],
  providers: [


    AccountService,
    CustomerService,
    DepositService,
    SecurityService,
    TransferService,

    AccountRepository,
    AccountTypeRepository,
    CustomerRepository,
    DepositRepository,
    DocumentTypeRepository,
    TranferRepository


  ],
})
export class AppModule { }