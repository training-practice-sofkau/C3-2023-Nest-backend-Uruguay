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


@Module({
  imports: [JwtModule.register({
    secret: 'process.env.JWT_SECRET',
    signOptions: { expiresIn: '30m'}}
  )],
  controllers: [SecurityController, AccountController],
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