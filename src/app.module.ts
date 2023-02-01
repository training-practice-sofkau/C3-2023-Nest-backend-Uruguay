import { Module } from '@nestjs/common';
import { SecurityController } from './presentation/controllers/security/security.controller';
import { AccountService } from './business-logic/services/account/account.service';
import { AccountController } from './presentation/controllers/account/account.controller';
import { CustomerController } from './presentation/controllers/customer/customer.controller';
import { TransferController } from './presentation/controllers/transfers/transfers.controller';
import { DepositController } from './presentation/controllers/deposit/deposit.controller';
import { DepositService } from './business-logic/services/deposit/deposit.service';
import { TransferService } from './business-logic/services/transfer/transfer.service';
import { CustomerService } from './business-logic/services/customer/customer.service';
import { SecurityService } from './business-logic/services/security/security.service';
import { AccountTypeController } from './presentation/controllers/account-type/account-type.controller';
import { AccountRepository } from './data-access/repositories/AccountRepo';
import { AccountTypeRepository } from './data-access/repositories/TypeAccountRepo';
import { CustomerRepo } from './data-access/repositories/CustomerRepo';
import { DepositRepository } from './data-access/repositories/DepositRepo';
import { TransferRepository } from './data-access/repositories/TransferRepo';
import { DocumentTypeRepository } from './data-access/repositories/DocumentTypeRepo';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [JwtModule.register({secret: 'process.env.JWT_SECRET', signOptions: { expiresIn: '20m'}})],
  
  controllers: [SecurityController,
                AccountController,
                CustomerController,
                TransferController,
                DepositController,
                AccountTypeController],
  
  providers: [AccountService,
              DepositService,
              TransferService,
              CustomerService,
              SecurityService,

              AccountRepository,
              AccountTypeRepository,
              CustomerRepo,
              DepositRepository,
              TransferRepository,
              DocumentTypeRepository,
            ],
})
export class AppModule {}
